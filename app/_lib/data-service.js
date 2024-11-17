import { supabase } from "@/app/_lib/supabase/supabase";
import Image from "next/image";

export async function getCartByUserId(userId) {
  const { data: cart, error } = await supabase
    .from("cart")
    .select()
    .order("created_at", { ascending: false })
    .eq("userID", userId);

  if (error) throw new Error(error.message);

  return cart;
}

export async function getUsersEmail(userEmail) {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("user_email", userEmail);

  if (error) {
    throw new Error(error.message);
    console.log(error);
  }

  return data;
}

export async function addNewUser({ userEmail, fullName }) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ user_email: userEmail, fullName }])
    .select();

  if (error) {
    throw new Error(error.message);
    console.log(error);
  }

  return data;
}

export async function getUsers() {
  let { data: users, error } = await supabase.from("users").select("*");

  if (error) throw new Error(error.message);
  return users;
}

export async function getAllProducts(pageNumber) {
  try {
    const res = await fetch(
      `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?page=${pageNumber}`,
      { next: { revalidate: 86400 } }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProductFeatures() {
  try {
    const res = await fetch(
      "https://api.jsonsilo.com/public/8eb6e72d-33b3-4db6-b4cf-bb518a2c811a"
    );
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getImagePlaceholder(imageUrl) {
  return null;
}

export async function getProductById(params) {
  const products = await getAllProducts();
  const allProducts = products?.data;
  const productCurrentlyViewing = allProducts?.find(
    (product) => product.product_id === params?.productId
  );

  return productCurrentlyViewing;
}

export async function getProductByCollection(query, value) {
  console.log(query, value);
  try {
    const res =
      await fetch(`https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?${query}=${value} 
    `);
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// stage, commit, and push changes to local repo
// find out why it is slow
// try to find out how to lazy load image
