"use client";

import Filter from "@/app/_components/product-arrangement/filter/Filter";
import FilterType from "@/app/_components/product-arrangement/filter/FilterType";
import { CATEGORY, COLLECTIONS, COLORS, RATINGS } from "@/app/_lib/constants";
import {
  getFilters,
  getNavToggle,
  onClearFilters,
  onFilterProducts,
  onToggleNav,
} from "@/app/_lib/redux/filterSlice";
import { useEffect, useRef } from "react";
import { FaCheck, FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function FilterMenu() {
  const filters = useSelector(getFilters);
  const isFilterNavOpen = useSelector(getNavToggle);
  const dispatch = useDispatch();
  const ref = useRef(null);

  // modal closing
  useEffect(() => {
    const currentRef = ref.current;
    function listenClickOutsideModal(e) {
      if (isFilterNavOpen && !e.target.closest(".filter-menu")) {
        dispatch(onToggleNav());
      }
    }

    currentRef.addEventListener("click", listenClickOutsideModal);

    return () =>
      currentRef.removeEventListener("click", listenClickOutsideModal);
  }, [isFilterNavOpen, dispatch]);

  return (
    <div
      ref={ref}
      className={`fixed navigation lg:block top-0 left-0  bg-black lg:bg-opacity-0 backdrop-blur-[2px] min-h-screen lg:static lg:bg-none lg:backdrop-blur-0 lg:max-w-[260px] z-40 ${
        isFilterNavOpen
          ? "w-full opacity-100 bg-opacity-30 "
          : " bg-opacity-0  lg:w-full lg:opacity-100"
      }  `}
    >
      <div
        className={`filter-menu  bg-white   pt-3 pb-5 md:pt-0 max-w-[300px] lg:max-w-[300px]  h-screen overflow-auto no-scrollbar ${
          isFilterNavOpen ? "w-full px-4" : "w-0 lg:w-full px-0 "
        } transition-all  duration-200  `}
      >
        <div>
          {/* Nav */}
          <div className="flex items-center justify-between border-b lg:hidden pb-4 mb-2">
            <h2 className="text-gray-800 text-[21px]">Filter</h2>
            <button className="mt-1" onClick={() => dispatch(onToggleNav())}>
              <IoClose className="icons" />
            </button>
          </div>

          {/* collections */}
          <FilterType type="Collections">
            {COLLECTIONS.map((collection, id) => (
              <Filter key={id} filterType="collections" filter={collection} />
            ))}
          </FilterType>

          {/* category */}
          <FilterType type="Category">
            {CATEGORY.map((category, id) => (
              <Filter key={id} filterType="category" filter={category} />
            ))}
          </FilterType>

          {/* colors */}
          <FilterType type="Colors">
            <div className="flex items-center flex-wrap gap-3">
              {COLORS.map((color, id) => (
                <button
                  key={id}
                  style={{ backgroundColor: color.value }}
                  className={` h-fit p-1.5 bg-opacity-200 rounded-full ${
                    color.name === "white" && "border border-gray-300"
                  } `}
                  onClick={() =>
                    dispatch(
                      onFilterProducts({ type: "colors", value: color.name })
                    )
                  }
                >
                  <FaCheck
                    className={`text-xs  ${
                      color.name === "white" ? "text-gray-800" : "text-white"
                    } ${
                      filters.colors === color.name
                        ? "opacity-100"
                        : "opacity-0"
                    } `}
                  />
                </button>
              ))}
            </div>
          </FilterType>

          {/* ratings */}
          <FilterType type="Rating">
            {RATINGS.reverse().map((rating, id) => (
              <div key={id} className="flex items-center gap-4">
                <button
                  className={`flex items-center gap-1 hover:scale-95 transition-transform ${
                    filters.rating === rating && "scale-95"
                  }`}
                  onClick={() =>
                    dispatch(
                      onFilterProducts({ type: "rating", value: rating })
                    )
                  }
                >
                  {Array.from({ length: rating }).map((minRating, i) => (
                    <FaStar key={i} className="text-orange-400" />
                  ))}

                  {Array.from({ length: RATINGS.length - rating }).map(
                    (minRating, i) => (
                      <FaStar key={i} className="text-gray-200 " />
                    )
                  )}
                </button>

                <span>
                  {filters.rating === rating && (
                    <FaCheck className="text-gray-800 text-xs" />
                  )}
                </span>
              </div>
            ))}
          </FilterType>

          <button
            onClick={() => dispatch(onClearFilters())}
            className="text-indigo font-semibold text-sm text-center mt-6 hover:text-blue-500 transition-colors cursor-pointer w-full flex items-center justify-center "
          >
            Clear All (X)
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterMenu;
