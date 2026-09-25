export default function CardAtmosphere({ reverse = false }: { reverse?: boolean }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl">
      <span className="absolute -left-12 -top-16 size-48 rounded-full bg-accent-200/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover/card:opacity-100 motion-reduce:transition-none" />
      <span
        className={`absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-accent-100/5 to-transparent motion-reduce:animate-none ${
          reverse
            ? "-right-1/2 group-hover/card:animate-[card-sheen-reverse_700ms_ease-out_forwards]"
            : "-left-1/2 group-hover/card:animate-[card-sheen-forward_700ms_ease-out_forwards]"
        }`}
      />
    </span>
  );
}
