import BuilderField from './BuilderField.jsx';
import BuilderSection from './BuilderSection.jsx';
import BuilderTextarea from './BuilderTextarea.jsx';
import { splitComma, splitLines } from './builderData.js';

function smallButtonClass(tone = 'neutral') {
  return [
    'focus-ring w-fit rounded-full px-3 py-2 text-xs font-semibold transition hover:-translate-y-0.5',
    tone === 'danger'
      ? 'bg-rose-500/10 text-rose-700 hover:bg-rose-500/15 dark:text-rose-200'
      : 'bg-slate-950/[0.06] text-slate-700 hover:bg-slate-950/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15',
  ].join(' ');
}

function BuilderCard({ children, onRemove, title }) {
  return (
    <div className="min-w-0 rounded-3xl border border-slate-900/10 bg-white/45 p-4 dark:border-white/10 dark:bg-white/5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{title}</h3>
        <button className={smallButtonClass('danger')} type="button" onClick={onRemove}>
          Remove
        </button>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function BuilderForm({ data, onChange }) {
  const updatePersonal = (key, value) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
        [key]: value,
      },
    });
  };

  const updateArrayItem = (section, index, value) => {
    onChange({
      ...data,
      [section]: data[section].map((item, itemIndex) => (itemIndex === index ? value : item)),
    });
  };

  const addArrayItem = (section, value) => {
    onChange({
      ...data,
      [section]: [...data[section], value],
    });
  };

  const removeArrayItem = (section, index) => {
    onChange({
      ...data,
      [section]: data[section].filter((_, itemIndex) => itemIndex !== index),
    });
  };

  const updateStringList = (section, value) => {
    onChange({
      ...data,
      [section]: splitLines(value),
    });
  };

  const handlePhoto = (file) => {
    if (!file) {
      updatePersonal('photoUrl', '');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => updatePersonal('photoUrl', reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <form className="grid min-w-0 max-w-full gap-5" onSubmit={(event) => event.preventDefault()}>
      <BuilderSection description="Basic details used at the top of every resume template." title="Personal Info">
        <div className="grid gap-4 sm:grid-cols-2">
          <BuilderField label="Full name" value={data.personal.name} onChange={(value) => updatePersonal('name', value)} />
          <BuilderField label="Role / headline" value={data.personal.title} onChange={(value) => updatePersonal('title', value)} />
          <BuilderField label="Email" type="email" value={data.personal.email} onChange={(value) => updatePersonal('email', value)} />
          <BuilderField label="Phone" value={data.personal.phone} onChange={(value) => updatePersonal('phone', value)} />
          <BuilderField label="Location" value={data.personal.location} onChange={(value) => updatePersonal('location', value)} />
          <label className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Optional photo
            <input
              accept="image/*"
              className="focus-ring rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-medium text-slate-950 shadow-sm file:mr-3 file:rounded-full file:border-0 file:bg-slate-950 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:file:bg-white dark:file:text-slate-950"
              type="file"
              onChange={(event) => handlePhoto(event.target.files?.[0])}
            />
          </label>
        </div>
        <BuilderTextarea label="Summary" value={data.personal.summary} onChange={(value) => updatePersonal('summary', value)} />
      </BuilderSection>

      <BuilderSection description="Social links are kept as contact fields in the resume preview." title="Social Links">
        <div className="grid gap-4 sm:grid-cols-3">
          <BuilderField label="Portfolio" value={data.personal.portfolio} onChange={(value) => updatePersonal('portfolio', value)} />
          <BuilderField label="GitHub" value={data.personal.github} onChange={(value) => updatePersonal('github', value)} />
          <BuilderField label="LinkedIn" value={data.personal.linkedin} onChange={(value) => updatePersonal('linkedin', value)} />
        </div>
      </BuilderSection>

      <BuilderSection title="Skills" description="Add categories with comma-separated skills. Empty groups are hidden.">
        {data.skills.map((group, index) => (
          <BuilderCard key={`skill-${index}`} title={`Skill category ${index + 1}`} onRemove={() => removeArrayItem('skills', index)}>
            <BuilderField label="Category" value={group.category} onChange={(value) => updateArrayItem('skills', index, { ...group, category: value })} />
            <BuilderTextarea label="Skills" rows={2} value={group.items.join(', ')} onChange={(value) => updateArrayItem('skills', index, { ...group, items: splitComma(value) })} />
          </BuilderCard>
        ))}
        <button className={smallButtonClass()} type="button" onClick={() => addArrayItem('skills', { category: '', items: [] })}>
          Add skill category
        </button>
      </BuilderSection>

      <BuilderSection title="Projects" description="Projects use comma-separated tech and newline-separated links.">
        {data.projects.map((project, index) => (
          <BuilderCard key={`project-${index}`} title={`Project ${index + 1}`} onRemove={() => removeArrayItem('projects', index)}>
            <BuilderField label="Project name" value={project.name} onChange={(value) => updateArrayItem('projects', index, { ...project, name: value })} />
            <BuilderTextarea label="Description" value={project.description} onChange={(value) => updateArrayItem('projects', index, { ...project, description: value })} />
            <BuilderField label="Tech stack" value={project.tech.join(', ')} onChange={(value) => updateArrayItem('projects', index, { ...project, tech: splitComma(value) })} />
            <BuilderTextarea label="Links" rows={2} value={project.links.join('\n')} onChange={(value) => updateArrayItem('projects', index, { ...project, links: splitLines(value) })} />
          </BuilderCard>
        ))}
        <button className={smallButtonClass()} type="button" onClick={() => addArrayItem('projects', { name: '', description: '', tech: [], links: [] })}>
          Add project
        </button>
      </BuilderSection>

      <BuilderSection title="Education" description="Education details can be newline-separated.">
        {data.education.map((item, index) => (
          <BuilderCard key={`education-${index}`} title={`Education ${index + 1}`} onRemove={() => removeArrayItem('education', index)}>
            <BuilderField label="Degree" value={item.degree} onChange={(value) => updateArrayItem('education', index, { ...item, degree: value })} />
            <BuilderField label="Institution" value={item.institution} onChange={(value) => updateArrayItem('education', index, { ...item, institution: value })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <BuilderField label="Location" value={item.location} onChange={(value) => updateArrayItem('education', index, { ...item, location: value })} />
              <BuilderField label="Period" value={item.period} onChange={(value) => updateArrayItem('education', index, { ...item, period: value })} />
            </div>
            <BuilderTextarea label="Details" value={item.details.join('\n')} onChange={(value) => updateArrayItem('education', index, { ...item, details: splitLines(value) })} />
          </BuilderCard>
        ))}
        <button className={smallButtonClass()} type="button" onClick={() => addArrayItem('education', { degree: '', institution: '', location: '', period: '', details: [] })}>
          Add education
        </button>
      </BuilderSection>

      <BuilderSection title="Experience / Internship" description="Bullets are newline-separated and hidden when empty.">
        {data.experience.map((item, index) => (
          <BuilderCard key={`experience-${index}`} title={`Experience ${index + 1}`} onRemove={() => removeArrayItem('experience', index)}>
            <BuilderField label="Role" value={item.role} onChange={(value) => updateArrayItem('experience', index, { ...item, role: value })} />
            <BuilderField label="Company" value={item.company} onChange={(value) => updateArrayItem('experience', index, { ...item, company: value })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <BuilderField label="Location" value={item.location} onChange={(value) => updateArrayItem('experience', index, { ...item, location: value })} />
              <BuilderField label="Period" value={item.period} onChange={(value) => updateArrayItem('experience', index, { ...item, period: value })} />
            </div>
            <BuilderTextarea label="Bullets" value={item.bullets.join('\n')} onChange={(value) => updateArrayItem('experience', index, { ...item, bullets: splitLines(value) })} />
          </BuilderCard>
        ))}
        <button className={smallButtonClass()} type="button" onClick={() => addArrayItem('experience', { role: '', company: '', location: '', period: '', bullets: [] })}>
          Add experience
        </button>
      </BuilderSection>

      <BuilderSection title="Certifications" description="Add course, issuer, and year. Empty rows are hidden.">
        {data.certifications.map((item, index) => (
          <BuilderCard key={`certification-${index}`} title={`Certification ${index + 1}`} onRemove={() => removeArrayItem('certifications', index)}>
            <BuilderField label="Name" value={item.name} onChange={(value) => updateArrayItem('certifications', index, { ...item, name: value })} />
            <BuilderField label="Issuer" value={item.issuer} onChange={(value) => updateArrayItem('certifications', index, { ...item, issuer: value })} />
            <BuilderField label="Year" value={item.year} onChange={(value) => updateArrayItem('certifications', index, { ...item, year: value })} />
          </BuilderCard>
        ))}
        <button className={smallButtonClass()} type="button" onClick={() => addArrayItem('certifications', { name: '', issuer: '', year: '' })}>
          Add certification
        </button>
      </BuilderSection>

      <BuilderSection title="Achievements" description="One achievement per line. Empty achievements are hidden.">
        <BuilderTextarea label="Achievements" value={data.achievements.join('\n')} onChange={(value) => updateStringList('achievements', value)} />
      </BuilderSection>
    </form>
  );
}

export default BuilderForm;
