export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-brand-700">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-stone-950 md:text-5xl text-balance">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-7 text-stone-600 md:text-lg">{description}</p> : null}
    </div>
  );
}