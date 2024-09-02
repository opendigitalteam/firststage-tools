export default function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-2xl font-bold !leading-tight sm:text-3xl lg:text-4xl 2xl:text-[2.6rem]">
      {children}
    </h1>
  );
}
