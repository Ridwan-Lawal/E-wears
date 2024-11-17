"use client";

import ProductImage from "@/app/_components/product-details/ProductImage";
import { generateSkeletonDataURL } from "@/app/_lib/skeleton";

import Image from "next/image";
import { useState } from "react";

function ProductImagesShowCase({ imagesPlaceholderSrcs, images }) {
  const [priorityImgId, setPriorityImgId] = useState(0);

  const onClickImage = (id) => setPriorityImgId(id);

  const skeletonURL = generateSkeletonDataURL(200, 300, "#e2e8f0", "#f1f5f9");

  return (
    <div className="flex flex-col gap-6 lg:w-[50%]">
      <div className="relative aspect-square rounded-lg overflow-hidden ">
        <Image
          src={images?.at(priorityImgId)?.image_url}
          alt={images?.at(priorityImgId)?.color}
          fill
          className="object-cover"
          quality={100}
          placeholder="blur"
          blurDataURL={skeletonURL}
          priority={true}
        />
      </div>

      <div className="  flex items-center gap-5 w-full overflow-x-auto no-scrollbar py-2">
        {images?.map((image, id) => (
          <ProductImage
            key={id}
            image={image}
            imageOnPriority={priorityImgId === id}
            onClick={() => onClickImage(id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImagesShowCase;
