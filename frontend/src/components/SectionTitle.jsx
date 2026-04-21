function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600">
        {subtitle}
      </p>
    </div>
  );
}

export default SectionTitle;