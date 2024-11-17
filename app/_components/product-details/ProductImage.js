import { generateSkeletonDataURL } from "@/app/_lib/skeleton";
import Image from "next/image";

function ProductImage({ image, onClick, imageOnPriority }) {
  const skeletonURL = generateSkeletonDataURL(100, 150, "#e2e8f0", "#f1f5f9");

  return (
    <div
      onClick={onClick}
      className={` relative w-[100px] h-[150px] rounded-lg cursor-pointer overflow-hidden flex-none  ${
        imageOnPriority && "border-2 border-lightBlue"
      } `}
    >
      <Image
        src={image?.image_url}
        alt={image?.color}
        fill
        className="object-cover"
        quality={100}
        placeholder="blur"
        blurDataURL={skeletonURL}
        loading="lazy"
      />
    </div>
  );
}

export default ProductImage;
