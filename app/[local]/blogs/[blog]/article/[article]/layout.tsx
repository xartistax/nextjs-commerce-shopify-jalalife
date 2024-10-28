export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full">
        <main>{children}</main>
      </div>
    </>
  );
}
