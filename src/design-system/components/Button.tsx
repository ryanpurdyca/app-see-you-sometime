"use client";

import { cn } from "@/design-system/cn";

type ButtonVariant = "primary" | "secondary" | "supporting";

type Props = {
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-ink border-ink text-white",
    "hover:bg-ink/85 hover:border-ink/85 active:bg-ink/75",
    "disabled:hover:bg-ink disabled:hover:border-ink disabled:active:bg-ink",
  ),
  secondary: cn(
    "bg-transparent border-2 border-ink text-ink",
    "hover:bg-ink hover:border-ink hover:text-white",
    "active:bg-ink/75 active:text-white",
    "disabled:hover:bg-transparent disabled:hover:text-ink disabled:active:bg-transparent",
  ),
  supporting: cn(
    "border-2 border-transparent bg-transparent text-ink",
    "hover:border-ink hover:bg-transparent",
    "active:border-ink active:bg-ink/5",
    "disabled:hover:border-transparent disabled:active:bg-transparent",
  ),
};

const disabledClasses = "enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40";

export function Button({
  variant = "supporting",
  onClick,
  disabled = false,
  children,
  className,
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "h-[34px] rounded-[4px] border px-2 text-base font-medium transition-colors duration-150",
        disabledClasses,
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
