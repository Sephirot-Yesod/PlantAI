// Centred section title with a native emoji at the end, as on the store.
export function SectionTitle({
  children,
  emoji,
  sub,
  id,
}: {
  children: React.ReactNode;
  emoji?: string;
  sub?: string;
  id?: string;
}) {
  return (
    <div className="mx-auto max-w-[820px] text-center">
      <h2 id={id} className="h-section">
        {children}
        {emoji && (
          <span aria-hidden="true" className="ml-3 font-normal">
            {emoji}
          </span>
        )}
      </h2>
      {sub && <p className="t-small mx-auto mt-3 max-w-[640px] text-base">{sub}</p>}
    </div>
  );
}
