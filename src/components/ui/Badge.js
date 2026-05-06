const variantStyles = {
  default:
    "bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]",
  primary:
    "bg-[#DBEAFE] text-[#1E3A8A] border border-[#BFDBFE]",
  accent:
    "bg-[#FFEDD5] text-[#C2410C] border border-[#FED7AA]",
  success:
    "bg-[#D1FAE5] text-[#059669] border border-[#A7F3D0]",
  warning:
    "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]",
  error:
    "bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]",
  popular:
    "bg-[#1E3A8A] text-white border border-transparent",
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-xs px-2.5 py-1 gap-1.5",
};

const dotColors = {
  default: "bg-[#94A3B8]",
  primary: "bg-[#1E3A8A]",
  accent:  "bg-[#EA580C]",
  success: "bg-[#059669]",
  warning: "bg-[#D97706]",
  error:   "bg-[#DC2626]",
  popular: "bg-white",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  ...props
}) {
  return (
    <span
      className={[
        "inline-flex items-center font-medium rounded-full leading-none",
        variantStyles[variant] ?? variantStyles.default,
        sizeStyles[size] ?? sizeStyles.md,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {dot && (
        <span
          className={[
            "w-1.5 h-1.5 rounded-full shrink-0",
            dotColors[variant] ?? dotColors.default,
          ].join(" ")}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
