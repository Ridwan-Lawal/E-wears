import CartNav from "@/app/_components/product-cart/CartNav";
import CartProductLists from "@/app/_components/product-cart/CartProductLists";
import CartProductPrice from "@/app/_components/product-cart/CartProductPrice";
import EmptyCart from "@/app/_components/product-cart/EmptyCart";
import { getCartByUserId } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import { IoArrowBack } from "react-icons/io5";

export const metadata = {
  title: "Cart",
};

async function Page() {
  const session = await auth();
  const cartProducts = await getCartByUserId(session?.user?.userId);

  return (
    <div className="space-y-8 w-full">
      <CartNav />
      <div className="flex flex-col lg:flex-row lg:gap-8  ">
        <CartProductLists cartProducts={cartProducts}>
          <EmptyCart />{" "}
        </CartProductLists>

        <CartProductPrice />
      </div>
    </div>
  );
}

export default Page;
