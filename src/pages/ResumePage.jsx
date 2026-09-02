import { Link } from 'react-router-dom';

export default function ResumePage() {
    return (
        <>
            <style>{`
                .resume-body {
                    font-family: 'EB Garamond', Georgia, serif;
                    background: #f0ede8;
                    color: #1a1a1a;
                    min-height: 100vh;
                    padding: 28px 16px 48px;
                    transition: background .3s, color .3s;
                }
                .dark .resume-body { background: #111; color: #e5e5e0; }

                .r-action-bar {
                    max-width: 680px; margin: 0 auto 18px;
                    display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;
                }
                .r-btn {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-family: 'Inter', sans-serif; font-size: 10.5px; font-weight: 700;
                    padding: 7px 14px; border-radius: 7px; border: none; cursor: pointer;
                    text-decoration: none; transition: transform .18s, box-shadow .18s; white-space: nowrap;
                }
                .r-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(0,0,0,.13); }
                .r-btn-back { background:#fff; color:#374151; border:1px solid #e5e7eb; box-shadow:0 1px 3px rgba(0,0,0,.07); }
                .dark .r-btn-back { background:#1c1c1c; color:#d1d5db; border-color:rgba(255,255,255,.08); }
                .r-btn-print { background:#111827; color:#fff; }
                .dark .r-btn-print { background:#fff; color:#111827; }

                .r-paper {
                    max-width: 680px; margin: 0 auto; background: #fff;
                    box-shadow: 0 4px 48px rgba(0,0,0,.13), 0 1px 6px rgba(0,0,0,.07);
                    border-radius: 3px; padding: 44px 54px;
                }
                .dark .r-paper { background: #161616; box-shadow: 0 4px 48px rgba(0,0,0,.55); }

                .r-name { text-align:center; font-family:'EB Garamond',serif; font-size:24pt; font-weight:700; letter-spacing:.01em; line-height:1; color:#0a0a0a; }
                .dark .r-name { color:#f5f5f0; }
                .r-contact { margin-top:6px; text-align:center; font-family:'Inter',sans-serif; font-size:8pt; font-weight:500; color:#4b5563; letter-spacing:.01em; }
                .dark .r-contact { color:#9ca3af; }
                .r-contact a { color:inherit; text-decoration:none; }
                .r-contact a:hover { text-decoration:underline; }
                .r-contact .dot { margin:0 4px; color:#d1d5db; }

                .r-section { margin-top:12px; }
                .r-s-title { font-family:'Inter',sans-serif; font-size:7.8pt; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:#111827; border-bottom:1.5px solid #111827; padding-bottom:3px; margin-bottom:7px; }
                .dark .r-s-title { color:#f3f4f6; border-color:#f3f4f6; }

                .r-objective { font-size:10pt; line-height:1.52; color:#374151; }
                .dark .r-objective { color:#d1d5db; }

                .r-edu-row { display:flex; justify-content:space-between; align-items:baseline; gap:8px; }
                .r-edu-degree { font-family:'Inter',sans-serif; font-size:9.5pt; font-weight:700; color:#111827; }
                .dark .r-edu-degree { color:#f9fafb; }
                .r-edu-school { font-size:10pt; font-style:italic; color:#374151; }
                .dark .r-edu-school { color:#d1d5db; }
                .r-edu-meta { font-family:'Inter',sans-serif; font-size:8pt; font-weight:600; color:#6b7280; white-space:nowrap; flex-shrink:0; }
                .dark .r-edu-meta { color:#9ca3af; }

                .r-exp { margin-bottom:9px; }
                .r-exp:last-child { margin-bottom:0; }
                .r-exp-top { display:flex; justify-content:space-between; align-items:baseline; gap:8px; }
                .r-exp-role { font-family:'Inter',sans-serif; font-size:9.5pt; font-weight:700; color:#111827; }
                .dark .r-exp-role { color:#f9fafb; }
                .r-exp-co { font-size:10pt; font-style:italic; color:#374151; margin-top:1px; }
                .dark .r-exp-co { color:#d1d5db; }
                .r-exp-date { font-family:'Inter',sans-serif; font-size:8pt; font-weight:600; color:#6b7280; white-space:nowrap; flex-shrink:0; }
                .dark .r-exp-date { color:#9ca3af; }
                .r-bullets { margin-top:4px; padding-left:15px; list-style:disc; }
                .r-bullets li { font-size:10pt; color:#374151; line-height:1.48; margin-bottom:1.5px; }
                .dark .r-bullets li { color:#d1d5db; }

                .r-skill-row { display:flex; gap:6px; margin-bottom:3px; font-size:10pt; line-height:1.45; }
                .r-skill-cat { font-family:'Inter',sans-serif; font-size:8.5pt; font-weight:700; color:#111827; width:110px; flex-shrink:0; }
                .dark .r-skill-cat { color:#f9fafb; }
                .r-skill-val { color:#374151; }
                .dark .r-skill-val { color:#d1d5db; }

                .r-cert-row { display:flex; justify-content:space-between; align-items:baseline; gap:8px; margin-bottom:4px; font-size:10pt; }
                .r-cert-name { font-family:'Inter',sans-serif; font-weight:600; font-size:9.5pt; color:#111827; }
                .dark .r-cert-name { color:#f9fafb; }
                .r-cert-right { font-size:9.5pt; color:#6b7280; white-space:nowrap; flex-shrink:0; }
                .dark .r-cert-right { color:#9ca3af; }

                @media print {
                    @page { size: Letter portrait; margin: 0.60in 0.65in 0.55in 0.65in; }
                    html, body { background:#fff !important; color:#000 !important; padding:0 !important; margin:0 !important; font-size:10pt !important; }
                    .r-action-bar { display:none !important; }
                    .r-paper { max-width:100% !important; margin:0 !important; padding:0 !important; box-shadow:none !important; border-radius:0 !important; background:transparent !important; }
                    .r-name, .r-edu-degree, .r-exp-role, .r-s-title, .r-skill-cat, .r-cert-name { color:#000 !important; }
                    .r-s-title { border-color:#000 !important; }
                    .r-objective, .r-edu-school, .r-exp-co, .r-bullets li, .r-skill-val { color:#222 !important; }
                    .r-edu-meta, .r-exp-date, .r-cert-right, .r-contact { color:#444 !important; }
                    .r-section { margin-top:9pt !important; }
                    .r-s-title { margin-bottom:5pt !important; padding-bottom:2pt !important; }
                    .r-exp { margin-bottom:7pt !important; }
                    .r-bullets li { font-size:9.5pt !important; line-height:1.42 !important; }
                    .r-objective { font-size:9.5pt !important; }
                    .r-skill-row { font-size:9.5pt !important; margin-bottom:2pt !important; }
                    .r-cert-row { margin-bottom:3pt !important; font-size:9.5pt !important; }
                }
                @media (max-width:600px) {
                    .r-paper { padding:28px 22px 32px; }
                    .r-name { font-size:18pt; }
                    .r-edu-row, .r-exp-top, .r-cert-row { flex-direction:column; gap:1px; }
                    .r-edu-meta, .r-exp-date, .r-cert-right { font-size:8pt; }
                }
            `}</style>

            <div className="resume-body">
                {/* Action Bar */}
                <div className="r-action-bar">
                    <Link to="/" className="r-btn r-btn-back">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                        Back to Portfolio
                    </Link>
                    <button onClick={() => window.print()} className="r-btn r-btn-print">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                        </svg>
                        Print / Save PDF
                    </button>
                </div>

                {/* Paper */}
                <div className="r-paper">

                    {/* Header */}
                    <div className="r-name">Gianssen G. Jasolin</div>
                    <div className="r-contact">
                        Metro Manila, Philippines
                        <span className="dot">·</span>
                        <a href="tel:+639304878972">+63 930-487-8972</a>
                        <span className="dot">·</span>
                        <a href="mailto:jasolingianssen@gmail.com">jasolingianssen@gmail.com</a>
                        <span className="dot">·</span>
                        <a href="https://github.com/Gianssen" target="_blank" rel="noopener noreferrer">github.com/Gianssen</a>
                        <span className="dot">·</span>
                        <a href="https://akosigiyan.vercel.app" target="_blank" rel="noopener noreferrer">akosigiyan.vercel.app</a>
                    </div>

                    {/* Objective */}
                    <div className="r-section">
                        <div className="r-s-title">Objective</div>
                        <p className="r-objective">
                            Third-year BSIT student seeking an OJT or entry-level position in software engineering or AI development
                            where I can apply my skills in full-stack web development, API integration, and system design to
                            contribute to real-world projects and grow into a professional software engineer.
                        </p>
                    </div>

                    {/* Education */}
                    <div className="r-section">
                        <div className="r-s-title">Education</div>
                        <div className="r-edu-row">
                            <div>
                                <div className="r-edu-degree">Bachelor of Science in Information Technology</div>
                                <div className="r-edu-school">The Fisher Valley College &nbsp;—&nbsp; Taguig City, Metro Manila</div>
                            </div>
                            <div className="r-edu-meta">2023 – May 2027 (Expected)</div>
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="r-section">
                        <div className="r-s-title">Experience</div>
                        {[
                            {
                                role: 'AI Engineer & Full-Stack Developer',
                                co: 'Personal Portfolio Labs · Self-Directed',
                                date: 'Jan 2026 – Present',
                                bullets: [
                                    'Built and deployed a production portfolio using React, Vite, and Tailwind CSS with AI chatbot powered by the Google Gemini API',
                                    'Implemented interactive UI features: spotlight cursor effects, scroll-reveal animations, and a developer terminal CLI emulator',
                                ],
                            },
                            {
                                role: 'Lead Full-Stack Developer',
                                co: "CJ's Minimart · POS & Inventory System",
                                date: 'Aug – Dec 2025',
                                bullets: [
                                    'Designed and delivered a retail POS and inventory management system using Laravel and MySQL, reducing manual reconciliation time by ~70%',
                                    'Delivered ahead of schedule; commended for code quality and maintainability by the product owner',
                                ],
                            },
                            {
                                role: 'IoT Systems Developer',
                                co: 'Anti-Theft Security System · Academic Capstone',
                                date: 'Feb – Jun 2024',
                                bullets: [
                                    'Built a hardware-software anti-theft system using Arduino Uno and ultrasonic sensors with mobile push-notification architecture',
                                ],
                            },
                        ].map((exp, i) => (
                            <div className="r-exp" key={i}>
                                <div className="r-exp-top">
                                    <div>
                                        <div className="r-exp-role">{exp.role}</div>
                                        <div className="r-exp-co">{exp.co}</div>
                                    </div>
                                    <div className="r-exp-date">{exp.date}</div>
                                </div>
                                <ul className="r-bullets">
                                    {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Projects */}
                    <div className="r-section">
                        <div className="r-s-title">Projects</div>
                        {[
                            {
                                role: 'Weather Globe App',
                                link: 'https://weather-globe-app.vercel.app',
                                linkText: 'weather-globe-app.vercel.app',
                                date: 'JavaScript · Vercel',
                                bullets: ['Responsive 7-day weather forecast PWA with geolocation and animated condition icons, deployed on Vercel'],
                            },
                            {
                                role: "CJ's Minimart POS",
                                link: 'https://github.com/Gianssen/Minimart',
                                linkText: 'github.com/Gianssen/Minimart',
                                date: 'Laravel · MySQL',
                                bullets: ['Full-featured retail POS with real-time inventory, automated alerts, and sales reporting for a live business'],
                            },
                        ].map((p, i) => (
                            <div className="r-exp" key={i}>
                                <div className="r-exp-top">
                                    <div>
                                        <div className="r-exp-role">
                                            {p.role} &nbsp;·&nbsp;{' '}
                                            <span style={{ fontWeight: 500, fontSize: '9pt' }}>
                                                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{p.linkText}</a>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="r-exp-date">{p.date}</div>
                                </div>
                                <ul className="r-bullets">
                                    {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    <div className="r-section">
                        <div className="r-s-title">Technical Skills</div>
                        {[
                            ['Languages',      'JavaScript, TypeScript, PHP 8, Python 3, HTML5, CSS3, SQL'],
                            ['Frameworks',     'React, Next.js, Laravel, Vue.js, Tailwind CSS, Bootstrap'],
                            ['Tools & DevOps', 'Git, GitHub Actions, Docker, Vercel, Vite, MySQL, PostgreSQL'],
                            ['AI / APIs',      'Google Gemini API, REST API Design, OpenWeatherMap API'],
                        ].map(([cat, val]) => (
                            <div className="r-skill-row" key={cat}>
                                <span className="r-skill-cat">{cat}</span>
                                <span className="r-skill-val">{val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Certifications */}
                    <div className="r-section">
                        <div className="r-s-title">Certifications</div>
                        {[
                            ['Advanced AI & Data Science Applications Masterclass', 'Academia Programmatica · Oct 2026'],
                            ['Responsive Web Design & JavaScript Developer',        'CodeCamp Learning · Oct 2026'],
                            ['Problem Solving (Basic)',                              'HackerRank · Apr 2026'],
                        ].map(([name, right]) => (
                            <div className="r-cert-row" key={name}>
                                <span className="r-cert-name">{name}</span>
                                <span className="r-cert-right">{right}</span>
                            </div>
                        ))}
                    </div>

                </div>{/* end .r-paper */}
            </div>
        </>
    );
}
