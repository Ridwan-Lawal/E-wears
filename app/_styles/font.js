import { Noto_Sans } from "next/font/google";

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  fallback: ["roboto", "arial", "system-ui"],
});