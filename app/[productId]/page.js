import ColorSizeQuantity from "@/app/_components/product-details/ColorSizeQuantity";
import Features from "@/app/_components/product-details/Features";
import ProductPrice from "@/app/_components/product-details/Price";
import ProductImages from "@/app/_components/product-details/ProductImages";
import SimilarCollection from "@/app/_components/product-details/SimilarCollection";
import Spinner from "@/app/_components/Spinner";
import { getProductById, getProductFeatures } from "@/app/_lib/data-service";
import { formatCurrency } from "@/app/_lib/helpers";
import { auth } from "@/auth";
import { Suspense } from "react";
import { FaStar } from "react-icons/fa";

export async function generateMetadata({ params }) {
  const currentProductDetails = await getProductById(params);
  return { title: currentProductDetails?.name };
}

async function Page({ params }) {
  let [currentProductDetails, features, session] = await Promise.all([
    getProductById(params),
    getProductFeatures(),
    auth(),
  ]);

  const currentProductCollectionId =
    currentProductDetails?.collection?.collection_id;

  const currentProductFeatures = features?.filter(
    (feature) => feature?.product_id === params.productId
  );

  currentProductDetails = {
    ...currentProductDetails,
    productUniqueId: crypto.randomUUID(),
  };

  return (
    <div className="max-w-[1100px] mx-auto mt-8 w-full">
      <div className="flex flex-col gap-8 lg:flex-row">
        <Suspense fallback={<Spinner />}>
          <ProductImages currentProductDetails={currentProductDetails} />
        </Suspense>

        {/* product details */}
        <div className="lg:w-[50%]">
          <div>
            {/* product name */}
            <h1 className="text-[32px] font-semibold text-gray-900">
              {currentProductDetails?.name}
            </h1>

            {/* product price */}
            <ProductPrice />

            {/* review and rating  */}
            <div className="items-center flex gap-4 mt-4">
              <p className="text-lg">{currentProductDetails?.rating}</p>

              <p className="flex items-center gap-2">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                  <FaStar
                    key={num}
                    className={`${
                      num <= Math.round(currentProductDetails?.rating)
                        ? "text-yellow"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </p>
              <p className="font-medium text-blue-700 text-sm cursor-pointer hover:text-opacity-80 transition-opacity">
                See all {currentProductDetails?.reviews} reviews
              </p>
            </div>

            {/* description */}
            <p className="text-gray-600 mt-7 text-[15px]">
              {currentProductDetails?.description}
            </p>

            {/* product color size and quantity and add to cart */}
            <ColorSizeQuantity
              currentProductDetails={currentProductDetails}
              userId={session?.user?.userId}
            />

            {/* other details about product e.g Features - reusable component */}

            <div className="mt-12 space-y-5">
              <Features
                feature="Features"
                currentProductFeatures={currentProductFeatures}
              />

              <Features
                feature="Fabric & Care"
                currentProductFeatures={currentProductFeatures}
              />

              <Features
                feature="Shipping"
                currentProductFeatures={currentProductFeatures}
              />
            </div>
          </div>
        </div>
      </div>

      {/* in this collection */}
      <Suspense fallback={<Spinner />}>
        <SimilarCollection
          currentProductCollectionId={currentProductCollectionId}
          params={params}
        />
      </Suspense>
    </div>
  );
}

export default Page;

// put them in their seperate component

// use state to store the sizes and the color, so i will be able to get the price based on their values
