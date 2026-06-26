import CtaLink from './CtaLink.jsx';
import Reveal from './Reveal.jsx';

function ContactCtaSection({ contactCta }) {
  if (!contactCta?.title && !contactCta?.actions?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl py-12 lg:py-20" id="contact">
      <Reveal>
        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 text-center sm:p-10 lg:p-14">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-300/20 via-indigo-300/10 to-rose-300/20" />
          <div className="relative mx-auto max-w-3xl">
            {contactCta.eyebrow ? <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">{contactCta.eyebrow}</p> : null}
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-5xl">{contactCta.title}</h2>
            {contactCta.body ? <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{contactCta.body}</p> : null}
            {contactCta.actions?.length ? (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {contactCta.actions.map((action) => (
                  <CtaLink href={action.href} key={action.label} label={action.label} variant={action.variant} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default ContactCtaSection;
