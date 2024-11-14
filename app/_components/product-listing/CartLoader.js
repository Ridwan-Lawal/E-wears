"use client";

import { getCartByUserId } from "@/app/_lib/data-service";
import { onAddProductFromDataBase } from "@/app/_lib/redux/cartSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function CartLoader({ session, children }) {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    async function gettingProductFromDBOnPageRender() {
      try {
        const cartProductsFromDatabase = await getCartByUserId(
          session?.user?.userId
        );

        dispatch(onAddProductFromDataBase(cartProductsFromDatabase));
      } catch (err) {
        toast.error(err.message);
        throw new Error(err.message);
      }
    }

    if (session) gettingProductFromDBOnPageRender();
  }, [dispatch, session, pathname]);

  return children;
}

export default CartLoader;
