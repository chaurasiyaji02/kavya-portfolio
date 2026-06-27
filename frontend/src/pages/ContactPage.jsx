import { useState } from 'react';
import PageTransition from '../components/PageTransition.jsx';
import { usePortfolioData } from '../components/PortfolioDataProvider.jsx';
import Seo from '../components/Seo.jsx';
import { submitContactMessage } from '../lib/api.js';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function ContactPage() {
  const { content } = usePortfolioData();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setFeedback('');
    try {
      await submitContactMessage(form);
      setForm(initialForm);
      setStatus('success');
      setFeedback('Thanks for reaching out. Your message has been received.');
    } catch (error) {
      setStatus('error');
      setFeedback(error.message || 'Your message could not be sent. Please try again.');
    }
  };

  return (
    <PageTransition>
      <Seo
        description="Contact Kavya about full-stack development opportunities, internships, projects, and collaborations."
        path="/contact"
        title="Contact Kavya | Developer Portfolio"
      />
      <section className="mx-auto grid max-w-7xl gap-8 py-10 lg:grid-cols-[0.78fr_1.22fr] lg:py-16">
        <div className="lg:pt-8">
          <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-5xl">
            Let&apos;s talk about work worth building.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Share an internship, project, or collaboration idea. The message goes directly to the portfolio API.
          </p>
          <dl className="mt-8 grid gap-5 border-t border-slate-900/10 pt-6 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</dt>
              <dd className="mt-2 text-sm font-medium text-slate-950 dark:text-white">{content.profile.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Location</dt>
              <dd className="mt-2 text-sm font-medium text-slate-950 dark:text-white">{content.profile.location}</dd>
            </div>
          </dl>
        </div>

        <form className="glass-panel rounded-2xl p-5 sm:p-7" onSubmit={submit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              Name
              <input
                required
                className="focus-ring rounded-xl border border-slate-900/10 bg-white/70 px-4 py-3 font-normal text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white"
                maxLength="160"
                name="name"
                value={form.name}
                onChange={updateField}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              Email
              <input
                required
                className="focus-ring rounded-xl border border-slate-900/10 bg-white/70 px-4 py-3 font-normal text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white"
                maxLength="254"
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
              />
            </label>
          </div>
          <label className="mt-5 grid gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
            Subject
            <input
              required
              className="focus-ring rounded-xl border border-slate-900/10 bg-white/70 px-4 py-3 font-normal text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white"
              maxLength="200"
              name="subject"
              value={form.subject}
              onChange={updateField}
            />
          </label>
          <label className="mt-5 grid gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
            Message
            <textarea
              required
              className="focus-ring min-h-44 resize-y rounded-xl border border-slate-900/10 bg-white/70 px-4 py-3 font-normal leading-7 text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white"
              maxLength="5000"
              name="message"
              value={form.message}
              onChange={updateField}
            />
          </label>

          {feedback ? (
            <p
              className={`mt-5 rounded-xl px-4 py-3 text-sm ${
                status === 'success'
                  ? 'bg-teal-500/10 text-teal-800 dark:text-teal-100'
                  : 'bg-rose-500/10 text-rose-700 dark:text-rose-200'
              }`}
              role="status"
            >
              {feedback}
            </p>
          ) : null}

          <button
            className="focus-ring mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-slate-950"
            disabled={status === 'submitting'}
            type="submit"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
    </PageTransition>
  );
}

export default ContactPage;
