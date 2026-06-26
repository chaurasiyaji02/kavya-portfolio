export const resumeData = {
  personal: {
    name: 'Kavya Chaurasiya',
    title: 'Full-Stack Developer',
    location: 'India',
    email: 'kavya@example.com',
    phone: '+91 98765 43210',
    portfolio: 'kavya-portfolio.dev',
    github: 'github.com/chaurasiyaji02',
    linkedin: 'linkedin.com/in/kavya-chaurasiya',
    photoUrl:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"%3E%3Crect width="240" height="240" rx="52" fill="%230f172a"/%3E%3Ccircle cx="172" cy="68" r="74" fill="%232dd4bf" opacity=".72"/%3E%3Ccircle cx="70" cy="184" r="92" fill="%23818cf8" opacity=".72"/%3E%3Ctext x="120" y="134" text-anchor="middle" font-family="Arial,sans-serif" font-size="62" font-weight="700" fill="white"%3EKC%3C/text%3E%3C/svg%3E',
    summary:
      'Full-stack developer focused on building clean, responsive user interfaces and reliable Java Spring Boot foundations. Comfortable with React, Tailwind CSS, REST APIs, PostgreSQL, and Git-based development workflows.',
  },
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Responsive Design'],
    },
    {
      category: 'Backend',
      items: ['Java', 'Spring Boot', 'REST APIs', 'JPA', 'Maven', 'Validation'],
    },
    {
      category: 'Database & Tools',
      items: ['PostgreSQL', 'SQL', 'Git', 'GitHub', 'Vite', 'Postman'],
    },
  ],
  experience: [
    {
      role: 'Full-Stack Developer Intern',
      company: 'Technology Studio',
      location: 'Remote',
      period: '2025',
      bullets: [
        'Built reusable React components for responsive product screens.',
        'Integrated frontend flows with REST API endpoints and loading states.',
        'Documented implementation details to make handoff and future iteration easier.',
      ],
    },
  ],
  projects: [
    {
      name: 'Developer Portfolio System',
      description:
        'A modern portfolio foundation with React routing, theme support, animated UI sections, and editable content structures.',
      tech: ['React', 'Tailwind CSS', 'Framer Motion', 'React Router'],
      links: ['github.com/chaurasiyaji02/kavya-portfolio'],
    },
    {
      name: 'Resume Builder Platform',
      description:
        'Planned full-stack resume product with template previews, structured resume data, and future downloadable exports.',
      tech: ['React', 'Spring Boot', 'PostgreSQL'],
      links: ['Coming soon'],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'University Name',
      location: 'India',
      period: '2022 - 2026',
      details: ['Relevant coursework: Data Structures, DBMS, Web Development, Software Engineering'],
    },
  ],
  certifications: [
    {
      name: 'Full-Stack Web Development',
      issuer: 'Online Learning Platform',
      year: '2025',
    },
    {
      name: 'Java and Data Structures',
      issuer: 'Technical Training Program',
      year: '2024',
    },
  ],
  achievements: [],
};

export const resumeTemplates = [
  {
    id: 'ats-classic',
    name: 'ATS Classic',
    description: 'Clean one-column resume for applicant tracking systems.',
    supportsPhoto: false,
  },
  {
    id: 'modern-developer',
    name: 'Modern Developer',
    description: 'Polished technical layout with compact project emphasis.',
    supportsPhoto: false,
  },
  {
    id: 'photo-sidebar',
    name: 'Photo Sidebar',
    description: 'Profile-forward layout with a dedicated sidebar.',
    supportsPhoto: true,
  },
  {
    id: 'creative-accent',
    name: 'Creative Accent',
    description: 'Expressive accent style with optional profile image.',
    supportsPhoto: true,
  },
  {
    id: 'fresher-internship',
    name: 'Fresher Internship',
    description: 'Early-career layout that highlights skills, education, and projects.',
    supportsPhoto: false,
  },
];
