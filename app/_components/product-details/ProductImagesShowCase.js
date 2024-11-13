"use client";

import ProductImage from "@/app/_components/product-details/ProductImage";

import Image from "next/image";
import { useState } from "react";

function ProductImagesShowCase({ imagesPlaceholderSrcs, images }) {
  const [priorityImgId, setPriorityImgId] = useState(0);

  const onClickImage = (id) => setPriorityImgId(id);

  return (
    <div className="flex flex-col gap-6 lg:w-[50%]">
      <div className="relative aspect-square rounded-lg overflow-hidden ">
        <Image
          src={images?.at(priorityImgId)?.image_url}
          alt={images?.at(priorityImgId)?.color}
          fill
          className="object-cover"
          quality={100}
          placeholder={imagesPlaceholderSrcs?.at(0) ? "blur" : "empty"}
          blurDataURL={imagesPlaceholderSrcs?.at(priorityImgId)}
          priority={true}
        />
      </div>

      <div className="  flex items-center gap-5 w-full overflow-x-auto no-scrollbar py-2">
        {imagesPlaceholderSrcs?.map((imagePlaceholder, id) => (
          <ProductImage
            key={id}
            imagePlaceholder={imagePlaceholder}
            image={images[id]}
            imageOnPriority={priorityImgId === id}
            onClick={() => onClickImage(id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImagesShowCase;
