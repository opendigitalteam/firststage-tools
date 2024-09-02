import { PropsWithChildren } from "react";

export function Page({ bg, children }: PropsWithChildren & { bg?: string }) {
  const bgClass = bg ?? "bg-odpink-background text-odpink-black";
  return (
    <div className={`flex min-h-screen flex-col items-center ${bgClass}`}>
      {children}
    </div>
  );
}

export function Header({ children }: PropsWithChildren) {
  return (
    <header className="flex w-full flex-col items-center">{children}</header>
  );
}

export function Main({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full grow flex-col items-center overflow-hidden">
      {children}
    </div>
  );
}

export function Footer({ children }: PropsWithChildren) {
  return (
    <footer className="flex w-full flex-col items-center">{children}</footer>
  );
}
