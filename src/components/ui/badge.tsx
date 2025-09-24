import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

const badgeVariants = cva("badge", {
  variants: {
    variant: {
      primary: "",
      accent: "badge--accent",
      ghost: "badge--ghost",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);

Badge.displayName = "Badge";
