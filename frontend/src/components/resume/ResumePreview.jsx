import { AnimatePresence, motion } from 'framer-motion';
import { templateComponents } from './templates.jsx';

function ResumePreview({ data, templateId }) {
  const Template = templateComponents[templateId] ?? templateComponents['ats-classic'];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={templateId}
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.99 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Template data={data} />
      </motion.div>
    </AnimatePresence>
  );
}

export default ResumePreview;
