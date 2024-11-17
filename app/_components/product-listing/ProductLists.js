// import ProductListing from "@/app/_components/product-listing/ProductListing";

import NoFiltersFound from "@/app/_components/product-listing/NoFiltersFound";
import ProductCard from "@/app/_components/product-listing/ProductCard";
import { getAllProducts } from "@/app/_lib/data-service";

async function ProductLists({ filters }) {
  const getProducts = await getAllProducts(filters?.page);
  const allProducts = getProducts?.data;

  const collectionsFilter = filters.collections
    ? allProducts?.filter(
        (product) =>
          product?.collection?.name.toLowerCase() ===
          filters.collections.toLowerCase()
      )
    : allProducts;

  const categoryFilter = filters.category
    ? collectionsFilter?.filter(
        (product) =>
          product?.category?.name?.toLowerCase() ===
          filters?.category?.toLowerCase()
      )
    : collectionsFilter;

  const colorFilter = filters.colors
    ? categoryFilter?.filter((product) =>
        product?.colors?.includes(filters?.colors?.toLowerCase())
      )
    : categoryFilter;

  const ratingFilter = filters.rating
    ? colorFilter?.filter(
        (product) => Math.round(product?.rating) === filters.rating
      )
    : colorFilter;

  let sortedData = ratingFilter;

  if (filters?.sort?.toLowerCase() === "rating-desc") {
    sortedData = sortedData.sort((a, b) => b.rating - a.rating);
  } else if (filters?.sort?.toLowerCase() === "newest-desc") {
    sortedData = sortedData.sort(
      (a, b) =>
        new Date(b?.category?.created_at) - new Date(a?.category?.created_at)
    );
  } else if (filters?.sort?.toLowerCase() === "price-asc") {
    sortedData = sortedData.sort(
      (a, b) => a?.inventory?.at(0)?.sale_price - b?.inventory?.at(0)?.sale_pric
    );
  } else if (filters?.sort?.toLowerCase() === "price-desc") {
    sortedData = sortedData.sort(
      (a, b) =>
        b?.inventory?.at(0)?.sale_price - a?.inventory?.at(0)?.sale_price
    );
  } else {
    sortedData === ratingFilter;
  }

  return (
    <div className="lg:h-screen lg:overflow-auto lg:no-scrollbar py-6  ">
      {sortedData?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-8">
          {sortedData?.map((product, id) => (
            <ProductCard
              key={id}
              product={product}
              priority={id < 2}
              sortedData={sortedData}
            />
          ))}{" "}
        </div>
      ) : (
        <div>
          {" "}
          <NoFiltersFound sortedData={sortedData} />
        </div>
      )}
    </div>
  );
}

export default ProductLists;
