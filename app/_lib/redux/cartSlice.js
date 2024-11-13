import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productPrice: { amount: 0, discount: 0 },
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    onSetProductPrice(state, action) {
      state.productPrice = action.payload;
    },

    onAddProductFromDataBase(state, action) {
      state.cart = action.payload;
    },

    onProductToCart(state, action) {
      state.cart = [action.payload, ...state.cart];
    },

    onUpdateProductInCart(state, action) {
      state.cart = state.cart?.map((product) =>
        product.productId === action.payload?.productId
          ? {
              ...product,
              productPrice: action.payload.productPrice,
              productSize: action.payload.productSize,
              productColor: action.payload.productColor,
              productQuantity: action.payload.productQuantity,
            }
          : product
      );
    },

    onIncreaseCartProductQuantity(state, action) {
      state.cart = state.cart?.map((product) =>
        product?.productUniqueId === action.payload
          ? { ...product, productQuantity: product?.productQuantity + 1 }
          : product
      );
    },

    onDecreaseCartProductQuantity(state, action) {
      state.cart = state.cart?.map((product) =>
        product?.productUniqueId === action.payload
          ? { ...product, productQuantity: product?.productQuantity - 1 }
          : product
      );
    },

    onDeleteCartProduct(state, action) {
      state.cart = state.cart.filter(
        (product) => product.productUniqueId !== action.payload
      );
    },

    onClearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  onSetProductPrice,
  onProductToCart,
  onUpdateProductInCart,
  onCartProductQuantity,
  onIncreaseCartProductQuantity,
  onDecreaseCartProductQuantity,
  onDeleteCartProduct,
  onAddProductFromDataBase,
  onClearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getProductPrice = (store) => store.cartState.productPrice;
export const getcart = (store) => store.cartState.cart;
