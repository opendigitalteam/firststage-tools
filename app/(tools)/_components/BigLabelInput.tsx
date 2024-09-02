export default function BigLabelInput({
  label,
  hint,
  input,
  disabled,
  size = "md",
}: {
  label: React.ReactNode;
  hint?: React.ReactNode;
  input: React.ReactNode;
  disabled?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <label
      className={`flex rounded border-b border-odpink-black/[3%] bg-odpink-gray p-4 pr-5 transition-colors has-[:checked]:border-odpink-black/5 has-[:checked]:bg-odpink-black/10 ${
        size === "sm" ? "gap-1 lg:gap-3" : "gap-3 lg:gap-5"
      } ${disabled ? "opacity-60" : "has-[input:enabled]:cursor-pointer"} `}
    >
      <div className={`flex items-start ${size === "sm" ? "pt-0.5" : ""}`}>
        {input}
      </div>
      <div className={`flex flex-col ${size === "sm" ? "" : "gap-1"}`}>
        <div
          className={`font-medium leading-tight ${
            size === "sm" ? "text-xs lg:text-sm" : "max-lg:text-sm"
          }`}
        >
          {label}
        </div>
        {hint && (
          <div
            className={`font-light text-odpink-black/75 ${
              size === "sm" ? "text-xs" : "text-xs md:text-sm"
            }`}
          >
            {hint}
          </div>
        )}
      </div>
    </label>
  );
}
