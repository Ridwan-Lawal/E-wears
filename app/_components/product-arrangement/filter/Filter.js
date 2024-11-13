"use client";

import { getFilters, onFilterProducts } from "@/app/_lib/redux/filterSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function Filter({ filter, fontSize, filterType }) {
  const dispatch = useDispatch();
  const filters = useSelector(getFilters);
  // console.log(filters);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // build the no product found page
  // build the sorting and the pagination

  // console.log(pathname);

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([filterType, filter]) => {
      // console.log(filterType, filter);
      if (filter) params.set(filterType, filter);
      else params.delete(filterType);
    });

    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, router, pathname]);

  // function handleFilter() {

  // }

  // console.log(searchParams);

  return (
    <li
      onClick={() => {
        dispatch(onFilterProducts({ type: filterType, value: filter }));
        // handleFilter(filterType, filter);
      }}
      className="filter__reusable-block cursor-pointer"
    >
      <span>
        {filters[filterType] === filter ? (
          <IoCheckbox className="text-xl text-[#4338ca]" />
        ) : (
          <MdCheckBoxOutlineBlank className="filter__reusable-icon" />
        )}
      </span>
      <span className={`filter__reusable-value ${fontSize}`}>{filter}</span>
    </li>
  );
}

export default Filter;
