"use client";

import { COLORS } from "@/app/_lib/constants";
import { FaCircle } from "react-icons/fa";

function ProductColors({ colors }) {
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
