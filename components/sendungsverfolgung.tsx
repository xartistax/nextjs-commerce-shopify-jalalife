'use client';

export default function Sendungsverfolgung() {
  return (
    <form className="relative w-full">
      <input
        key={0}
        type="text"
        name="search"
        placeholder="Sendungsnummer"
        autoComplete="off"
        className=" rounded-lg border bg-transparent px-4 py-2 text-sm placeholder:text-neutral-500"
      />
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full">
      <input
        placeholder="Sendungsnummer"
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500"
      />
    </form>
  );
}
