import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import PageTransition from '../components/PageTransition.jsx';
import PortfolioDataStatus from '../components/PortfolioDataStatus.jsx';
import { usePortfolioData } from '../components/PortfolioDataProvider.jsx';
import ResumeActions from '../components/resume/ResumeActions.jsx';
import ResumePreview from '../components/resume/ResumePreview.jsx';
import TemplateSwitcher from '../components/resume/TemplateSwitcher.jsx';
import { resumeTemplates } from '../data/resume.js';

function ResumePage() {
  const { error, loading, resumeData, retry } = usePortfolioData();
  const [activeTemplateId, setActiveTemplateId] = useState(resumeTemplates[0]?.id ?? 'ats-classic');
  const activeTemplate = useMemo(
    () => resumeTemplates.find((template) => template.id === activeTemplateId) ?? resumeTemplates[0],
    [activeTemplateId],
  );

  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl py-10 lg:py-16">
        <PortfolioDataStatus error={error} loading={loading} onRetry={retry} />
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="print:hidden">
            <motion.div
              className="glass-panel rounded-[2rem] p-6 sm:p-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">Resume Showcase</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-5xl">
                Kavya&apos;s resume, rendered across five polished templates.
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                This is Kavya&apos;s resume preview. Builder mode coming soon.
              </p>
              <div className="mt-7">
                <ResumeActions />
              </div>
            </motion.div>

            <div className="mt-6">
              <TemplateSwitcher activeTemplateId={activeTemplateId} onChange={setActiveTemplateId} templates={resumeTemplates} />
            </div>

            {activeTemplate ? (
              <div className="glass-panel mt-6 rounded-3xl p-5">
                <p className="text-sm font-semibold text-slate-950 dark:text-white">{activeTemplate.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{activeTemplate.description}</p>
              </div>
            ) : null}
          </div>

          <div className="min-w-0">
            <ResumePreview data={resumeData} templateId={activeTemplateId} />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default ResumePage;
