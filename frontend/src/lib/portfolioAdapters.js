import {
  certifications as fallbackCertifications,
  education as fallbackEducation,
  experience as fallbackExperience,
  profile as fallbackProfile,
  projects as fallbackProjects,
  skills as fallbackSkills,
} from '../data/portfolio.js';
import { resumeData as fallbackResume } from '../data/resume.js';

const projectAccents = [
  'from-teal-300/30 via-indigo-300/20 to-transparent',
  'from-rose-300/30 via-teal-300/20 to-transparent',
  'from-indigo-300/30 via-sky-300/20 to-transparent',
];

function year(value) {
  return value ? String(value).slice(0, 4) : '';
}

function period(startDate, endDate, current = false) {
  const start = year(startDate);
  const end = current ? 'Present' : year(endDate);
  return [start, end].filter(Boolean).join(' - ');
}

function linkByPlatform(links, platform) {
  const link = links.find((item) => (item.platform ?? item.label).toLowerCase() === platform);
  return link?.url ?? link?.href ?? '';
}

export function adaptPortfolioContent(apiData) {
  const socialLinks = apiData.socialLinks.map((link) => ({
    label: link.displayLabel,
    href: link.url,
  }));
  const profile = {
    ...fallbackProfile,
    name: apiData.resumeProfile.fullName,
    role: apiData.resumeProfile.headline,
    headline: apiData.resumeProfile.headline,
    summary: apiData.resumeProfile.summary,
    email: apiData.resumeProfile.email,
    location: apiData.resumeProfile.location,
    resumeUrl: apiData.resumeProfile.resumeUrl || fallbackProfile.resumeUrl,
    socialLinks,
  };
  const skills = Object.entries(
    apiData.skills.reduce((groups, skill) => {
      groups[skill.category] = [...(groups[skill.category] ?? []), skill.name];
      return groups;
    }, {}),
  ).map(([category, items]) => ({ category, items }));
  const projects = apiData.projects.map((project, index) => ({
    title: project.title,
    status: project.status.replaceAll('_', ' ').toLowerCase().replace(/^\w/, (letter) => letter.toUpperCase()),
    description: project.description,
    techStack: project.technologies,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    accent: projectAccents[index % projectAccents.length],
  }));
  const education = apiData.education.map((item) => ({
    degree: [item.degree, item.fieldOfStudy].filter(Boolean).join(' in '),
    institution: item.institution,
    period: period(item.startDate, item.endDate),
    description: item.description,
  }));
  const certifications = apiData.certifications.map((item) => ({
    title: item.title,
    issuer: item.issuer,
    year: year(item.issueDate),
    description: item.credentialId ? `Credential: ${item.credentialId}` : '',
  }));
  const experience = apiData.experience.map((item) => ({
    role: item.role,
    company: item.organization,
    period: period(item.startDate, item.endDate, item.currentRole),
    description: item.description,
    achievements: item.highlights,
  }));

  return { profile, skills, projects, education, certifications, experience, socialLinks };
}

export function createFallbackPortfolioContent() {
  return {
    profile: fallbackProfile,
    skills: fallbackSkills,
    projects: fallbackProjects,
    education: fallbackEducation,
    certifications: fallbackCertifications,
    experience: fallbackExperience,
    socialLinks: fallbackProfile.socialLinks,
  };
}

export function createResumeData(content) {
  const backendProfile = content.profile;
  return {
    ...fallbackResume,
    personal: {
      ...fallbackResume.personal,
      name: backendProfile.name,
      title: backendProfile.role,
      location: backendProfile.location,
      email: backendProfile.email,
      summary: backendProfile.summary,
      github: linkByPlatform(content.socialLinks, 'github'),
      linkedin: linkByPlatform(content.socialLinks, 'linkedin'),
    },
    skills: content.skills,
    projects: content.projects.map((project) => ({
      name: project.title,
      description: project.description,
      tech: project.techStack,
      links: [project.githubUrl, project.liveUrl].filter(Boolean),
    })),
    education: content.education.map((item) => ({
      degree: item.degree,
      institution: item.institution,
      location: backendProfile.location,
      period: item.period,
      details: item.description ? [item.description] : [],
    })),
    certifications: content.certifications.map((item) => ({
      name: item.title,
      issuer: item.issuer,
      year: item.year,
    })),
    experience: content.experience.map((item) => ({
      role: item.role,
      company: item.company,
      location: '',
      period: item.period,
      bullets: item.achievements?.length ? item.achievements : item.description ? [item.description] : [],
    })),
  };
}
