import Link from "next/link";
import { IoShirtOutline } from "react-icons/io5";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center  min-h-[50vh] ">
      <IoShirtOutline className="text-3xl text-indigo" />
      <h3 className="font-normal mt-4 text-2xl text-gray-600">Empty Cart?</h3>

      <p className="text-lg text-gray-600 mt-3  text-center">
        Add a product to the cart
      </p>

      <Link href="/">
        <button className="bg-indigo text-white font-medium rounded-md mt-4 py-3 px-6 hover:bg-lightBlue transition-colors text-sm">
          Go back home
        </button>
      </Link>
    </div>
  );
}

export default EmptyCart;
