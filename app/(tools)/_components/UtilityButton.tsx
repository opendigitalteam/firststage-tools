"use client";
import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { LoadingIcon } from "./LoadingIcon";

export type UtilityButtonColors =
  | "green-light"
  | "green"
  | "red-light"
  | "pink"
  | "purple"
  | "blue"
  | "pink-outline"
  | "pink-dark"
  | "blue-dark"
  | "pink-light"
  | "blue-light"
  | "amber-light";

export type UtilityButtonSizes = "xs" | "sm" | "md" | "lg" | "xl";

export default function UtilityButton({
  children,
  size,
  color,
  onClick,
  pending,
  pendingText,
  disabled,
  full,
  type = "button",
}: {
  children: ReactNode;
  size?: UtilityButtonSizes;
  color?: UtilityButtonColors;
  disabled?: boolean;
  pending?: boolean;
  pendingText?: ReactNode;
  full?: boolean;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type={type}
      className={utilityButtonClassName(size, pending || disabled, color, full)}
      onClick={onClick}
      disabled={pending || disabled}
    >
      <span className={utilityButtonInnerClassName(full)}>
        {pending ? (
          <>
            <LoadingIcon size={iconSize(size)} />{" "}
            <span>{pendingText || "Please wait..."}</span>
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}

export function UtilitySubmit(props: {
  children: ReactNode;
  size?: UtilityButtonSizes;
  color?: UtilityButtonColors;
  disabled?: boolean;
  pending?: boolean;
  pendingText?: ReactNode;
  full?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const { pending } = useFormStatus();
  return (
    <UtilityButton type="submit" pending={pending} {...props}></UtilityButton>
  );
}

export function UtilityLink({
  children,
  size,
  target,
  href,
  color,
  full,
  prefetch,
  disabled,
  onClick = () => {},
}: {
  children: ReactNode;
  href: string;
  color?: UtilityButtonColors;
  prefetch?: boolean;
  target?: string;
  size?: UtilityButtonSizes;
  full?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      target={target}
      className={utilityButtonClassName(size, false, color, full)}
      prefetch={prefetch}
      href={href}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
    >
      <span className={utilityButtonInnerClassName(full)}>{children}</span>
    </Link>
  );
}

export function utilityButtonClassName(
  size: string = "md",
  disabled: boolean = false,
  color: UtilityButtonColors = "pink-dark",
  full = false,
) {
  return `
    group
    items-center
    rounded-full
    font-medium
    transition-colors
    disabled:opacity-50
    ${full ? "flex w-full justify-center" : "flex max-md:w-full max-md:justify-center md:inline-flex"}
    ${
      color === "green-light"
        ? "text-green-700 bg-green-100"
        : color === "green"
          ? "text-green-50 bg-green-600"
          : color === "amber-light"
            ? "text-amber-700 bg-amber-100"
            : color === "red-light"
              ? "text-red-700 bg-red-100"
              : color === "blue"
                ? "text-odblue-white bg-odblue-mid"
                : color === "pink"
                  ? "text-odpink-white bg-odpink-mid"
                  : color === "purple"
                    ? "text-odpurple-white bg-odpurple-mid"
                    : color === "pink-outline"
                      ? "text-odpink-black border-2 border-odpink-black"
                      : color === "blue-light"
                        ? "text-odblue-black bg-odblue-lightest"
                        : color === "pink-light"
                          ? "text-odpink-black bg-odpink-black/5"
                          : color === "blue-dark"
                            ? "text-odblue-white bg-odblue-black"
                            : "text-odpink-white bg-odpink-black"
    }
    ${
      disabled
        ? ""
        : color === "green-light"
          ? "hover:text-green-50 hover:bg-green-600"
          : color === "green"
            ? "hover:bg-green-700"
            : color === "red-light"
              ? "hover:text-red-50 hover:bg-red-600"
              : color === "amber-light"
                ? "hover:text-amber-50 hover:bg-amber-600"
                : color === "blue"
                  ? "hover:bg-odblue-dark hover:text-odblue-white"
                  : color === "pink"
                    ? "hover:bg-odpink-dark hover:text-odpink-white"
                    : color === "pink-outline"
                      ? "hover:bg-odpink-black/25"
                      : color === "purple"
                        ? "hover:bg-odpurple-dark hover:text-odpurple-white"
                        : color === "blue-light"
                          ? "hover:bg-odblue-lighter hover:text-odblue-mid"
                          : color === "pink-light"
                            ? "hover:bg-odpink-lighter hover:text-odpink-mid"
                            : color === "blue-dark"
                              ? "hover:bg-odblue-mid hover:text-odblue-white hover:shadow-sm hover:shadow-odblue-black/5"
                              : "hover:bg-odpink-mid hover:text-odpink-white hover:shadow-sm hover:shadow-odpink-black/5"
    }
    ${
      size === "sm"
        ? "px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm active:translate-y-px"
        : size === "xs"
          ? "px-3 py-1 text-xs active:translate-y-px"
          : size === "lg"
            ? "px-5 py-3 text-lg active:translate-y-[2px]"
            : size === "xl"
              ? "px-5 py-3 md:px-6 md:py-4 text-lg md:text-xl active:translate-y-[2px]"
              : "px-4 py-2 md:px-5 md:py-3 text-sm md:text-base active:translate-y-[2px]"
    }

  `;
}

function iconSize(size: UtilityButtonSizes = "md") {
  switch (size) {
    case "xs":
      return 12;
    case "sm":
      return 16;
    case "md":
      return 20;
    case "lg":
      return 24;
  }
}

function utilityButtonInnerClassName(full = false) {
  if (full) {
    return "flex items-center gap-2 whitespace-nowrap font-medium justify-center";
  } else {
    return "flex items-center gap-2 whitespace-nowrap font-medium max-md:justify-center";
  }
}
