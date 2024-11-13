"use client";

import ProductCard from "@/app/_components/product-listing/ProductCard";
import { getFilterReducer } from "@/app/_lib/redux/filterSlice";
import { useSelector } from "react-redux";

function ProductListing({ children, allProduct }) {
  const { filters } = useSelector(getFilterReducer);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-8">
      {children}
    </div>
  );
}

export default ProductListing;
