import Glass from "./Glass";

export default function FocusBox({
  maxWidthClass = "max-w-lg",
  children,
}: {
  maxWidthClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-center justify-center gap-3 px-4 py-3 sm:px-5 md:gap-5 md:py-10 lg:px-16 xl:gap-8 xl:py-20 2xl:px-20">
      <div
        className={`flex w-full flex-col gap-3 md:gap-5 xl:gap-8 ${maxWidthClass}`}
      >
        <Glass>
          <div className="flex flex-col gap-3 p-5 md:gap-5 md:p-8 xl:gap-8 xl:p-10">
            {children}
          </div>
        </Glass>
      </div>
    </div>
  );
}
