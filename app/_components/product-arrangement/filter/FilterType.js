"use client";

import { useState } from "react";
import { IoAdd, IoCheckbox, IoRemove } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

function FilterType({ type, children }) {
  const [isFiltersOpen, setIsFilterOpen] = useState(false);

  function onOpenFilters() {
    setIsFilterOpen((cur) => !cur);
  }

  return (
    <div
      className={`flex flex-wrap justify-between  py-5  border-b ${
        isFiltersOpen && "gap-4"
      } `}
    >
      <h3> {type} </h3>
      <button
        onClick={onOpenFilters}
        className={`${
          isFiltersOpen ? "rotate-180" : "rotate-0"
        } transition-transform duration-500
      `}
      >
        {isFiltersOpen ? (
          <IoRemove className="icons" />
        ) : (
          <IoAdd className="icons" />
        )}
      </button>

      <div
        className={`w-full grid ${
          isFiltersOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        } transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <ul className={`flex flex-col  w-full gap-3.5  overflow-hidden`}>
          {children}
        </ul>
      </div>
    </div>
  );
}

export default FilterType;
