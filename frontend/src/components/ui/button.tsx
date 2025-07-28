import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex font-roboto-flex border items-center justify-center gap-3 max-md:gap-2 whitespace-nowrap rounded-xl transition-all disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient hover:bg-gradient-hover active:bg-gradient-pressed disabled:bg-gradient-disabled text-white hover:text-stone-50 active:text-stone-100 disabled:text-stone-200",
      },

      size: {
        default: "py-2 px-4 has-[>svg]:px-3",
        sm: "py-1 px-2 has-[>svg]:px-3",
        lg: "py-3 px-6 has-[>svg]:px-3",
        icon: "size-9",
        custom: "p-[2px]"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <div>
      <Comp
        data-slot="button"
        className={cn(
          "cursor-pointer text-[18px] max-sm:text-[16px]",
          buttonVariants({ variant, size, className })
        )}
        {...props}
      />
    </div>
  );
}

export { Button, buttonVariants };
