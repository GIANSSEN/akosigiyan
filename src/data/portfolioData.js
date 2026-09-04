// ─── Portfolio Data ───────────────────────────────────────────────────────────

export const stack = {
    'Frontend': ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS'],
    'Backend': ['PHP', 'Laravel', 'Node.js', 'Python', 'PostgreSQL', 'MySQL'],
    'DevOps & Cloud': ['AWS', 'Docker', 'GitHub Actions', 'Linux'],
};

// Icons that are inherently black/very-dark and need inversion on dark bg
export const invertInDark = ['Next.js', 'GitHub Actions', 'Linux', 'AWS'];

export const techIcons = {
    'JavaScript': 'javascript',
    'TypeScript': 'typescript',
    'React': 'react',
    'Next.js': 'nextdotjs',
    'Vue.js': 'vuedotjs',
    'Tailwind CSS': 'tailwindcss',
    'PHP': 'php',
    'Laravel': 'laravel',
    'Node.js': 'nodedotjs',
    'Python': 'python',
    'PostgreSQL': 'postgresql',
    'MySQL': 'mysql',
    'AWS': 'amazonwebservices',
    'Docker': 'docker',
    'GitHub Actions': 'githubactions',
    'Linux': 'linux',
    'Vite': 'vite',
    'Git': 'git',
};

// All flat tech tags for the Technologies section (RBL style)
export const allTech = [
    // Frontend & Build
    { name: 'React', slug: 'react', color: '#61DAFB' },
    { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
    { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
    { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4' },
    { name: 'Vite', slug: 'vite', color: '#646CFF' },
    { name: 'Next.js', slug: 'nextdotjs', color: '#000000', invertDark: true },
    { name: 'Vue.js', slug: 'vuedotjs', color: '#4FC08D' },
    { name: 'HTML5', slug: 'html5', color: '#E34F26' },
    { name: 'Vanilla CSS', slug: 'css3', color: '#1572B6' },
    // Backend & Databases
    { name: 'PHP', slug: 'php', color: '#777BB4' },
    { name: 'Laravel', slug: 'laravel', color: '#FF2D20' },
    { name: 'Node.js', slug: 'nodedotjs', color: '#339933' },
    { name: 'Python', slug: 'python', color: '#3776AB' },
    { name: 'Rust', slug: 'rust', color: '#000000', invertDark: true },
    { name: 'MySQL', slug: 'mysql', color: '#4479A1' },
    { name: 'PostgreSQL', slug: 'postgresql', color: '#336791' },
    { name: 'SQLite', slug: 'sqlite', color: '#003B57' },
    { name: 'Supabase', slug: 'supabase', color: '#3ECF8E' },
    // DevOps, AI & APIs
    { name: 'Git', slug: 'git', color: '#F05032' },
    { name: 'GitHub', slug: 'github', color: '#181717', invertDark: true },
    { name: 'GitHub Actions', slug: 'githubactions', color: '#2088FF' },
    { name: 'Docker', slug: 'docker', color: '#2496ED' },
    { name: 'AWS', slug: 'amazonwebservices', color: '#232F3E', invertDark: true },
    { name: 'Linux', slug: 'linux', color: '#FCC624', invertDark: true },
    { name: 'OpenAI API', slug: 'openai', color: '#412991' },
];


export const projects = [
    {
        title: 'Galilei Global',
        role: 'Technical SEO & Deployment Specialist',
        description: 'Corporate landing page for an international trading company.',
        url: 'galileiglobal.com',
        link: 'https://galileiglobal.com/',
        linkLabel: 'VISIT SITE',
        image: '/projects/galilei-global.png',
        tech: ['html5', 'css3', 'javascript'],
    },
    {
        title: "CJ's Minimart POS System",
        role: 'Lead Full-Stack Developer',
        description: 'A comprehensive retail management and POS system featuring real-time inventory tracking, bulk stock handling, and automated reporting.',
        url: 'github.com/Gianssen/Minimart',
        link: 'https://github.com/Gianssen/Minimart',
        linkLabel: 'VIEW ON GITHUB',
        image: '/projects/cj-minimart.png',
        tech: ['laravel', 'mysql', 'php', 'javascript'],
    },
    {
        title: 'Weather Globe App',
        role: 'Solo Frontend Developer',
        description: 'A fully responsive and interactive 7-day weather forecast application with live data, deployed on Vercel.',
        url: 'weather-globe-app.vercel.app',
        link: 'https://weather-globe-app.vercel.app/?_vercel_share=ChNJ7A3uJvSAGPZUnk1Zz2ibCaSkprGm',
        linkLabel: 'VISIT SITE',
        image: '/projects/weather-pulse.png',
        tech: ['react', 'javascript', 'vite'],
    },
    {
        title: 'Cozy Blissful Spa',
        role: 'Full-Stack Developer',
        description: 'A sanctuary salon & wellness spa booking platform featuring curated foot spa rituals, private suites, and seamless appointment scheduling.',
        url: 'cozyblissfulspa.local',
        link: '#',
        linkLabel: 'IN PROGRESS',
        status: 'In Progress',
        image: '/projects/cozy-blissful-spa.png',
        tech: ['laravel', 'react', 'vite', 'javascript', 'postgresql'],
    },
];

export const experience = [
    {
        role: 'AI Engineer & Full-Stack Developer',
        company: 'Personal Portfolio Labs',
        location: 'Metro Manila (Remote)',
        period: '2026 — Present',
        description: 'Architected and engineered an intelligent personal portfolio with a stateful, context-aware chatbot assistant powered by the Gemini API. Leveraged React, Tailwind CSS, and Vite to deliver high-performance, responsive layouts with modern UI/UX paradigms.',
    },
    {
        role: 'Lead Full-Stack Developer',
        company: "CJ's Minimart POS System",
        location: 'Metro Manila, Philippines',
        period: '2025',
        description: 'Designed and implemented a comprehensive retail Point of Sale (POS) and inventory control system. Handled real-time stock levels, high-throughput bulk operations, automated low-stock alerts, and custom sales reporting using Laravel and MySQL.',
    },
    {
        role: 'IoT Systems Developer',
        company: 'Anti-Theft Security System',
        location: 'Metro Manila, Philippines',
        period: '2024',
        description: 'Built a hardware-software integrated security system utilizing Arduino Uno microcontrollers and ultrasonic sensor arrays. Designed scalable mobile push notification concepts with React Native for instant intrusion alerts.',
    },
    {
        role: 'BS Information Technology Student',
        company: 'The Fisher Valley College',
        location: 'Metro Manila, Philippines',
        period: '2023 — Present',
        description: 'Pursuing a Bachelor of Science in Information Technology focusing on modern web frameworks, system architecture, database modeling, and software engineering methodologies.',
    },
    {
        role: 'First "Hello, World!" & Coding Foundations',
        company: 'Self-Taught Journey',
        location: 'Philippines',
        period: '2022',
        description: 'Executed my very first "Hello, World!" program, igniting a lifelong passion for software engineering. Dedicated myself to self-learning core programming fundamentals — turning curiosity into a structured problem-solving mindset.',
    },
];

export const education = [
    {
        period: '2023 — 2027',
        degree: 'Bachelor of Science in Information Technology',
        school: 'The Fisher Valley College',
        campus: 'Metro Manila, Philippines',
    },
];

export const certifications = [
    {
        name: 'Advanced AI & Data Science Applications Masterclass',
        issuer: 'Academia Programmatica',
        image: '/certifications/academia-programmatica-masterclass.png',
        date: 'Oct 2026',
        category: 'AI & Machine Learning',
        credentialType: 'Executive Masterclass',
        skills: ['Artificial Intelligence', 'Data Science', 'Python', 'Prompt Engineering'],
        description: 'Comprehensive masterclass on real-world generative AI workflows, machine learning models, and modern data-driven software architecture.',
    },
    {
        name: 'Responsive Web Design & Javascript Developer',
        issuer: 'CodeCamp Learning',
        image: '/certifications/codecamp.jpg',
        date: 'Oct 2026',
        category: 'Frontend Engineering',
        credentialType: 'Verified Certification',
        skills: ['Responsive UI', 'JavaScript ES6+', 'Modern CSS3', 'Semantic HTML5'],
        description: 'In-depth mastery of responsive web architecture, viewport-fluid design systems, cross-browser compatibility, and modern JavaScript.',
    },
    {
        name: 'Problem Solving (Basic)',
        issuer: 'HackerRank',
        image: '/certifications/hackerrank.png',
        date: 'Apr 2026',
        category: 'Algorithms & Logic',
        credentialType: 'Skill Assessment',
        skills: ['Algorithms', 'Data Structures', 'Logical Reasoning', 'Time Complexity'],
        description: 'Verified assessment covering fundamental algorithm design, efficient data structures, sorting, edge-case evaluation, and problem-solving benchmarks.',
    },
];

export const recommendations = [
    {
        text: "Giyan writes some of the cleanest and most scalable code I've reviewed. His full-stack architecture and problem-solving speed make him a top-tier engineer.",
        name: 'John Dela Cruz',
        title: 'Senior Engineer at TechCorp',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces&q=80',
    },
    {
        text: "Giyan transformed our store operations with an end-to-end POS & Inventory system. Delivered ahead of schedule with flawless database performance!",
        name: 'Maria Santos',
        title: "Product Owner at CJ's Minimart",
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces&q=80',
    },
    {
        text: "Giyan's AI chatbot integration and API pipelines were exceptionally fast and robust. He delivers production-grade results with zero hand-holding.",
        name: 'Carlos Reyes',
        title: 'Tech Lead at Digital Solutions PH',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces&q=80',
    },
    {
        text: 'Among all IT students, Giyan stands out with unmatched engineering rigor. His IoT security system capstone is an absolute benchmark for technical excellence.',
        name: 'Prof. Arnold Ramirez',
        title: 'Faculty Adviser at TFVC',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces&q=80',
    },
    {
        text: 'Collaborating with Giyan is seamless. He brings a brilliant UI/UX eye, fluid micro-interactions, and modern React best practices to every project.',
        name: 'Kevin Alcantara',
        title: 'Full-Stack Dev at DevConnect',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=faces&q=80',
    },
    {
        text: 'Super responsive, highly dependable, and insanely talented. Giyan turned our complex concept into a lightning-fast web platform in record time!',
        name: 'Aileen Fernandez',
        title: 'Founder & Client at StyleNest',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces&q=80',
    },
];

// Avatar list for the AvatarGroup component
export const recommenderAvatars = recommendations.map(rec => ({
    src: rec.avatar,
    alt: rec.name,
    label: `${rec.name} · ${rec.title}`,
}));

export const goals = [
    'Land a meaningful OJT / Internship where I can apply my skills in AI engineering and full-stack development to solve real business problems.',
    'Grow into a professional AI Engineer and Software Developer — continuously shipping impactful, production-grade systems that make a difference.',
];

export const hobbies = ['Coding', 'Gaming', 'Music', 'Learning'];

export const socialLinks = [
    {
        name: 'LinkedIn',
        subtitle: 'Connect with me',
        href: 'https://www.linkedin.com/in/gianssen-jasolin/',
        color: '#0A66C2',
        hoverBorder: 'hover:border-[#0A66C2]/30',
        bgLight: '#E8F0FB',
        bgDark: '#0A66C2/15',
        iconPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
        name: 'GitHub',
        subtitle: '@Gianssen',
        href: 'https://github.com/Gianssen',
        color: '#181717',
        hoverBorder: 'hover:border-[#181717]/20 dark:hover:border-white/10',
        bgLight: 'gray-100',
        bgDark: 'white/8',
        iconPath: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
    },
    {
        name: 'Facebook',
        subtitle: 'Gianssen Jasolin',
        href: 'https://www.facebook.com/gianssenjasolin',
        color: '#1877F2',
        hoverBorder: 'hover:border-[#1877F2]/25',
        bgLight: '#E8F0FB',
        bgDark: '#1877F2/15',
        iconPath: 'M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.93-1.956 1.885v2.284h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z',
    },
    {
        name: 'Instagram',
        subtitle: '@akosigiyan',
        href: 'https://www.instagram.com/akosigiyan',
        color: '#E1306C',
        hoverBorder: 'hover:border-[#E1306C]/20',
        bgLight: '#FDEAF2',
        bgDark: '#E1306C/10',
        isInstagram: true,
    },
];

// Inline tech chips shown in the hero bio
export const heroChips = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Laravel', color: '#FF2D20' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Python', color: '#3776AB' },
    { name: 'TypeScript', color: '#3178C6' },
];

export const footerQuote = '"The best way to predict the future is to build it." — shipping clean code, one commit at a time.';

export const contactInfo = {
    email: 'jasolingianssen@gmail.com',
    phone: '930-487-8972',
    phoneHref: 'tel:+639304878972',
    messenger: 'https://m.me/gianssenjasolin',
};

export const galleryItems = [1, 2, 3, 4, 5, 6, 7, 8];

// Terminal command data
export const terminalCommands = {
    help: [
        { text: 'Available commands:', cls: 'success' },
        { text: '  about       — Who is Gianssen?', cls: 'output' },
        { text: '  skills      — Tech stack overview', cls: 'output' },
        { text: '  projects    — Recent projects', cls: 'output' },
        { text: '  experience  — Work experience', cls: 'output' },
        { text: '  contact     — Get in touch', cls: 'output' },
        { text: '  goals       — Current goals', cls: 'output' },
        { text: '  secret      — 🤫', cls: 'output' },
        { text: '  clear       — Clear terminal', cls: 'output' },
    ],
    about: [
        { text: '─── About Gianssen ───────────────────────────', cls: 'accent' },
        { text: 'Name:      Gianssen G. Jasolin', cls: 'output' },
        { text: 'Role:      AI / Full-Stack Developer', cls: 'output' },
        { text: 'School:    The Fisher Valley College (BSIT)', cls: 'output' },
        { text: 'Location:  Metro Manila, Philippines', cls: 'output' },
        { text: '', cls: 'output' },
        { text: '3rd-year BSIT student passionate about building', cls: 'output' },
        { text: 'user-centered digital solutions. Seeking OJT.', cls: 'output' },
    ],
    skills: [
        { text: '─── Tech Stack ───────────────────────────────', cls: 'accent' },
        { text: 'Frontend:  JavaScript · TypeScript · React', cls: 'output' },
        { text: '           Next.js · Vue.js · Tailwind CSS', cls: 'output' },
        { text: 'Backend:   PHP · Laravel · Node.js · Python', cls: 'output' },
        { text: '           PostgreSQL · MySQL', cls: 'output' },
        { text: 'DevOps:    AWS · Docker · GitHub Actions · Linux', cls: 'output' },
    ],
    projects: [
        { text: '─── Recent Projects ──────────────────────────', cls: 'accent' },
        { text: "01  Galilei Global", cls: 'success' },
        { text: '    Corporate trading platform (HTML5/CSS3/JS)', cls: 'output' },
        { text: '    → galileiglobal.com', cls: 'link', href: 'https://galileiglobal.com/' },
        { text: '', cls: 'output' },
        { text: "02  CJ's Minimart POS System", cls: 'success' },
        { text: '    Retail POS + inventory tracking (Laravel)', cls: 'output' },
        { text: '    → github.com/Gianssen/Minimart', cls: 'link', href: 'https://github.com/Gianssen/Minimart' },
        { text: '', cls: 'output' },
        { text: '03  Weather Globe App', cls: 'success' },
        { text: '    7-day forecast app deployed on Vercel', cls: 'output' },
        { text: '    → weather-globe-app.vercel.app', cls: 'link', href: 'https://weather-globe-app.vercel.app' },
        { text: '', cls: 'output' },
        { text: '04  Cozy Blissful Spa  [In Progress]', cls: 'warning' },
        { text: '    Salon & wellness booking platform (Laravel + React + PostgreSQL)', cls: 'output' },
    ],
    experience: [
        { text: '─── Experience ───────────────────────────────', cls: 'accent' },
        { text: '2026  AI Engineer & Full-Stack Developer', cls: 'success' },
        { text: "      Personal Portfolio Labs", cls: 'output' },
        { text: '2025  Lead Full-Stack Developer', cls: 'success' },
        { text: "      CJ's Minimart POS System", cls: 'output' },
        { text: '2024  IoT Systems Developer', cls: 'success' },
        { text: '      Anti-Theft Security System', cls: 'output' },
        { text: '2023  BS IT Student', cls: 'success' },
        { text: '      The Fisher Valley College', cls: 'output' },
        { text: '2022  First Hello, World! 🌍', cls: 'success' },
        { text: '      Self-Taught Journey begins...', cls: 'output' },
    ],
    contact: [
        { text: '─── Contact ──────────────────────────────────', cls: 'accent' },
        { text: 'Email:     jasolingianssen@gmail.com', cls: 'output' },
        { text: 'Phone:     +63 930-487-8972', cls: 'output' },
        { text: 'GitHub:    github.com/Gianssen', cls: 'link', href: 'https://github.com/Gianssen' },
        { text: 'Facebook:  facebook.com/gianssenjasolin', cls: 'link', href: 'https://www.facebook.com/gianssenjasolin' },
        { text: 'Instagram: instagram.com/akosigiyan', cls: 'link', href: 'https://www.instagram.com/akosigiyan' },
        { text: '', cls: 'output' },
        { text: 'Open to OJT/Internship opportunities! 🚀', cls: 'success' },
    ],
    goals: [
        { text: '─── Current Goals ────────────────────────────', cls: 'accent' },
        { text: '✦ Land a meaningful OJT / Internship', cls: 'output' },
        { text: '  in AI engineering & full-stack development.', cls: 'output' },
        { text: '', cls: 'output' },
        { text: '✦ Grow into a professional AI Engineer &', cls: 'output' },
        { text: '  Software Developer shipping production-grade', cls: 'output' },
        { text: '  systems that make a difference.', cls: 'output' },
    ],
    secret: [
        { text: '  ████████████████████████████████████', cls: 'error' },
        { text: '  █  ACCESS GRANTED — LEVEL 99 DEV   █', cls: 'error' },
        { text: '  ████████████████████████████████████', cls: 'error' },
        { text: '', cls: 'output' },
        { text: '  🎮 Fun fact: Gianssen types 80+ WPM &', cls: 'accent' },
        { text: '  once debugged for 6 hours just to find', cls: 'accent' },
        { text: '  a missing semicolon. Never again. 😭', cls: 'accent' },
    ],
};
