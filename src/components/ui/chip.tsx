import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva("chip", {
  variants: {
    selected: {
      true: "chip--selected",
      false: "",
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export interface ChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, selected, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        chipVariants({ selected }),
        disabled && "chip--disabled pointer-events-none",
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
);

Chip.displayName = "Chip";
