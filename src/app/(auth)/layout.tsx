export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div
        className="absolute top-1/4 -left-32 h-96 w-96 rounded-full opacity-15 blur-[120px]"
        style={{ background: "var(--theme-accent-primary)" }}
      />
      <div
        className="absolute bottom-1/4 right-0 h-80 w-80 rounded-full opacity-10 blur-[100px]"
        style={{ background: "var(--theme-accent-secondary)" }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
