import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    "Malgun Gothic",
    "sans-serif",
  ],
});
