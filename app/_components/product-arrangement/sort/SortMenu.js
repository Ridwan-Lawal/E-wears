"use client";

import BtnArrangement from "@/app/_components/product-arrangement/BtnArrangement";
import Sort from "@/app/_components/product-arrangement/sort/Sort";
import { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const SORTOPTIONS = [
  { name: "rating-desc", value: "Best rating" },
  { name: "newest-desc", value: "Newest" },
  { name: "price-asc", value: "Price: Low to high" },
  { name: "price-desc", value: "Price: High to low" },
];

function SortMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function onClickDropdown() {
    setIsDropdownOpen((cur) => !cur);
  }

  useEffect(() => {
    function listenClickOutsideModal(e) {
      if (!e.target.closest(".sort-menu")) {
        setIsDropdownOpen(false);
      }
    }

    window.addEventListener("click", listenClickOutsideModal);

    return () => window.removeEventListener("click", listenClickOutsideModal);
  }, []);

  return (
    <div className="space-y-3 ">
      <BtnArrangement
        text="Sort by"
        layoutOrder="flex-row-reverse lg:justify-self-end sort-menu"
        onClick={onClickDropdown}
      >
        <IoChevronDown
          className={`${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          } transition-transform sort-menu`}
        />
      </BtnArrangement>

      {isDropdownOpen && (
        <div className="  py-3 px-2 rounded-md bg-white shadow-md shadow-gray-400 absolute right-0 z-50 w-[150px] sort-menu">
          <ul className="flex flex-col gap-2">
            {SORTOPTIONS.map((option, id) => (
              <Sort key={id} sortValue={option} fontSize="text-sm" />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SortMenu;
