import Link from "next/link";
import { Logo } from "./Logo";

export function LogoLink({
  href,
  color,
  size = "sm",
}: {
  href: string;
  color?: "black" | "white";
  size?: "sm" | "md";
}) {
  const linkSpacing =
    size === "sm" ? "gap-2" : "gap-1 md:gap-2 lg:gap-2 xl:gap-3";

  return (
    <Link href={href} className={`flex items-center font-bold ${linkSpacing}`}>
      <Logo color={color} size={size} />
    </Link>
  );
}
