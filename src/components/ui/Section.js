const variantStyles = {
  default:   "bg-white",
  alternate: "bg-[#F8FAFC]",
};

export default function Section({
  children,
  variant = "default",
  className = "",
  as: Tag = "section",
  ...props
}) {
  return (
    <Tag
      className={[
        "w-full py-12 sm:py-16 lg:py-24",
        variantStyles[variant] ?? variantStyles.default,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
