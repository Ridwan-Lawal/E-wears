"use client";

import { formatCurrency } from "@/app/_lib/helpers";
import { getProductPrice } from "@/app/_lib/redux/cartSlice";
import { useSelector } from "react-redux";

function ProductPrice() {
  const productPrice = useSelector(getProductPrice);

  return (
    <>
      {/* price */}
      <h2 className="text-[30px] font-medium text-gray-700 mt-2">
        {formatCurrency(productPrice?.amount)}
        {productPrice?.discount && (
          <span className="text-gray-400 line-through text-xl ml-3">
            {formatCurrency(productPrice?.listPrice)}
          </span>
        )}
      </h2>

      {/* percent */}
      {productPrice?.discount && (
        <p className="text-sm font-medium text-orange-500 w-fit border border-orange-300 bg-orange-200  py-[1px] bg-opacity-5  px-2.5 rounded-3xl mt-2">
          {productPrice?.discount}% OFF
        </p>
      )}
    </>
  );
}

export default ProductPrice;
