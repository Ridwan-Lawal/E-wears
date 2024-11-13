import Pagination from "@/app/_components/Pagination";
import FilterMenu from "@/app/_components/product-arrangement/filter/FilterMenu";
import CartLoader from "@/app/_components/product-listing/CartLoader";
import ProductLists from "@/app/_components/product-listing/ProductLists";
import ProductOrder from "@/app/_components/ProductOrder";
import Spinner from "@/app/_components/Spinner";
import { getUsers, getUsersEmail } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import { Suspense } from "react";

async function Page({ searchParams }) {
  const suspenseKey = `${searchParams?.collections ?? ""}-${
    searchParams?.category ?? ""
  }-${searchParams?.colors ?? ""}-${searchParams?.rating ?? ""}-${
    searchParams?.sort
  }-${searchParams?.page}`;

  return (
    <div className="flex flex-col md:gap-8  md:flex-row z-50 w-full">
      {/* filter */}

      <FilterMenu />

      <div className=" flex-1  relative">
        <div className=" flex-1  relative">
          {/* move this button into a client component */}
          <ProductOrder />

          {/* product listing */}
          <Suspense fallback={<Spinner />} key={suspenseKey}>
            <ProductLists filters={searchParams} />
          </Suspense>
        </div>

        {/* pagination */}
        <Pagination />
      </div>
    </div>
  );
}

export default Page;

// Start with the
/*
- Sort by
- Nav (cart, profile picture and name log-out)
- Product details page 
- cart page
- checkout page



*/
