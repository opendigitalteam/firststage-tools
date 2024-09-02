import Image from "next/image";
import Link from "next/link";
import logoBlack from "../_images/firststage-logo-black-horizontal.png";
import logoWhite from "../_images/firststage-logo-white-horizontal.png";

export default function FooterBranding({
  align,
  dark = false,
}: {
  align?: "left";
  dark?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between gap-1 ${
        align === "left" ? "items-start" : "items-center"
      }`}
    >
      <div className="flex items-center gap-2">
        <Link href="https://firststage.co" className="h-5">
          <Image
            alt="Logo"
            src={dark ? logoWhite : logoBlack}
            className="h-5 w-fit opacity-90 group-hover:opacity-100"
          />
        </Link>
      </div>

      <div
        className={`text-[11px] font-light ${
          dark ? "text-white/60" : "text-black/60"
        }`}
      >
        <span>Copyright © OpenDigital Limited 2024. </span>
        <Link
          href="https://firststage.co/terms"
          className={`font-medium underline hover:text-odpink-mid ${
            dark ? "text-white/60" : "text-black/60"
          }`}
          target="_blank"
        >
          Terms of Service
        </Link>{" "}
        <Link
          href="https://firststage.co/privacy"
          className={`font-medium underline hover:text-odpink-mid ${
            dark ? "text-white/60" : "text-black/60"
          }`}
          target="_blank"
        >
          Privacy
        </Link>
      </div>
    </div>
  );
}
