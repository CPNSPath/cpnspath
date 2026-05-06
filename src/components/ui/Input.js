import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  {
    label,
    helperText,
    errorMessage,
    leftIcon,
    rightIcon,
    required = false,
    disabled = false,
    className = "",
    type = "text",
    id: externalId,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const hasError = Boolean(errorMessage);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-[#334155]"
        >
          {label}
          {required && (
            <span className="text-[#DC2626] ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-[#94A3B8] pointer-events-none flex items-center">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${id}-error`
              : helperText
              ? `${id}-helper`
              : undefined
          }
          className={[
            "w-full h-11 rounded-md border text-sm text-[#0F172A] placeholder:text-[#94A3B8]",
            "bg-white transition-all duration-200 ease-in-out",
            "focus:outline-none focus:ring-2 focus:ring-[#DBEAFE]",
            leftIcon ? "pl-10" : "pl-4",
            rightIcon ? "pr-10" : "pr-4",
            hasError
              ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#FEE2E2]"
              : "border-[#CBD5E1] focus:border-[#2563EB]",
            disabled
              ? "opacity-50 cursor-not-allowed bg-[#F8FAFC]"
              : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3 text-[#94A3B8] pointer-events-none flex items-center">
            {rightIcon}
          </span>
        )}
      </div>

      {hasError ? (
        <p id={`${id}-error`} className="text-xs text-[#DC2626]" role="alert">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-xs text-[#64748B]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
