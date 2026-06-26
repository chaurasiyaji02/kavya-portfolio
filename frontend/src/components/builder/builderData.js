import { resumeData } from '../../data/resume.js';

export const BUILDER_STORAGE_KEY = 'kavya-visitor-resume-builder';

export const emptyResumeData = {
  personal: {
    name: '',
    title: '',
    location: '',
    email: '',
    phone: '',
    portfolio: '',
    github: '',
    linkedin: '',
    photoUrl: '',
    summary: '',
  },
  skills: [],
  experience: [],
  projects: [],
  education: [],
  certifications: [],
  achievements: [],
};

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

export function createBlankResumeData() {
  return cloneData(emptyResumeData);
}

export function createSampleResumeData() {
  return cloneData(resumeData);
}

export function splitLines(value) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function splitComma(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function mergePersonal(personal = {}) {
  return {
    ...emptyResumeData.personal,
    ...personal,
  };
}

export function normalizeResumeData(data) {
  const personal = mergePersonal(data?.personal);

  return {
    personal,
    skills: (data?.skills ?? [])
      .map((group) => ({
        category: group.category?.trim() ?? '',
        items: (group.items ?? []).map((item) => item.trim()).filter(Boolean),
      }))
      .filter((group) => group.category || group.items.length),
    experience: (data?.experience ?? [])
      .map((item) => ({
        role: item.role?.trim() ?? '',
        company: item.company?.trim() ?? '',
        location: item.location?.trim() ?? '',
        period: item.period?.trim() ?? '',
        bullets: (item.bullets ?? []).map((bullet) => bullet.trim()).filter(Boolean),
      }))
      .filter((item) => item.role || item.company || item.location || item.period || item.bullets.length),
    projects: (data?.projects ?? [])
      .map((project) => ({
        name: project.name?.trim() ?? '',
        description: project.description?.trim() ?? '',
        tech: (project.tech ?? []).map((tech) => tech.trim()).filter(Boolean),
        links: (project.links ?? []).map((link) => link.trim()).filter(Boolean),
      }))
      .filter((project) => project.name || project.description || project.tech.length || project.links.length),
    education: (data?.education ?? [])
      .map((item) => ({
        degree: item.degree?.trim() ?? '',
        institution: item.institution?.trim() ?? '',
        location: item.location?.trim() ?? '',
        period: item.period?.trim() ?? '',
        details: (item.details ?? []).map((detail) => detail.trim()).filter(Boolean),
      }))
      .filter((item) => item.degree || item.institution || item.location || item.period || item.details.length),
    certifications: (data?.certifications ?? [])
      .map((item) => ({
        name: item.name?.trim() ?? '',
        issuer: item.issuer?.trim() ?? '',
        year: item.year?.trim() ?? '',
      }))
      .filter((item) => item.name || item.issuer || item.year),
    achievements: (data?.achievements ?? []).map((achievement) => achievement.trim()).filter(Boolean),
  };
}

export function loadStoredResumeData() {
  try {
    const storedValue = localStorage.getItem(BUILDER_STORAGE_KEY);
    return storedValue ? normalizeResumeData(JSON.parse(storedValue)) : createBlankResumeData();
  } catch {
    return createBlankResumeData();
  }
}

export function storeResumeData(data) {
  localStorage.setItem(BUILDER_STORAGE_KEY, JSON.stringify(data));
}

export function clearStoredResumeData() {
  localStorage.removeItem(BUILDER_STORAGE_KEY);
}
