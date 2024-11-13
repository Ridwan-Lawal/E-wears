"use client";

import { getSort, onSortProducts } from "@/app/_lib/redux/filterSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function Sort({ sortValue, fontSize }) {
  const dispatch = useDispatch();
  const sort = useSelector(getSort);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [sort, router,pathname, searchParams]);

  // add the sort value to the url
  // go to the productlists components and filter based on the sort value in the param

  return (
    <li
      onClick={() => {
        dispatch(onSortProducts(sortValue.name));
      }}
      className="filter__reusable-block cursor-pointer"
    >
      <span>
        {sort === sortValue.name ? (
          <IoCheckbox className="text-xl text-[#4338ca]" />
        ) : (
          <MdCheckBoxOutlineBlank className="filter__reusable-icon" />
        )}
      </span>
      <span className={`filter__reusable-value ${fontSize}`}>
        {sortValue.value}
      </span>
    </li>
  );
}

export default Sort;
