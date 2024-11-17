"use client";

import {
  deleteProductFromCart,
  updateProductQuantityAction,
} from "@/app/_lib/actions";
import { formatCurrency } from "@/app/_lib/helpers";
import {
  onDecreaseCartProductQuantity,
  onDeleteCartProduct,
  onIncreaseCartProductQuantity,
} from "@/app/_lib/redux/cartSlice";
import { generateSkeletonDataURL } from "@/app/_lib/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoAdd, IoRemove, IoTrash } from "react-icons/io5";
import { useDispatch } from "react-redux";

function CartProductCard({ product, priority }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const skeletonURL = generateSkeletonDataURL(87, 100, "#e2e8f0", "#f1f5f9");

  return (
    <div className="">
      <div className="flex items-center gap-4">
        <div
          className="relative w-[87px] h-[100px] rounded-md overflow-hidden"
          onClick={() => router.push(`/${product?.productId}`)}
        >
          <Image
            src={product?.productImg}
            alt={product?.productName}
            fill
            className="object-cover"
            quality={100}
            placeholder="blur"
            blurDataURL={skeletonURL}
            priority={priority}
          />
        </div>

        <div className="space-y-2.5  flex-grow">
          <div className="space-y-2 flex items-start justify-between gap-2">
            <div
              className="space-y-1 "
              onClick={() => router.push(`/${product?.productId}`)}
            >
              <p
                className="text-gray-800 text-sm font-medium hover:underline cursor-pointer"
                onClick={() => router.push(`/${product?.productId}`)}
              >
                {product?.productName}
              </p>
              <p className="text-gray-400 text-[13px] font-medium">
                {product?.productCollection}
              </p>
              <p className="text-[13px] text-gray-400 font-medium ">
                <span className="capitalize">{product?.productColor}</span> | S:{" "}
                {product?.productSize || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-800 text-sm font-medium">
                {formatCurrency(
                  product?.productPrice * product?.productQuantity
                )}
              </p>
              <p className="text-gray-500 text-xs mt-2 font-medium text-right">
                {formatCurrency(product?.productPrice)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* quantity */}
            <div className=" flex items-center gap-4">
              <button
                onClick={() => {
                  updateProductQuantityAction({
                    productToUpdate: product,
                    order: "decr",
                  });
                  dispatch(
                    onDecreaseCartProductQuantity(product?.productUniqueId)
                  );
                }}
              >
                <IoRemove />
              </button>

              <span className="text-gray-500 text-xs font-semibold">
                {product?.productQuantity}
              </span>

              <button
                onClick={() => {
                  updateProductQuantityAction({
                    productToUpdate: product,
                    order: "incr",
                  });
                  dispatch(
                    onIncreaseCartProductQuantity(product?.productUniqueId)
                  );
                }}
              >
                <IoAdd />
              </button>
            </div>

            {/* delete */}
            <button
              onClick={() => {
                deleteProductFromCart(product);
                dispatch(onDeleteCartProduct(product?.productUniqueId));
              }}
            >
              <IoTrash className="text-gray-500 text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
