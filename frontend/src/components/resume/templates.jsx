import { ResumeAchievements, ResumeCertifications, ResumeEducation, ResumeExperience, ResumeHeader, ResumeProjects, ResumeSkills } from './ResumeBlocks.jsx';

function AtsClassicTemplate({ data }) {
  return (
    <article className="resume-paper resume-template-ats">
      <ResumeHeader data={data} />
      <ResumeSkills skills={data.skills} />
      <ResumeExperience experience={data.experience} />
      <ResumeProjects projects={data.projects} />
      <ResumeEducation education={data.education} />
      <ResumeCertifications certifications={data.certifications} />
      <ResumeAchievements achievements={data.achievements} />
    </article>
  );
}

function ModernDeveloperTemplate({ data }) {
  return (
    <article className="resume-paper resume-template-modern">
      <ResumeHeader data={data} variant="modern" />
      <div className="resume-two-column">
        <div>
          <ResumeExperience experience={data.experience} />
          <ResumeProjects projects={data.projects} />
        </div>
        <aside>
          <ResumeSkills skills={data.skills} />
          <ResumeEducation education={data.education} />
          <ResumeCertifications certifications={data.certifications} />
          <ResumeAchievements achievements={data.achievements} />
        </aside>
      </div>
    </article>
  );
}

function PhotoSidebarTemplate({ data }) {
  return (
    <article className="resume-paper resume-template-sidebar">
      <aside className="resume-sidebar">
        <ResumeHeader data={data} showPhoto variant="sidebar" />
        <ResumeSkills skills={data.skills} />
        <ResumeCertifications certifications={data.certifications} />
      </aside>
      <main className="resume-main-column">
        <ResumeExperience experience={data.experience} />
        <ResumeProjects projects={data.projects} />
        <ResumeEducation education={data.education} />
        <ResumeAchievements achievements={data.achievements} />
      </main>
    </article>
  );
}

function CreativeAccentTemplate({ data }) {
  return (
    <article className="resume-paper resume-template-creative">
      <ResumeHeader data={data} showPhoto variant="creative" />
      <div className="resume-accent-grid">
        <ResumeSkills skills={data.skills} />
        <ResumeExperience experience={data.experience} />
        <ResumeProjects projects={data.projects} />
        <ResumeEducation education={data.education} />
        <ResumeCertifications certifications={data.certifications} />
        <ResumeAchievements achievements={data.achievements} />
      </div>
    </article>
  );
}

function FresherInternshipTemplate({ data }) {
  return (
    <article className="resume-paper resume-template-fresher">
      <ResumeHeader data={data} variant="fresher" />
      <ResumeEducation education={data.education} />
      <ResumeSkills skills={data.skills} />
      <ResumeProjects projects={data.projects} />
      <ResumeExperience experience={data.experience} />
      <ResumeCertifications certifications={data.certifications} />
      <ResumeAchievements achievements={data.achievements} />
    </article>
  );
}

export const templateComponents = {
  'ats-classic': AtsClassicTemplate,
  'modern-developer': ModernDeveloperTemplate,
  'photo-sidebar': PhotoSidebarTemplate,
  'creative-accent': CreativeAccentTemplate,
  'fresher-internship': FresherInternshipTemplate,
};
