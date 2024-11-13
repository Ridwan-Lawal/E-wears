import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import Navigation from "@/app/_components/Navigation";
import CartLoader from "@/app/_components/product-listing/CartLoader";
import StoreProvider from "@/app/_lib/redux/StoreProvider";
import { notoSans } from "@/app/_styles/font";
import "@/app/_styles/globals.css";
import { auth } from "@/auth";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    template: "%s - E-wears",
    default: "Welcome - E-wears",
  },

  description: "Welcome to E-wears, your No. 1 stop for buying ",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased pt-6  min-h-screen flex flex-col`}
      >
        <StoreProvider>
          <CartLoader session={session}>
            <section className="space-y-4 flex-grow w-full flex flex-col">
              <Header />
              <main className="flex-grow  flex w-full">{children}</main>
            </section>

            <Footer />
          </CartLoader>
        </StoreProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
