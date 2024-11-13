import Image from "next/image";

function ProductImage({ image, imagePlaceholder, onClick, imageOnPriority }) {
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
        placeholder={imagePlaceholder ? "blur" : "empty"}
        blurDataURL={imagePlaceholder}
        loading="lazy"
      />
    </div>
  );
}

export default ProductImage;
