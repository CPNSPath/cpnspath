const variantStyles = {
  default:
    "bg-white border border-[#E2E8F0] shadow-sm",
  elevated:
    "bg-white border border-[#E2E8F0] shadow-md hover:shadow-lg hover:border-[#CBD5E1]",
  bordered:
    "bg-white border-2 border-[#E2E8F0] hover:border-[#1E3A8A]",
  feature:
    "bg-white border border-[#E2E8F0] shadow-md hover:shadow-lg hover:border-[#1E3A8A] hover:-translate-y-0.5",
};

function Card({ children, variant = "default", className = "", ...props }) {
  return (
    <div
      className={[
        "rounded-xl transition-all duration-200 ease-in-out",
        variantStyles[variant] ?? variantStyles.default,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = "", ...props }) {
  return (
    <div
      className={[
        "px-6 pt-6 pb-4 border-b border-[#E2E8F0]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

function CardBody({ children, className = "", ...props }) {
  return (
    <div
      className={["px-6 py-5", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

function CardFooter({ children, className = "", ...props }) {
  return (
    <div
      className={[
        "px-6 pb-6 pt-4 border-t border-[#E2E8F0]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
