import PageTransition from '../components/PageTransition.jsx';
import AboutSection from '../components/portfolio/AboutSection.jsx';
import CareerToolsSection from '../components/portfolio/CareerToolsSection.jsx';
import CertificationsSection from '../components/portfolio/CertificationsSection.jsx';
import ContactCtaSection from '../components/portfolio/ContactCtaSection.jsx';
import EducationSection from '../components/portfolio/EducationSection.jsx';
import ExperienceSection from '../components/portfolio/ExperienceSection.jsx';
import HeroSection from '../components/portfolio/HeroSection.jsx';
import ProjectsSection from '../components/portfolio/ProjectsSection.jsx';
import SkillsSection from '../components/portfolio/SkillsSection.jsx';
import { about, careerTools, certifications, contactCta, education, experience, profile, projects, skills } from '../data/portfolio.js';

function HomePage() {
  return (
    <PageTransition>
      <HeroSection profile={profile} />
      <AboutSection about={about} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <CareerToolsSection tools={careerTools} />
      <EducationSection education={education} />
      <CertificationsSection certifications={certifications} />
      <ExperienceSection experience={experience} />
      <ContactCtaSection contactCta={contactCta} />
    </PageTransition>
  );
}

export default HomePage;
