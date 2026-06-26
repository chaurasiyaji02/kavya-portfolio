import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import PageTransition from '../components/PageTransition.jsx';
import BuilderForm from '../components/builder/BuilderForm.jsx';
import { clearStoredResumeData, createBlankResumeData, createSampleResumeData, loadStoredResumeData, normalizeResumeData, storeResumeData } from '../components/builder/builderData.js';
import ResumePreview from '../components/resume/ResumePreview.jsx';
import TemplateSwitcher from '../components/resume/TemplateSwitcher.jsx';
import { resumeTemplates } from '../data/resume.js';

function BuilderPage() {
  const [resume, setResume] = useState(loadStoredResumeData);
  const [activeTemplateId, setActiveTemplateId] = useState(resumeTemplates[0]?.id ?? 'ats-classic');
  const [activeMobileTab, setActiveMobileTab] = useState('edit');
  const previewResume = useMemo(() => normalizeResumeData(resume), [resume]);

  useEffect(() => {
    storeResumeData(resume);
  }, [resume]);

  const resetData = () => {
    const blankResume = createBlankResumeData();
    clearStoredResumeData();
    setResume(blankResume);
  };

  const loadSampleData = () => {
    setResume(createSampleResumeData());
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl py-10 lg:py-16">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8 print:hidden">
          <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">Visitor Resume Builder</p>
          <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-5xl">
                Build a resume preview privately in your browser.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Your data stays in your browser only. Nothing is sent to a backend, API, database, or external service.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="focus-ring rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950" type="button" onClick={() => window.print()}>
                Download Resume
              </button>
              <button className="focus-ring rounded-full border border-slate-900/10 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white" type="button" onClick={loadSampleData}>
                Load Sample Data
              </button>
              <button className="focus-ring rounded-full px-5 py-3 text-sm font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:bg-rose-500/10 dark:text-rose-200" type="button" onClick={resetData}>
                Clear Data
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 print:hidden">
          <TemplateSwitcher activeTemplateId={activeTemplateId} onChange={setActiveTemplateId} templates={resumeTemplates} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-full border border-slate-900/10 bg-white/60 p-1 dark:border-white/10 dark:bg-white/10 lg:hidden print:hidden">
          {['edit', 'preview'].map((tab) => (
            <button
              className={`focus-ring rounded-full px-4 py-3 text-sm font-semibold capitalize transition ${
                activeMobileTab === tab ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'text-slate-600 dark:text-slate-300'
              }`}
              key={tab}
              type="button"
              onClick={() => setActiveMobileTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <motion.div
            className={`${activeMobileTab === 'edit' ? 'block' : 'hidden'} min-w-0 max-w-full lg:block print:hidden`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <BuilderForm data={resume} onChange={setResume} />
          </motion.div>

          <motion.div
            className={`${activeMobileTab === 'preview' ? 'block' : 'hidden'} min-w-0 lg:block lg:sticky lg:top-24`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <ResumePreview data={previewResume} templateId={activeTemplateId} />
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

export default BuilderPage;
