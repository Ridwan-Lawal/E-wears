import ProductImagesShowCase from "@/app/_components/product-details/ProductImagesShowCase";
import { getImagePlaceholder } from "@/app/_lib/data-service";

async function ProductImages({ currentProductDetails }) {
  const images = currentProductDetails?.images;

  const imagesPlaceholderSrcs = await Promise.all(
    images?.map((img) => getImagePlaceholder(img?.image_url))
  );

  console.log(imagesPlaceholderSrcs);

  //   console.log(currentProductDetails);

  return (
    <ProductImagesShowCase
      imagesPlaceholderSrcs={imagesPlaceholderSrcs}
      images={images}
    />
  );
}

export default ProductImages;
