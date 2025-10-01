import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "w-full h-[72px] px-4.5 pt-6 pb-2 rounded-xl",
    "border transition-all duration-200",
    "focus:border-primary-300",
  ],
  {
    variants: {
      state: {
        default: [
          "border-gray-100 bg-white text-black",
          "focus:border-primary-100",
        ],
        filled: ["border-primary-100 bg-white text-black"],
        error: ["border-red bg-white text-black"],
        disabled: [
          "border-gray-100 bg-gray-100 text-gray-300",
          "cursor-not-allowed",
        ],
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);
