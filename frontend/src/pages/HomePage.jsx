import PageTransition from '../components/PageTransition.jsx';
import PortfolioDataStatus from '../components/PortfolioDataStatus.jsx';
import Seo from '../components/Seo.jsx';
import { usePortfolioData } from '../components/PortfolioDataProvider.jsx';
import AboutSection from '../components/portfolio/AboutSection.jsx';
import CareerToolsSection from '../components/portfolio/CareerToolsSection.jsx';
import CertificationsSection from '../components/portfolio/CertificationsSection.jsx';
import ContactCtaSection from '../components/portfolio/ContactCtaSection.jsx';
import EducationSection from '../components/portfolio/EducationSection.jsx';
import ExperienceSection from '../components/portfolio/ExperienceSection.jsx';
import HeroSection from '../components/portfolio/HeroSection.jsx';
import ProjectsSection from '../components/portfolio/ProjectsSection.jsx';
import SkillsSection from '../components/portfolio/SkillsSection.jsx';
import { about, careerTools, contactCta } from '../data/portfolio.js';

function HomePage() {
  const { content, error, loading, retry } = usePortfolioData();

  return (
    <PageTransition>
      <Seo
        description="Explore Kavya's Java and full-stack development projects, skills, education, experience, and private browser-only career tools."
        title="Kavya Chaurasiya | Java & Full-Stack Developer"
      />
      <PortfolioDataStatus error={error} loading={loading} onRetry={retry} />
      <HeroSection profile={content.profile} />
      <AboutSection about={about} />
      <SkillsSection skills={content.skills} />
      <ProjectsSection projects={content.projects} />
      <CareerToolsSection tools={careerTools} />
      <EducationSection education={content.education} />
      <CertificationsSection certifications={content.certifications} />
      <ExperienceSection experience={content.experience} />
      <ContactCtaSection contactCta={contactCta} />
    </PageTransition>
  );
}

export default HomePage;
