export const profile = {
  name: 'Kavya Chaurasiya',
  role: 'Full-Stack Developer',
  headline: 'Building polished, scalable web experiences with React, Java, and product-minded engineering.',
  summary:
    'I create clean interfaces, reliable backend foundations, and thoughtful user experiences that feel fast, modern, and easy to use.',
  location: 'India',
  availability: 'Open to internships and full-stack opportunities',
  resumeUrl: '/resume',
  resumeBuilderUrl: '/builder',
  contactUrl: '#contact',
  email: 'kavya@example.com',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/chaurasiyaji02' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  ],
  stats: [
    { value: '12+', label: 'Projects shipped' },
    { value: '4', label: 'Core stacks' },
    { value: '100%', label: 'Learning mindset' },
  ],
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
    title: 'Resume Builder Platform',
    status: 'Planned',
    description:
      'A dynamic resume creation product with guided inputs, premium templates, downloadable exports, and admin-managed content.',
    techStack: ['React', 'Spring Boot', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/chaurasiyaji02/kavya-portfolio',
    liveUrl: '#',
    accent: 'from-teal-300/30 via-indigo-300/20 to-transparent',
  },
  {
    title: 'Developer Portfolio System',
    status: 'In progress',
    description:
      'A modern portfolio experience designed for editable sections, smooth motion, theme support, and future backend integration.',
    techStack: ['React', 'Framer Motion', 'React Router', 'Vite'],
    githubUrl: 'https://github.com/chaurasiyaji02/kavya-portfolio',
    liveUrl: '#',
    accent: 'from-rose-300/30 via-teal-300/20 to-transparent',
  },
  {
    title: 'Project Showcase API',
    status: 'Concept',
    description:
      'A structured API layer for projects, certifications, education, and contact messages with PostgreSQL persistence.',
    techStack: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL'],
    githubUrl: 'https://github.com/chaurasiyaji02/kavya-portfolio',
    liveUrl: '#',
    accent: 'from-indigo-300/30 via-sky-300/20 to-transparent',
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
  eyebrow: 'Ready for the next step',
  title: 'Let us build something polished, useful, and production-minded.',
  body:
    'This static portfolio foundation is ready for real content, backend-powered editing, and future resume builder workflows.',
  actions: [
    { label: 'View Resume', href: profile.resumeUrl, variant: 'primary' },
    { label: 'Build Your Resume', href: profile.resumeBuilderUrl, variant: 'secondary' },
    { label: 'Contact Me', href: profile.contactUrl, variant: 'ghost' },
  ],
};
