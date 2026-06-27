import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import { loadStoredResumeData } from '../components/builder/builderData.js';
import CheckerResults from '../components/checker/CheckerResults.jsx';
import CheckerScore from '../components/checker/CheckerScore.jsx';
import { analyzeResume, hasResumeContent } from '../components/checker/checkerAnalysis.js';

const sourceOptions = [
  { id: 'builder', label: 'Builder Resume' },
  { id: 'paste', label: 'Paste Resume Text' },
];

function CheckerPage() {
  const [builderData] = useState(loadStoredResumeData);
  const [source, setSource] = useState('builder');
  const [draftText, setDraftText] = useState('');
  const [checkedText, setCheckedText] = useState('');
  const builderHasContent = hasResumeContent(builderData);
  const result = useMemo(
    () => analyzeResume({ data: builderData, text: checkedText, source }),
    [builderData, checkedText, source],
  );

  return (
    <PageTransition>
      <Seo
        description="Check resume completeness, ATS keywords, action verbs, and improvement opportunities locally in your browser."
        path="/checker"
        title="Free Local Resume Checker | Kavya Portfolio"
      />
      <section className="mx-auto max-w-7xl py-10 lg:py-16">
        <header className="max-w-4xl">
          <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">Resume Checker</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-5xl">
            Find the strongest next improvement for your resume.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Review your builder resume or paste plain text to check completeness, project detail, ATS signals, and action-oriented writing.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-800 dark:text-teal-100">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            Your resume is checked locally in your browser only.
          </div>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <aside className="glass-panel rounded-2xl p-5 lg:sticky lg:top-24">
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-900/[0.06] p-1 dark:bg-white/10">
              {sourceOptions.map((option) => (
                <button
                  className={`focus-ring rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    source === option.id
                      ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-white'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                  key={option.id}
                  type="button"
                  onClick={() => setSource(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {source === 'builder' ? (
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-950 dark:text-white">
                  {builderHasContent ? 'Builder data loaded' : 'No builder resume found'}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {builderHasContent
                    ? 'The latest resume saved by the builder is ready to review.'
                    : 'Start in the builder or switch to pasted text to run a useful check.'}
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <label className="text-sm font-semibold text-slate-950 dark:text-white" htmlFor="resume-text">
                  Resume text
                </label>
                <textarea
                  className="focus-ring mt-3 min-h-72 w-full resize-y rounded-xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm leading-6 text-slate-950 placeholder:text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  id="resume-text"
                  placeholder={'Paste your resume here...\n\nSummary\n...\n\nSkills\n...\n\nProjects\n...'}
                  value={draftText}
                  onChange={(event) => setDraftText(event.target.value)}
                />
                <button
                  className="focus-ring mt-3 w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                  type="button"
                  onClick={() => setCheckedText(draftText)}
                >
                  Check Pasted Resume
                </button>
              </div>
            )}

            <div className="mt-6 border-t border-slate-900/10 pt-5 dark:border-white/10">
              <Link className="focus-ring inline-flex rounded-full bg-teal-500/15 px-4 py-2.5 text-sm font-semibold text-teal-800 transition hover:bg-teal-500/25 dark:text-teal-100" to="/builder">
                Back to Builder to Improve
              </Link>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                This checker provides guidance only. Tailor every resume to the role and verify important details yourself.
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            {!result.hasContent ? (
              <div className="glass-panel rounded-2xl p-6 text-center sm:p-10">
                <p className="text-lg font-semibold text-slate-950 dark:text-white">Add resume content to begin</p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Load your builder resume or paste resume text. Your review will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-8">
                <CheckerScore result={result} />
                <CheckerResults result={result} />
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default CheckerPage;
