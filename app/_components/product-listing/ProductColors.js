"use client";

import { COLORS } from "@/app/_lib/constants";
import { onProductsExistForFilters } from "@/app/_lib/redux/filterSlice";
import { useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";

function ProductColors({ colors, sortedData }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sortedData?.length) {
      dispatch(onProductsExistForFilters(false));
    } else {
      dispatch(onProductsExistForFilters(true));
    }
  }, [dispatch, sortedData]);

  return (
    <div className="w-fit  mt-2 flex gap-2 items-center">
      {colors?.map((color, id) => (
        <FaCircle
          key={id}
          color={COLORS?.find((col) => col?.name === color)?.value}
          className={`text-lg ${
            color === "white" && "border border-gray-300 rounded-full"
          } `}
        />
      ))}
    </div>
  );
}

export default ProductColors;
