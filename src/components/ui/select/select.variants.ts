import { cva } from "class-variance-authority";

export const selectVariants = cva(
  [
    "w-full px-5 py-4 text-left rounded-xl border border-gray-100",
    "transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-100",
  ],
  {
    variants: {
      selected: {
        true: "bg-primary-200 text-primary-300 border border-primary-300",
        false:
          "bg-white text-gray-900 border border-gray-100 hover:border-gray-200",
      },
      disabled: {
        true: "bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
    },
    compoundVariants: [
      {
        selected: true,
        disabled: false,
        class: "bg-blue-50 text-blue-600 border-blue-400",
      },
    ],
  }
);
