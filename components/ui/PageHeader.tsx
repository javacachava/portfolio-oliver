/** Encabezado de las páginas interiores: título grande sobre retícula y luz cálida. */
export default function PageHeader({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(112,66,248,0.26),transparent)]"
      />
      <div className="wrap relative pb-14 pt-14 sm:pb-20 sm:pt-20">
        <h1 id={id} className="t-display gradient-text !text-[clamp(2.8rem,8.5vw,6rem)] pb-2">
          {title}
        </h1>
        {lead && <div className="t-lead measure mt-7">{lead}</div>}
        {children}
      </div>
    </header>
  );
}
