import Image from "next/image";
import blackLogoSrc from "../_images/firststage-logo-black-horizontal.png";
import logoSrc from "../_images/firststage-logo-color-horizontal.png";
import whiteLogoSrc from "../_images/firststage-logo-white-horizontal.png";

export function Logo({
  color,
  size = "sm",
}: {
  color?: "black" | "white";
  size?: "sm" | "md" | "lg";
}) {
  const imageDimensions =
    size === "lg"
      ? "h-8 -mt-[2px] md:h-10 md:-mt-[4px] 2xl:h-12 2xl:-mt-[5px] w-auto"
      : size === "sm"
        ? "h-6 -mt-[4px] md:-mt-[2px] w-auto"
        : "h-6 -mt-[2px] md:h-8 md:-mt-[4px] 2xl:h-9 2xl:-mt-[5px] w-auto";
  return (
    <Image
      src={
        color === "black"
          ? blackLogoSrc
          : color === "white"
            ? whiteLogoSrc
            : logoSrc
      }
      className={imageDimensions}
      alt="FirstStage"
      quality={100}
      priority
    />
  );
}
