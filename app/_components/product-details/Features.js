"use client";

import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

function Features({ feature, currentProductFeatures }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onDropdown = () => setIsDropdownOpen((cur) => !cur);

  return (
    <div className="flex flex-wrap  justify-between items-center gap-1.5 pb-5 border-b  ">
      <p className="text-gray-800 text-[16.5px] font-medium">{feature}</p>
      <button
        onClick={onDropdown}
        className={`text-gray-400 text-[22px] ${
          isDropdownOpen ? "rotate-180" : "rotate-0"
        } transition-transform duration-300`}
      >
        {isDropdownOpen ? <IoRemoveCircleOutline /> : <IoAddCircleOutline />}
      </button>

      <div
        className={`grid transition-all duration-300 w-full ease-in-out ${
          isDropdownOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className={`w-full overflow-hidden space-y-1.5   `}>
          {currentProductFeatures
            ?.filter((productFeature) => productFeature?.title === feature)
            ?.at(0)
            ?.description?.map((desc, id) => (
              <li
                key={id}
                className="flex items-start gap-3  text-gray-500 font-medium"
              >
                <span>
                  {" "}
                  <GoDotFill className="w-[8px]  mt-0.5" />
                </span>
                <span className="text-sm "> {desc}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Features;
