"use client";

import { cn } from "@/design-system/cn";

type ButtonVariant = "primary" | "secondary" | "supporting";

type Props = {
  variant?: ButtonVariant;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-ink border-ink text-white",
    "hover:bg-ink/85 hover:border-ink/85 active:bg-ink/75",
  ),
  secondary: cn(
    "bg-transparent border-2 border-ink text-ink",
    "hover:bg-ink hover:border-ink hover:text-white",
    "active:bg-ink/75 active:text-white",
  ),
  supporting: cn(
    "border-2 border-transparent bg-transparent text-ink",
    "hover:border-ink hover:bg-transparent",
    "active:border-ink active:bg-ink/5",
  ),
};

export function Button({ variant = "supporting", onClick, children, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-[34px] cursor-pointer rounded-[4px] border px-2 text-base font-medium transition-colors duration-150",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
