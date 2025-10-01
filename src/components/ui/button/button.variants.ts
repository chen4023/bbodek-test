import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "w-full h-14 rounded-xl",
    "text-base font-bold",
    "transition-all duration-200",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-300 text-white",
          "hover:bg-primary-300/90",
          "active:bg-primary",
          "disabled:bg-gray-100 disabled:text-gray-300",
        ],
        secondary: [
          "bg-gray-100 text-black",
          "hover:bg-gray-200",
          "active:bg-gray-200/80",
          "disabled:bg-gray-100 disabled:text-gray-300",
        ],
      },
      size: {
        md: "h-14 text-base",
        lg: "h-16 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
