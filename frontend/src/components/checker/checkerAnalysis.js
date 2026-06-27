const ATS_KEYWORDS = [
  'agile',
  'api',
  'collaboration',
  'database',
  'git',
  'java',
  'javascript',
  'leadership',
  'postgresql',
  'problem solving',
  'react',
  'rest',
  'spring',
  'sql',
  'testing',
];

const ACTION_VERBS = [
  'achieved',
  'built',
  'collaborated',
  'created',
  'delivered',
  'designed',
  'developed',
  'implemented',
  'improved',
  'increased',
  'integrated',
  'led',
  'optimized',
  'reduced',
  'resolved',
];

const SECTION_PATTERN = /^(summary|profile|objective|skills|projects?|education|experience|internships?|certifications?|achievements?)\s*:?\s*$/i;
const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE_PATTERN = /(?:\+\d{1,3}[\s-]?)?(?:\(?\d{3,5}\)?[\s-]?)?\d{3,5}[\s-]?\d{4,6}/;
const LINKEDIN_PATTERN = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/\S+/i;
const GITHUB_PATTERN = /(?:https?:\/\/)?(?:www\.)?github\.com\/\S+/i;

function clampScore(value, maximum) {
  return Math.max(0, Math.min(maximum, Math.round(value)));
}

function includesTerm(text, term) {
  return new RegExp(`\\b${term.replace(/\s+/g, '\\s+')}\\b`, 'i').test(text);
}

function matchTerms(text, terms) {
  return terms.filter((term) => includesTerm(text, term));
}

function extractSection(text, names) {
  const lines = text.split(/\r?\n/);
  const startIndex = lines.findIndex((line) => names.some((name) => new RegExp(`^${name}\\s*:?\\s*$`, 'i').test(line.trim())));

  if (startIndex < 0) {
    return '';
  }

  const sectionLines = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    if (SECTION_PATTERN.test(lines[index].trim())) {
      break;
    }
    sectionLines.push(lines[index]);
  }
  return sectionLines.join(' ').trim();
}

function structuredResumeToText(data) {
  const personal = data?.personal ?? {};
  const chunks = [
    personal.name,
    personal.title,
    personal.location,
    personal.email,
    personal.phone,
    personal.portfolio,
    personal.github,
    personal.linkedin,
    personal.summary,
  ];

  (data?.skills ?? []).forEach((group) => chunks.push(group.category, ...(group.items ?? [])));
  (data?.projects ?? []).forEach((project) => chunks.push(project.name, project.description, ...(project.tech ?? []), ...(project.links ?? [])));
  (data?.experience ?? []).forEach((item) => chunks.push(item.role, item.company, item.location, item.period, ...(item.bullets ?? [])));
  (data?.education ?? []).forEach((item) => chunks.push(item.degree, item.institution, item.location, item.period, ...(item.details ?? [])));
  (data?.certifications ?? []).forEach((item) => chunks.push(item.name, item.issuer, item.year));
  chunks.push(...(data?.achievements ?? []));

  return chunks.filter(Boolean).join('\n');
}

function createCheck(id, label, score, maximum, detail, suggestion) {
  const earned = clampScore(score, maximum);
  return {
    id,
    label,
    earned,
    maximum,
    detail,
    suggestion,
    status: earned === maximum ? 'strong' : earned >= maximum * 0.55 ? 'partial' : 'missing',
  };
}

export function hasResumeContent(data) {
  const personal = data?.personal ?? {};
  return Boolean(
    personal.name ||
      personal.email ||
      personal.summary ||
      data?.skills?.length ||
      data?.projects?.length ||
      data?.education?.length ||
      data?.experience?.length,
  );
}

export function analyzeResume({ data, text = '', source = 'builder' }) {
  const isBuilder = source === 'builder';
  const resumeText = isBuilder ? structuredResumeToText(data) : text.trim();
  const personal = data?.personal ?? {};
  const summary = isBuilder ? personal.summary?.trim() ?? '' : extractSection(resumeText, ['summary', 'profile', 'objective']);
  const summaryWords = summary.split(/\s+/).filter(Boolean).length;
  const email = isBuilder ? personal.email?.trim() ?? '' : resumeText.match(EMAIL_PATTERN)?.[0] ?? '';
  const validEmail = EMAIL_PATTERN.test(email);
  const hasPhone = isBuilder ? Boolean(personal.phone?.trim()) : PHONE_PATTERN.test(resumeText);
  const hasLocation = isBuilder ? Boolean(personal.location?.trim()) : false;
  const hasLinkedIn = isBuilder ? LINKEDIN_PATTERN.test(personal.linkedin ?? '') : LINKEDIN_PATTERN.test(resumeText);
  const hasGitHub = isBuilder ? GITHUB_PATTERN.test(personal.github ?? '') : GITHUB_PATTERN.test(resumeText);
  const matchedKeywords = matchTerms(resumeText, ATS_KEYWORDS);
  const matchedVerbs = matchTerms(resumeText, ACTION_VERBS);
  const skillCount = isBuilder
    ? (data?.skills ?? []).reduce((total, group) => total + (group.items?.length ?? 0), 0)
    : matchedKeywords.length;
  const hasProjectsHeading = /^(projects?|personal projects?)\s*:?\s*$/im.test(resumeText);
  const hasEducationHeading = /^education\s*:?\s*$/im.test(resumeText);
  const hasExperienceHeading = /^(experience|internships?)\s*:?\s*$/im.test(resumeText);
  const hasCertificationHeading = /^certifications?\s*:?\s*$/im.test(resumeText);
  const projectCount = isBuilder ? data?.projects?.length ?? 0 : hasProjectsHeading ? 1 : 0;
  const projectTechCount = isBuilder
    ? (data?.projects ?? []).filter((project) => project.tech?.length).length
    : hasProjectsHeading
      ? matchedKeywords.length
      : 0;
  const educationCount = isBuilder ? data?.education?.length ?? 0 : hasEducationHeading ? 1 : 0;
  const experienceCount = isBuilder ? data?.experience?.length ?? 0 : hasExperienceHeading ? 1 : 0;
  const certificationCount = isBuilder ? data?.certifications?.length ?? 0 : hasCertificationHeading ? 1 : 0;

  const contactSignals = [validEmail, hasPhone, hasLocation].filter(Boolean).length;
  const linkSignals = [hasLinkedIn, hasGitHub].filter(Boolean).length;
  const completeSections = [
    contactSignals >= 2,
    summaryWords >= 15,
    skillCount >= 5,
    projectCount > 0,
    educationCount > 0,
    experienceCount > 0,
  ].filter(Boolean).length;

  const checks = [
    createCheck('contact', 'Contact details', contactSignals >= 2 ? 8 : contactSignals * 3, 8, `${contactSignals} of 3 useful contact signals found.`, 'Add an email, phone number, and location.'),
    createCheck('email', 'Valid email', validEmail ? 6 : 0, 6, validEmail ? 'A valid email format is present.' : 'No valid email was found.', 'Use a professional email address in a standard format.'),
    createCheck('links', 'LinkedIn and GitHub', linkSignals * 3, 6, `${linkSignals} of 2 professional profile links found.`, 'Add full LinkedIn and GitHub profile URLs.'),
    createCheck('summary', 'Summary quality', summaryWords >= 30 && summaryWords <= 100 ? 10 : summaryWords >= 15 ? 7 : summaryWords ? 3 : 0, 10, summaryWords ? `${summaryWords} words in the summary.` : 'No clear summary section found.', 'Write a focused 30-100 word summary with role, strengths, and direction.'),
    createCheck('skills', 'Skills count', skillCount >= 8 ? 8 : skillCount >= 5 ? 6 : skillCount * 0.8, 8, `${skillCount} relevant skills detected.`, 'Include at least 8 role-relevant technical and collaboration skills.'),
    createCheck('projects', 'Project count', projectCount >= 2 ? 8 : projectCount === 1 ? 5 : 0, 8, projectCount ? `${projectCount}${isBuilder ? '' : '+'} project entry detected.` : 'No project section found.', 'Add 2-4 projects that show what you built and why it mattered.'),
    createCheck('project-tech', 'Project tech stack', projectTechCount >= 2 ? 7 : projectTechCount ? 4 : 0, 7, projectTechCount ? 'Technology context appears with project work.' : 'Projects do not show a clear tech stack.', 'List the main technologies used for each project.'),
    createCheck('education', 'Education', educationCount ? 8 : 0, 8, educationCount ? 'Education information is present.' : 'No education section found.', 'Add degree, institution, and dates.'),
    createCheck('experience', 'Experience or internship', experienceCount ? 8 : 0, 8, experienceCount ? 'Experience or internship information is present.' : 'No experience or internship section found.', 'Add internships, freelance work, volunteering, or substantial project experience.'),
    createCheck('certifications', 'Certifications', certificationCount ? 4 : 0, 4, certificationCount ? 'Certification information is present.' : 'No certifications found.', 'Add relevant certifications when they strengthen your target role.'),
    createCheck('keywords', 'ATS keywords', matchedKeywords.length >= 8 ? 10 : matchedKeywords.length * 1.25, 10, `${matchedKeywords.length} relevant keywords detected.`, 'Mirror relevant skills and tools from the job description naturally.'),
    createCheck('verbs', 'Action verbs', matchedVerbs.length >= 5 ? 8 : matchedVerbs.length * 1.6, 8, `${matchedVerbs.length} distinct action verbs detected.`, 'Start accomplishment bullets with verbs such as built, improved, designed, or implemented.'),
    createCheck('completeness', 'Section completeness', (completeSections / 6) * 9, 9, `${completeSections} of 6 core resume areas are complete.`, 'Complete contact, summary, skills, projects, education, and experience areas.'),
  ];

  const score = checks.reduce((total, check) => total + check.earned, 0);
  const strengths = checks.filter((check) => check.status === 'strong').map((check) => check.label);
  const improvements = checks
    .filter((check) => check.status !== 'strong')
    .sort((first, second) => second.maximum - second.earned - (first.maximum - first.earned))
    .map((check) => check.suggestion)
    .filter((suggestion, index, suggestions) => suggestions.indexOf(suggestion) === index);

  return {
    score: clampScore(score, 100),
    checks,
    strengths,
    improvements,
    matchedKeywords,
    matchedVerbs,
    hasContent: Boolean(resumeText),
  };
}
