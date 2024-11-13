"use client";

import { getcart } from "@/app/_lib/redux/cartSlice";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";

function CartNav() {
  const cart = useSelector(getcart);
  const router = useRouter();
  return (
    <div className="flex items-center justify-between  ">
      <h2>Cart ({cart?.length})</h2>
      <IoArrowBack
        className="text-gray-600 text-xl cursor-pointer"
        onClick={() => router.back()}
      />
    </div>
  );
}

export default CartNav;
