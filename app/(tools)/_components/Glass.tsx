import { PropsWithChildren } from "react";

export default function Glass({
  color = "pink",
  children,
}: { color?: "pink" | "blue" } & PropsWithChildren) {
  const shadow =
    color === "pink" ? "shadow-odpink-black/10" : "shadow-odblue-black/10";

  return (
    <div
      className={`flex overflow-hidden rounded-lg border border-white/90 p-[0px] shadow-md ${shadow}`}
    >
      <div className="w-full rounded-md bg-white/70 backdrop-blur-sm [text-shadow:_0_0_3px_rgb(255_255_255_/_30%)]">
        {children}
      </div>
    </div>
  );
}
