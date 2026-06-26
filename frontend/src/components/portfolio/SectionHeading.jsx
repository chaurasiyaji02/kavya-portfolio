import Reveal from './Reveal.jsx';

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center';

  return (
    <Reveal className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">{description}</p> : null}
    </Reveal>
  );
}

export default SectionHeading;
