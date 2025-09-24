import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "btn",
  {
    variants: {
      variant: {
        accent: "btn--accent",
        primary: "btn--primary",
        secondary: "btn--secondary",
        ghost: "btn--ghost",
        outline: "btn--outline",
        danger: "btn--danger",
      },
      size: {
        sm: "btn--sm",
        md: "btn--md",
        lg: "btn--lg",
        xl: "btn--xl",
        xxl: "btn--xxl",
        icon: "btn--icon",
      },
    },
    defaultVariants: {
      variant: "accent",
      size: "md",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
