import { Loader2 } from "lucide-react";

export const LoadingIcon = ({
  className,
  size,
}: {
  className?: string;
  size?: string | number;
}) => (
  <Loader2
    size={size}
    className={`${size ? "" : "h-5 w-5"} animate-spin ${className ?? ""}`}
  />
);

export const LargeLoadingIcon = ({ className }: { className?: string }) => (
  <Loader2 className={`h-10 w-10 animate-spin ${className ?? ""}`} />
);
