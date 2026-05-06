"use client";

import { forwardRef } from "react";

const sizeStyles = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
  lg: "h-13 px-6 text-base gap-2",
};

const variantStyles = {
  primary:
    "bg-[#1E3A8A] text-white border border-transparent hover:bg-[#1D4ED8] focus-visible:ring-[#1E3A8A]",
  secondary:
    "bg-[#EA580C] text-white border border-transparent hover:bg-[#C2410C] focus-visible:ring-[#EA580C]",
  outline:
    "bg-transparent text-[#1E3A8A] border border-[#1E3A8A] hover:bg-[#EFF6FF] focus-visible:ring-[#1E3A8A]",
  ghost:
    "bg-transparent text-[#475569] border border-transparent hover:bg-[#F1F5F9] focus-visible:ring-[#94A3B8]",
  danger:
    "bg-[#DC2626] text-white border border-transparent hover:bg-[#B91C1C] focus-visible:ring-[#DC2626]",
};

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon = null,
    rightIcon = null,
    className = "",
    type = "button",
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center font-semibold rounded-md",
        "transition-all duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "active:scale-[0.98]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        sizeStyles[size] ?? sizeStyles.md,
        variantStyles[variant] ?? variantStyles.primary,
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!loading && rightIcon ? (
        <span className="shrink-0">{rightIcon}</span>
      ) : null}
    </button>
  );
});

export default Button;
