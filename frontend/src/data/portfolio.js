export const profile = {
  name: 'Kavya Chaurasiya',
  role: 'Java & Full-Stack Developer',
  headline: 'I build thoughtful web experiences while growing deeper into Java and full-stack engineering.',
  summary:
    'I am a computer science student turning ideas into responsive React interfaces and dependable Java foundations, with a focus on practical projects, clean code, and steady learning.',
  location: 'India',
  availability: 'Open to internships and full-stack opportunities',
  resumeUrl: '/resume',
  resumeBuilderUrl: '/builder',
  resumeCheckerUrl: '/checker',
  contactUrl: '#contact',
  email: 'kavya@example.com',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/chaurasiyaji02' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  ],
  stats: [
    { value: 'React', label: 'Interface craft' },
    { value: 'Java', label: 'Core language' },
    { value: 'Spring', label: 'Backend focus' },
  ],
  focusAreas: ['Responsive frontend systems', 'Java and Spring Boot', 'PostgreSQL and REST APIs'],
};

export const about = {
  eyebrow: 'About',
  title: 'A developer focused on expressive interfaces and dependable systems.',
  body:
    'I enjoy turning ideas into elegant, responsive applications with strong frontend architecture and practical backend design. My current focus is building full-stack products with React, Spring Boot, PostgreSQL, and modern UI systems.',
  highlights: [
    'Frontend foundations with React, Tailwind CSS, and animation systems',
    'Backend APIs using Java, Spring Boot, validation, and clean service layers',
    'Database-aware development with PostgreSQL and migration-first thinking',
  ],
};

export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Responsive UI'],
  },
  {
    category: 'Backend',
    items: ['Java', 'Spring Boot', 'REST APIs', 'Validation', 'JPA', 'Maven'],
  },
  {
    category: 'Database',
    items: ['PostgreSQL', 'SQL', 'Schema Design', 'Flyway', 'Data Modeling'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'Vite', 'VS Code', 'Postman', 'Deployment Basics'],
  },
];

export const projects = [
  {
    title: 'Developer Portfolio System',
    status: 'In progress',
    description:
      'A responsive portfolio experience with reusable content sections, purposeful motion, theme support, and a scalable frontend structure.',
    techStack: ['React', 'Framer Motion', 'React Router', 'Tailwind CSS'],
    githubUrl: 'https://github.com/chaurasiyaji02/kavya-portfolio',
    liveUrl: '#',
    accent: 'from-teal-300/30 via-indigo-300/20 to-transparent',
  },
  {
    title: 'Java Project Showcase API',
    status: 'Learning build',
    description:
      'A structured REST API concept for projects, education, and certifications, designed while deepening Spring Boot and database skills.',
    techStack: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL'],
    githubUrl: 'https://github.com/chaurasiyaji02/kavya-portfolio',
    liveUrl: '#',
    accent: 'from-rose-300/30 via-teal-300/20 to-transparent',
  },
  {
    title: 'Private Resume Toolkit',
    status: 'Frontend complete',
    description:
      'A browser-only resume builder and checker with reusable previews, local storage, ATS guidance, and no external data sharing.',
    techStack: ['React', 'LocalStorage', 'Framer Motion', 'Tailwind CSS'],
    githubUrl: 'https://github.com/chaurasiyaji02/kavya-portfolio',
    liveUrl: '#',
    accent: 'from-indigo-300/30 via-sky-300/20 to-transparent',
  },
];

export const careerTools = [
  {
    title: 'View Kavya Resume',
    description: "Browse Kavya's experience, education, skills, and projects across five resume layouts.",
    href: '/resume',
    action: 'View resume',
    meta: 'Portfolio companion',
  },
  {
    title: 'Build Your Resume',
    description: 'Create a private resume with live previews and browser-only storage.',
    href: '/builder',
    action: 'Open builder',
    meta: 'Free local tool',
  },
  {
    title: 'Check Your Resume',
    description: 'Review resume completeness, ATS signals, strengths, and practical improvements.',
    href: '/checker',
    action: 'Check resume',
    meta: 'Private local review',
  },
];

export const education = [
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'University Name',
    period: '2022 - 2026',
    description: 'Coursework focused on data structures, web development, databases, software engineering, and Java programming.',
  },
];

export const certifications = [
  {
    title: 'Full-Stack Web Development',
    issuer: 'Online Learning Platform',
    year: '2025',
    description: 'Covered frontend architecture, API integration, backend fundamentals, and deployment workflows.',
  },
  {
    title: 'Java and Data Structures',
    issuer: 'Technical Training Program',
    year: '2024',
    description: 'Built a stronger foundation in Java, problem solving, object-oriented design, and core algorithms.',
  },
];

export const experience = [
  {
    role: 'Full-Stack Developer Intern',
    company: 'Technology Studio',
    period: '2025',
    description:
      'Contributed to responsive frontend components, REST API integration, bug fixes, and documentation for production web applications.',
    achievements: ['Built reusable UI components', 'Integrated API states', 'Improved responsive layouts'],
  },
  {
    role: 'Frontend Project Contributor',
    company: 'Academic Projects',
    period: '2024 - 2025',
    description:
      'Designed and implemented modern web interfaces for student projects with attention to usability, motion, and accessibility.',
    achievements: ['Created React layouts', 'Organized component structure', 'Used Git-based collaboration'],
  },
];

export const contactCta = {
  eyebrow: 'Let us connect',
  title: 'Have an internship, project, or idea worth building?',
  body:
    'I am always glad to talk about practical full-stack work, Java opportunities, and teams where curiosity and thoughtful execution matter.',
  actions: [
    { label: 'Contact Me', href: profile.contactUrl, variant: 'primary' },
    { label: 'Explore Projects', href: '#projects', variant: 'secondary' },
  ],
};
