import React from "react";

export default function HamburgerIcon({
  open,
  className,
  ...props
}: { open?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1.5 w-6 h-6 ${className ?? ""}`}
      {...props}>
      <span
        className={`block h-0.5 w-full bg-headline transition-transform duration-200 ${
          open ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-headline transition-opacity duration-200 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-headline transition-transform duration-200 ${
          open ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </div>
  );
}
