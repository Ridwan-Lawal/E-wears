"use client";

import {
  AddProductToCartAction,
  updateProductQuantityAction,
} from "@/app/_lib/actions";
import {
  getcart,
  getProductPrice,
  onProductToCart,
  onSetProductPrice,
  onUpdateProductInCart,
} from "@/app/_lib/redux/cartSlice";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { IoAdd, IoRemove } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

// add the "Add the cart button in this component" so when we click on add to cart on any product, we store the productImage, total price, size, color and quantity in an object, and dispatch it to redux

function ColorSizeQuantity({ currentProductDetails, userId }) {
  // productImage, totalPrice, size, color, quantity
  const productImg = currentProductDetails?.images?.at(0)?.image_url;

  const cart = useSelector(getcart);
  const isProductInCart = cart.find(
    (product) => product?.productId === currentProductDetails?.product_id
  );

  const [chosenProductColor, setChosenProductColor] = useState(
    isProductInCart?.productColor || currentProductDetails?.colors?.at(0)
  );
  const [chosenProductSize, setChosenProductSize] = useState(
    isProductInCart?.productSize || currentProductDetails?.sizes?.at(0)
  );

  const [productQuantity, setProductQuantity] = useState(
    isProductInCart?.productQuantity || 1
  );

  const dispatch = useDispatch();
  const productPrice = useSelector(getProductPrice);

  const newProduct = {
    productId: currentProductDetails?.product_id,
    productImg,
    productName: currentProductDetails?.name,
    productCollection: currentProductDetails?.collection?.name,
    productPrice: productPrice.amount,
    productSize: chosenProductSize,
    productColor: chosenProductColor,
    productQuantity,
    userID: userId,
    productUniqueId: currentProductDetails?.productUniqueId,
  };

  function onAddProductToCart() {
    toast.success("Product added to the cart");
    AddProductToCartAction(newProduct);
    dispatch(onProductToCart(newProduct));
  }

  useEffect(() => {
    // filtering the productDetails inventory, where there are price based on size and color. So I am going to get the product in the inventory that matches the chosen size and color and get the sale_price and discount.

    const productBasedOnChosenColorAndSize =
      currentProductDetails?.inventory?.filter((product) => {
        if (chosenProductSize) {
          return (
            product?.color === chosenProductColor &&
            product?.size === chosenProductSize
          );
        } else {
          return product?.color === chosenProductColor;
        }
      });

    const productSalePrice =
      productBasedOnChosenColorAndSize?.at(0)?.sale_price * productQuantity;

    const productListPrice =
      productBasedOnChosenColorAndSize?.at(0)?.list_price * productQuantity;

    const productDiscount =
      productBasedOnChosenColorAndSize?.at(0)?.discount_percentage;

    dispatch(
      onSetProductPrice({
        amount: productSalePrice,
        discount: productDiscount,
        listPrice: productListPrice,
      })
    );

    // if the product color, quantity, or size is update, I want to add the update to the product in the cart
    dispatch(
      onUpdateProductInCart({
        productId: currentProductDetails?.product_id,
        productColor: chosenProductColor,
        productSize: chosenProductSize,
        productQuantity,
        productPrice: productSalePrice,
      })
    );
  }, [
    chosenProductColor,
    chosenProductSize,
    productQuantity,
    currentProductDetails,
    dispatch,
  ]);

  return (
    <>
      {/* Available Color */}
      <div className="section">
        <p>Available Colors</p>
        <div>
          {currentProductDetails?.colors?.map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              className={` w-fit p-1.5 bg-opacity-200 rounded-full ${
                color === "white" && "border border-gray-300"
              } `}
              onClick={() => setChosenProductColor(color)}
            >
              <FaCheck
                className={`text-sm  ${
                  color === "white" || color === "beige"
                    ? "text-gray-800"
                    : "text-white"
                } ${
                  color === chosenProductColor ? "opacity-100" : "opacity-0"
                } `}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Available Sizes */}
      <div className="section">
        <p>Available Sizes</p>

        <div>
          {currentProductDetails?.sizes?.map((size) => (
            <button
              key={size}
              onClick={() => setChosenProductSize(size)}
              className={clsx(
                "py-[11px] px-5 rounded-md border border-gray-200 text-sm text-gray-900",
                { "border border-lightBlue": size === chosenProductSize }
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      {/* quantity */}
      <div className="section">
        <p>Quantity</p>

        <div>
          <div className="quantity">
            <IoRemove
              onClick={() => {
                setProductQuantity((cur) => (cur > 1 ? cur - 1 : cur));
                console.log(newProduct?.productUniqueId, "Update");
                if (isProductInCart) {
                  updateProductQuantityAction({
                    productToUpdate: newProduct,
                    order: "desc",
                  });
                }
              }}
            />
            <span className="text-sm text-gray-600 font-semibold">
              {productQuantity}
            </span>
            <IoAdd
              onClick={() => {
                setProductQuantity((cur) => cur + 1);
                console.log(newProduct?.productUniqueId);

                if (isProductInCart) {
                  updateProductQuantityAction({
                    productToUpdate: newProduct,
                    order: "incr",
                  });
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* add to cart button */}
      {!isProductInCart && (
        <button
          onClick={onAddProductToCart}
          className="text-white font-medium bg-indigo py-[13px] px-6 w-full mt-8 rounded-md hover:bg-lightBlue transition-colors "
        >
          Add to Cart
        </button>
      )}
    </>
  );
}

export default ColorSizeQuantity;
