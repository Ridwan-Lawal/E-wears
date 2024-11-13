import Link from "next/link";
import { IoBagCheck } from "react-icons/io5";

export const metadata = {
  title: "Order confirmation",
};

function page() {
  return (
    <div className="flex items-center justify-center  w-full">
      <div className="flex items-center justify-center flex-col gap-6">
        <IoBagCheck className="text-indigo text-[70px]" />

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl text-gray-800 font-semibold">
            Order has been confirmed
          </h1>
          <p className="text-gray-700 text-xl ">Expected in 3 days</p>
        </div>

        <Link href="/">
          <button className="rounded-md bg-indigo text-white font-medium text-[15px] py-2.5 px-6">
            Go back home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default page;
