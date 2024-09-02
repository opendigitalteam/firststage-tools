import { PropsWithChildren, ReactNode, useId } from "react";

export type ValidationFieldErrors = string[] | { _errors: string[] };

export const FormField = ({
  inline,
  children,
  errors,
  size = "md",
}: PropsWithChildren & {
  inline?: boolean | "center" | "stretch";
  errors?: ValidationFieldErrors;
  size?: "xs" | "sm" | "md";
}) => {
  const errorsData = errors && "_errors" in errors ? errors._errors : errors;
  const sizeClass =
    size === "xs" ? "gap-1" : size === "sm" ? "gap-2" : "gap-3 md:gap-5";
  const inlineClass =
    inline === "center"
      ? "items-stretch max-md:flex-col md:items-center"
      : inline === "stretch"
      ? "items-stretch max-md:flex-col"
      : inline
      ? "items-stretch max-md:flex-col md:items-start"
      : "flex-col";

  return (
    <div
      className={`flex ${inlineClass} ${sizeClass} py-1 ${
        errorsData && errorsData.length > 0
          ? "error group border-l-2 border-red-500 pl-2 md:pl-3"
          : "border-slate-50"
      } `}
    >
      {children}
    </div>
  );
};

export const FormFieldset = ({
  legend,
  legendWidthClassName,
  inline,
  hint,
  hintHtml,
  children,
  errors,
  size = "md",
}: PropsWithChildren & {
  legend: ReactNode;
  legendWidthClassName?: string;
  inline?: boolean | "center" | "stretch";
  hint?: ReactNode;
  hintHtml?: string;
  errors?: ValidationFieldErrors;
  size?: "sm" | "md";
}) => {
  const labelledById = useId();
  const describedById = useId();

  const errorsData = errors && "_errors" in errors ? errors._errors : errors;

  return (
    <fieldset aria-labelledby={labelledById} aria-describedby={describedById}>
      <FormField inline={inline} size={size} errors={errorsData}>
        <div className={inline ? legendWidthClassName : "w-full"}>
          <div
            id={labelledById}
            className={`font-semibold ${
              size === "sm" ? "text-sm lg:text-base" : "text-lg lg:text-xl"
            }`}
          >
            {legend}
          </div>

          <FormHint
            id={describedById}
            hint={hint}
            hintHtml={hintHtml}
            size={size}
          />
        </div>

        {children}
      </FormField>
    </fieldset>
  );
};

export const FormQuestion = ({
  question,
  hint,
  hintId,
  hintHtml,
}: {
  question: ReactNode;
  hint?: ReactNode;
  hintId?: string;
  hintHtml?: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-1 pr-5">
      <div className="text-lg font-semibold lg:text-xl">{question}</div>

      <FormHint id={hintId} hint={hint} hintHtml={hintHtml} />
    </div>
  );
};

export const FormHint = ({
  size = "md",
  id,
  hint,
  hintHtml,
}: {
  size?: "xs" | "sm" | "md";
  id?: string;
  hint?: ReactNode;
  hintHtml?: string;
}) => {
  if (!hintHtml && !hint) return;
  const sizeClass =
    size === "xs"
      ? "text-xs font-light"
      : size === "sm"
      ? "text-sm font-light"
      : "lg:text-lg";
  return (
    <div className={`opacity-80 ${sizeClass}`} id={id}>
      {hintHtml ? (
        <span dangerouslySetInnerHTML={{ __html: hintHtml }} />
      ) : (
        hint
      )}
    </div>
  );
};

export const FormLabel = ({
  htmlFor,
  widthClassName,
  label,
  hint,
  hintId,
  hintHtml,
  size = "md",
}: {
  widthClassName?: string;
  htmlFor?: string;
  label: ReactNode;
  hint?: ReactNode;
  hintId?: string;
  hintHtml?: string;
  fullWidth?: boolean;
  size?: "xs" | "sm" | "md";
}) => {
  const sizeClass =
    size === "xs"
      ? "text-xs lg:text-sm"
      : size === "sm"
      ? "text-sm lg:text-base"
      : "text-lg lg:text-xl";

  return (
    <div
      className={`flex ${
        size === "xs" ? "items-center gap-3" : "flex-col"
      } pr-5 ${widthClassName || "w-full"} flex-none`}
    >
      <label htmlFor={htmlFor} className={`font-semibold ${sizeClass}`}>
        {label}
      </label>

      <FormHint size={size} id={hintId} hint={hint} hintHtml={hintHtml} />
    </div>
  );
};

export const FormInputGroup = ({
  width = "full",
  widthClassName,
  size = "md",
  children,
}: PropsWithChildren & {
  width?: "full" | "auto" | "grow";
  widthClassName?: string;
  size?: "xs" | "sm" | "md";
}) => {
  const widthClass =
    width === "auto"
      ? "lg:grid-cols-[max-content]"
      : width === "grow"
      ? "grow"
      : "";
  const sizeClass =
    size === "xs" ? "gap-1" : size === "sm" ? "gap-3" : "gap-3 lg:gap-5";

  return (
    <div
      className={`grid grid-cols-1 ${widthClass} ${widthClassName} ${sizeClass}`}
    >
      {children}
    </div>
  );
};

export const FormErrors = ({
  errors,
  size = "md",
}: {
  errors?: ValidationFieldErrors;
  size?: "xs" | "sm" | "md";
}) => {
  const errorsData = errors && "_errors" in errors ? errors._errors : errors;
  const sizeClass =
    size === "xs" ? "text-xs" : size === "sm" ? "text-sm" : "lg:text-lg";

  return errorsData?.slice(0, 1).map((errorMessage, i) => {
    return (
      <div className={`font-medium text-red-500 ${sizeClass}`} key={i}>
        {errorMessage}
      </div>
    );
  });
};
