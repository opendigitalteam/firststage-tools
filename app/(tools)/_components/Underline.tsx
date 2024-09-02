import { ReactNode } from "react";

export function Underline({
  size = "md",
  children,
}: {
  size?: "md" | "lg" | "xl";
  children: ReactNode;
}) {
  let className = "underline decoration-odpink-mid";

  switch (size) {
    case "md":
      className += " underline-offset-2 decoration-2";
      break;
    case "lg":
      className += " underline-offset-4";
      break;
    case "xl":
      className += " underline-offset-4 lg:underline-offset-8";
      break;
  }

  return <strong className={className}>{children}</strong>;
}
