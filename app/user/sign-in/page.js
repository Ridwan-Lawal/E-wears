import Image from "next/image";
import googleSvg from "@/public/google.svg";
import logo from "@/public/logo.png";
import { signInAction, signInActionGithub } from "@/app/_lib/actions";
import { FaGithub } from "react-icons/fa";
import { auth } from "@/auth";

export const metadata = {
  title: "Sign-in",
};

function Page() {
  return (
    <div className="flex-1 flex items-center justify-center ">
      <form
        action={signInActionGithub}
        className="text-gray-800 antialiased flex flex-col items-center justify-content gap-8 w-full "
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-2xl text-gray-800 font-semibold">E-wears</p>

            <Image src={logo} alt="logo" quality={100} className="w-10 h-10" />
          </div>
          <h2 className="text-[22px] font-sembold">Sign In</h2>
        </div>

        <button className="border border-gray-300   flex items-center gap-4 py-3 px-8 rounded-md w-full sm:w-[300px] justify-center hover:bg-gray-100 transition-colors">
          <FaGithub className="w-5 h-5" />

          <span className="font-medium">Sign in with Github</span>
        </button>
      </form>
    </div>
  );
}

export default Page;
