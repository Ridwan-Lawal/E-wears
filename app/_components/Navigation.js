"use client";

import { signOutAction } from "@/app/_lib/actions";
import { getcart } from "@/app/_lib/redux/cartSlice";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoCartOutline, IoExitOutline, IoHomeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function Navigation({ session }) {
  const pathname = usePathname();
  const router = useRouter();
  const cart = useSelector(getcart);

  //  if no current session
  if (!session) return;

  return (
    <nav className="py-2 flex">
      <div className="flex items-center justify-between w-full gap-5 md:gap-6  ">
        {pathname === "/cart" ? (
          <button className="">
            <IoHomeOutline
              className="nav__icon text-xl"
              onClick={() => router.push("/")}
            />
          </button>
        ) : (
          <div className="relative">
            <button>
              <IoCartOutline
                className="nav__icon text-3xl"
                onClick={() => router.push("/cart")}
              />
            </button>

            {cart?.length > 0 && (
              <p className="bg-indigo h-4 w-4 flex justify-center rounded-full font-medium text-[11px] text-white absolute -top-0">
                {cart?.length}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center gap-6 ">
          <div className=" md:flex md:items-center md:gap-2 ">
            <div className="relative overflow-hidden rounded-full  w-7 h-7 border">
              <Image
                src={session?.user?.image}
                alt={`${session?.user?.name}'s avatar`}
                fill
                className="object-cover"
                quality={100}
                loading="lazy"
              />
            </div>

            <p className="hidden md:block text-[13px]">
              {session?.user?.name?.split(" ")?.at(0)}
            </p>
          </div>

          <form action={signOutAction}>
            <button>
              <IoExitOutline className="nav__icon" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
