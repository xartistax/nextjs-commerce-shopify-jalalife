'use client';

export default function NewsLetter() {
  return (
    <form className="relative w-full">
      <input
        key={0}
        type="text"
        name="search"
        placeholder="Geben Sie Ihre Email Adresse an"
        autoComplete="off"
        className="rounded-lg border bg-transparent px-4 py-2 text-sm  placeholder:text-neutral-500"
      />
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full">
      <input
        placeholder="Geben Sie Ihre Email Adresse an..."
        className="rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500"
      />
    </form>
  );
}
