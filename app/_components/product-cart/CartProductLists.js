"use client";

import CartProductCard from "@/app/_components/product-cart/CartProductCard";
import { clearCartAction } from "@/app/_lib/actions";
import { getcart, onClearCart } from "@/app/_lib/redux/cartSlice";
import { useTransition } from "react";
import { useActionState } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

function CartProductLists({ children }) {
  const [isPending, startTransition] = useTransition();

  const cartItems = useSelector(getcart);
  const dispatch = useDispatch();

  function handleClearCart() {
    if (confirm("Do you wish to clear all products in cart?")) {
      startTransition(() => clearCartAction());
    }
  }

  return (
    <div className="lg:flex-grow">
      {/* products */}

      {cartItems?.length > 0 ? (
        <div className="mt-6 lg:mt-0  flex flex-col gap-4">
          {cartItems?.map((item, id) => (
            <CartProductCard
              key={id}
              product={item}
              imgPriority={id < 3 ? true : false}
              imgLoading={id < 3 ? "empty" : "lazy"}
            />
          ))}
        </div>
      ) : (
        children
      )}

      {cartItems.length > 0 && (
        <div className="flex items-center justify-end mt-8">
          <button
            onClick={() => {
              dispatch(onClearCart());
              handleClearCart();
            }}
            disabled={isPending}
            className={` hover:text-gray-800 transition-colors  underline text-sm font-medium  text-right cursor-pointer ${
              isPending ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {isPending ? "Clearing cart..." : " Clear cart"}
          </button>
        </div>
      )}
    </div>
  );
}

export default CartProductLists;
