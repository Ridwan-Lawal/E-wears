"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//   check the price sorting in the productlists component and fix it

function Pagination() {
  const [pageNumber, setPageNumber] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function navigatePage(pageNum) {
    setPageNumber(pageNum);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    router.replace(`${pathname}?${params.toString()}`);
  }, [pageNumber, pathname, router, searchParams]);

  return (
    <div className="flex items-center  justify-center mt-10 pagination  gap-3">
      <button
        onClick={() => navigatePage(1)}
        className={clsx("btn", {
          "btn-active": pageNumber === 1,
          "btn-not-active": pageNumber !== 1,
        })}
      >
        1
      </button>
      <button
        onClick={() => navigatePage(2)}
        className={clsx("btn", {
          "btn-active": pageNumber === 2,
          "btn-not-active": pageNumber !== 2,
        })}
      >
        2
      </button>
    </div>
  );
}

export default Pagination;

// Create a remote repository
