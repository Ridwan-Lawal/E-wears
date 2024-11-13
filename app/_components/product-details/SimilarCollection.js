import ProductCard from "@/app/_components/product-listing/ProductCard";
import { getProductByCollection } from "@/app/_lib/data-service";

async function SimilarCollection({ currentProductCollectionId, params }) {
  const collections = await getProductByCollection(
    "collection",
    currentProductCollectionId
  );

  return (
    <div className="mt-16 md:mt-24 space-y-6">
      <h2 className="font-semibold text-gray-900 text-[24px]">
        In this collection{" "}
      </h2>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-6 lg:grid-cols-3">
        {collections?.data
          ?.filter((product) => product?.product_id !== params?.productId)
          .map((product, id) => (
            <ProductCard key={id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default SimilarCollection;
