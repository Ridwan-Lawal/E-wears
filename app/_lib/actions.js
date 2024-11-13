"use server";

import { getCartByUserId } from "@/app/_lib/data-service";
import { supabase } from "@/app/_lib/supabase/supabase";
import { auth, signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut();
}

export async function AddProductToCartAction(product) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed to add a product to the cart!");
  }

  //   build the data
  const newProduct = {
    ...product,
  };

  //   mutate the data
  const { data, error } = await supabase
    .from("cart")
    .insert([newProduct])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // revalidate the router cache
  revalidatePath("/cart");
}

export async function deleteProductFromCart(productToDel) {
  const session = await auth();
  if (!session)
    throw new Error("You must be signed to delete a product from the cart!");

  // to make sure user can only delete his product
  const userCartProducts = await getCartByUserId(session?.user?.userId);

  const isProductExistInUserCart = userCartProducts?.find(
    (product) =>
      product?.userID === session?.user?.userId &&
      product?.productId === productToDel?.productId
  );

  if (!isProductExistInUserCart)
    throw new Error("You are not allowed to update this product!");

  // mutations
  const { error } = await supabase.from("cart").delete().match({
    userID: session?.user?.userId,
    productId: productToDel?.productId,
  });

  if (error) throw new Error(error.message);

  // revalidate the cart route
  revalidatePath("/cart");
}

export async function updateProductQuantityAction({ productToUpdate, order }) {
  const session = await auth();
  if (!session)
    throw new Error(
      "You must be signed to update a product quantity in the cart!"
    );

  // check if the product user's trying to update is his/her own
  const userCartProducts = await getCartByUserId(session?.user?.userId);

  const isProductExistInUserCart = userCartProducts?.find(
    (product) =>
      product?.userID === session?.user?.userId &&
      product?.productId === productToUpdate?.productId
  );
  console.log(productToUpdate, "actions");

  if (!isProductExistInUserCart)
    throw new Error("You are not allowed to update this product!");

  // mutation
  let { error } = await supabase
    .from("cart")
    .update({
      productQuantity:
        order === "incr"
          ? productToUpdate?.productQuantity + 1
          : order === "decr" && productToUpdate?.productQuantity > 1
          ? productToUpdate?.productQuantity - 1
          : productToUpdate?.productQuantity,
    })
    .match({
      userID: session?.user?.userId,
      productId: productToUpdate?.productId,
    });

  if (error) throw new Error(error.message);

  revalidatePath("/cart");
}

export async function clearCartAction(prevState) {
  const session = await auth();
  if (!session) throw new Error("You must be sign in to call this action!");

  // Authorization
  const userCartProducts = await getCartByUserId(session?.user?.userId);

  const allUserCartProductsHasUserId = userCartProducts.every(
    (product) => product?.userID === session?.user?.userId
  );

  if (!allUserCartProductsHasUserId)
    throw new Error("You are not allowed to delete products in cart!");

  // Mutation
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("userID", session?.user?.userId);

  if (error) throw new Error(error.message);

  revalidatePath("/cart");
}

const CardDetails = z.object({
  "card-number": z
    .string()
    .max(16, "Card number must not be more that 16 characters")
    .min(16, "Card number must be 16 characters"),
  "card-name": z
    .string({ invalid_type_error: "Field must be a string" })
    .max(50, "Name must be less than 50 characters"),
  "expiry-date": z
    .string()
    .max(5, "expiry date must not be more than 5 characters")
    .min(5, "Expiry date must not be less than 5 characters"),
  cvv: z
    .string()
    .max(3, "cvv must not be more than 3 characters")
    .min(3, "cvv must not be less than 3 characters"),
});

export async function paymentAction(prevState, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be signed in to call this action!");

  const validateFormFields = CardDetails.safeParse({
    "card-number": formData.get("card-number"),
    "card-name": formData.get("card-name"),
    "expiry-date": formData.get("expiry-date"),
    cvv: formData.get("cvv"),
  });

  if (!validateFormFields.success) {
    return validateFormFields?.error?.flatten()?.fieldErrors;
  }

  await clearCartAction();

  revalidatePath("/cart/payment");
  redirect("/cart/payment/order-confirmation");
}

// cross-check code, and refactor, remove all borders
// npm run build to check which of the page is static or dynamic, if static export as ssg
