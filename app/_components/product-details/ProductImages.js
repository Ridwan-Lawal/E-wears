import ProductImagesShowCase from "@/app/_components/product-details/ProductImagesShowCase";
import { getImagePlaceholder } from "@/app/_lib/data-service";

async function ProductImages({ currentProductDetails }) {
  const images = currentProductDetails?.images;

  return <ProductImagesShowCase images={images} />;
}

export default ProductImages;
