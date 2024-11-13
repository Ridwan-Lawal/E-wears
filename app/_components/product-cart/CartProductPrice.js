"use client";

import { formatCurrency } from "@/app/_lib/helpers";
import { getcart } from "@/app/_lib/redux/cartSlice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

// build the checkout
// and start using supabase

function CartProductPrice() {
  const cartItems = useSelector(getcart);
  const router = useRouter();

  const subtotal = cartItems?.reduce(
    (acc, curProduct) =>
      acc + curProduct.productPrice * curProduct.productQuantity,
    0
  );

  let shippingCost = 15;

  if (subtotal > 100) shippingCost = 20;
  if (subtotal > 500) shippingCost = 30;
  if (subtotal > 1000) shippingCost = 45;
  if (subtotal > 5000) shippingCost = 60;

  return (
    <div className="lg:w-[30%] ">
      <div className="space-y-2 border-b pb-6 mt-12 lg:mt-0">
        <p className="summary ">
          <span>Subtotal</span> <span>{formatCurrency(subtotal)}</span>
        </p>

        <p className="summary">
          <span>Shipping Cost</span> <span>{formatCurrency(shippingCost)}</span>
        </p>
      </div>

      <div className="space-y-6 mt-6">
        <p className="summary font-semibold ">
          <span>Total</span>{" "}
          <span>{formatCurrency(subtotal + shippingCost)}</span>
        </p>
        <button
          disabled={cartItems?.length === 0}
          onClick={() => router.push("/cart/payment")}
          className={`  transition-colors text-white text-[15px] font-medium w-full py-2 rounded-md ${
            cartItems?.length
              ? "bg-indigo  hover:bg-lightBlue "
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CartProductPrice;
