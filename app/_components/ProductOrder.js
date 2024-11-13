"use client";

import BtnArrangement from "@/app/_components/product-arrangement/BtnArrangement";
import SortMenu from "@/app/_components/product-arrangement/sort/SortMenu";
import { onToggleNav } from "@/app/_lib/redux/filterSlice";
import { IoFilterOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

function ProductOrder() {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between py-2 lg:justify-end">
      <BtnArrangement
        text="Filter"
        visibility="lg:hidden"
        onClick={() => dispatch(onToggleNav())}
      >
        <IoFilterOutline />
      </BtnArrangement>

      <SortMenu />
    </div>
  );
}

export default ProductOrder;
