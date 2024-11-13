"use client";

import { onClearFilters } from "@/app/_lib/redux/filterSlice";
import { IoShirtOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

function NoFiltersFound() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center  min-h-[50vh]">
      <IoShirtOutline className="text-3xl text-indigo" />
      <h3 className="font-normal mt-4 text-2xl text-gray-800">
        Nothing found just yet
      </h3>

      <p className="text-lg text-gray-900 mt-2 text-center">
        Adjust your filters a bit, and let&apos;s see what we can find!
      </p>

      <button
        onClick={() => dispatch(onClearFilters())}
        className="bg-indigo text-white font-medium rounded-md mt-4 py-3 px-6 hover:bg-lightBlue transition-colors"
      >
        Reset filters
      </button>
    </div>
  );
}

export default NoFiltersFound;
