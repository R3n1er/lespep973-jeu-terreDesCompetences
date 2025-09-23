import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[1.5rem] border-4 border-neutral-900 bg-brand-primary text-white font-semibold uppercase shadow-[0_6px_0_#0f172a] transition-transform duration-150 active:translate-y-1 active:shadow-[0_2px_0_#0f172a]",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-white",
        secondary: "bg-brand-secondary text-white",
        accent: "bg-brand-accent text-neutral-900",
        outline: "bg-neutral-0 text-neutral-900 border-neutral-900",
      },
      size: {
        default: "h-12 px-8 text-base",
        lg: "h-14 px-10 text-lg",
        sm: "h-10 px-6 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

