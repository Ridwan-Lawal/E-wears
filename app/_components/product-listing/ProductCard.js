import ProductColors from "@/app/_components/product-listing/ProductColors";
import { getImagePlaceholder } from "@/app/_lib/data-service";

import { formatCurrency } from "@/app/_lib/helpers";
import Image from "next/image";
import Link from "next/link";

async function ProductCard({ product, priority }) {
  const productImageSrc = product?.images?.at(0)?.image_url;
  const placeholderSrc = await getImagePlaceholder(productImageSrc);

  const inventory = product?.inventory?.at(0);
  const colors = product?.colors;
  const images = product?.images;

  return (
    <div className="flex-none   flex flex-col  gap-5 w-full px-6 pb-4 ">
      <Link href={`/${product?.product_id}`}>
        <div className="relative w-full h-[280px] md:h-[280px]  rounded-lg overflow-hidden shadow-xl shadow-md-100">
          <Image
            src={images?.at(0)?.image_url}
            alt={product?.name}
            fill
            className="object-cover"
            placeholder={placeholderSrc ? "blur" : "empty"}
            blurDataURL={placeholderSrc}
            quality={50}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        </div>
      </Link>
      <div>
        <p className="text-xs text-gray-500 font-medium capitalize mt-3">
          {colors?.at(0)}
        </p>
        <Link href={`/${product?.product_id}`}>
          <p className="text-lg hover:underline transition-all text-gray-900 font-medium mt-1">
            {product?.name}
          </p>
        </Link>
        <p className="text-gray-500  mt-2 font-medium space-x-2">
          <span>{formatCurrency(inventory?.sale_price)}</span>{" "}
          {inventory?.discount_percentage && (
            <span className="line-through text-xs">
              {formatCurrency(inventory?.list_price)}
            </span>
          )}
        </p>
      </div>

      <ProductColors colors={colors} />
    </div>
  );
}

export default ProductCard;
