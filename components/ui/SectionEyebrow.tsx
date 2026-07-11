export default function SectionEyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-sm font-mono text-[#b49bff] tracking-[0.08em] sm:tracking-widest uppercase ${className}`}
    >
      {children}
    </p>
  );
}
