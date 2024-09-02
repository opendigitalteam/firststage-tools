export default function Tag({
  className = "",
  size = "xs",
  title,
  children,
}: {
  size?: "xs" | "sm";
  className?: string;
  title?: string;
  children: React.ReactNode;
}) {
  const sizeClass = size === "xs" ? "text-[.6rem] px-1" : "text-xs px-2 py-1";
  return (
    <div
      className={`whitespace-nowrap rounded font-semibold uppercase ${sizeClass} ${className}`}
      title={title}
    >
      {children}
    </div>
  );
}
