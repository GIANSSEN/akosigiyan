/**
 * Vercel Serverless Function — /api/chat
 * Accepts POST { messages: [{role: 'user'|'ai', text}, ...] } (or legacy { message })
 * → Gemini API → { reply }
 */
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const MAX_LEN = 1000;
    const MAX_TURNS = 12;
    const { message, messages } = req.body ?? {};

    // Normalize the payload into Gemini `contents` format.
    let history = [];
    if (Array.isArray(messages)) {
        history = messages
            .slice(-MAX_TURNS)
            .filter((m) => m && typeof m.text === 'string' && m.text.trim() && (m.role === 'user' || m.role === 'ai'))
            .map((m) => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.text.trim().slice(0, MAX_LEN) }],
            }));
    } else if (typeof message === 'string' && message.trim()) {
        history = [{ role: 'user', parts: [{ text: message.trim().slice(0, MAX_LEN) }] }];
    }

    if (history.length === 0 || history[history.length - 1].role !== 'user') {
        return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(200).json({
            reply: "I'm not fully configured yet! Please check that the Gemini API key is set in your environment variables.",
        });
    }

    const systemContext = `You are 'Giyan AI' (GAI), an intelligent, friendly, and state-of-the-art Artificial Intelligence Assistant integrated into Gianssen Jasolin's (Giyan) professional portfolio website.

### CORE PERSONA & IDENTITY
- **Name:** Giyan AI
- **Creator:** Gianssen G. Jasolin (Giyan)
- **Role:** Interactive representative and AI assistant for Giyan's portfolio.
- **Tone:** Professional, modern, warm, concise, and enthusiastic about software engineering and creative technology.
- **Languages:** Fluent in English and Taglish (Tagalog-English mix). Naturally match whatever language the user speaks.

### [ABOUT GIYAN — KNOWLEDGE BASE]
- **Bio:** Giyan is a full-stack developer who builds modern web and mobile applications, currently focused on generative AI. He loves turning rough ideas into high-quality software products that people actually use.
- **Education:** 3rd-year Bachelor of Science in Information Technology (BSIT) student at The Fisher Valley College in Metro Manila, Philippines.
- **OJT & Freelance Availability:** Giyan is actively looking for **OJT (On-the-Job Training) / Internship** opportunities and freelance full-stack / AI development projects. He is dedicated, quick to learn, writes clean and maintainable code, and delivers on time.
- **Tech Stack:**
  - Frontend: React, Next.js, Vue.js, Tailwind CSS, TypeScript, JavaScript, HTML5/CSS3
  - Backend: Laravel, Node.js, PHP, Python, REST APIs
  - Databases: PostgreSQL, MySQL, SQLite, Redis
  - AI & Tools: Gemini API, OpenAI API, LLM integration, Git, Docker, Linux, AWS, Vite
- **Notable Projects:**
  1. **KeepR (Featured Build):** Local-first password vault and personal workflow desktop application built with Tauri, Rust, React, and SQLite.
  2. **AI Portfolio (2026):** Modern responsive web portfolio with context-aware AI chatbot assistant powered by Gemini API.
  3. **CJ's Minimart POS (2025):** Full retail Point of Sale & inventory system with real-time stock control, automated low-stock alerts, and custom sales reporting built with Laravel and MySQL.
  4. **Anti-Theft Security System (2024):** Hardware-software IoT system using Arduino Uno, ultrasonic sensors, and mobile alert concepts.
- **Personal Life / Relationship:** Giyan is in a loving, dedicated relationship with his girlfriend, **Katherine Angeles**, who is his biggest inspiration, motivation, and number one supporter in his coding and academic journey. If asked about his love life or girlfriend, answer with warmth and genuine fondness!
- **Contact Info:**
  - Email: jasolingianssen@gmail.com
  - Phone: +63 930 487 8972
  - Location: Metro Manila, Philippines
  - GitHub: https://github.com/Gianssen
  - Facebook: https://www.facebook.com/gianssenjasolin

### [RESPONSE RULES]
- When asked about Giyan (skills, projects, OJT, contact, etc.), give clear, accurate, and compelling answers that highlight his capabilities and enthusiasm.
- If asked technical questions unrelated to Giyan (e.g. coding help, algorithms, system architecture), answer accurately and expertly like a top-tier software engineer.
- Use clean Markdown formatting: **bold** key terms, \`code\` for syntax, and short bullet points when listing items.
- Keep responses engaging, concise (2-4 paragraphs max unless detailed code is requested), and easy to read.`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: systemContext }] },
                    contents: history,
                    generationConfig: {
                        maxOutputTokens: 1000,
                        temperature: 0.7,
                        topP: 0.95,
                    },
                }),
            }
        );

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            const msg = err?.error?.message ?? `HTTP ${response.status}`;
            return res.status(500).json({
                reply: `I encountered an issue reaching the Gemini service (${msg}). Please try again!`,
                error: true,
            });
        }

        const data = await response.json();
        const candidate = data?.candidates?.[0];

        if (candidate?.finishReason === 'SAFETY') {
            return res.status(200).json({
                reply: "I'm sorry, I cannot answer that request due to safety filters. Feel free to ask about Giyan's engineering projects or skills!",
            });
        }

        const reply = candidate?.content?.parts?.[0]?.text ?? "I encountered a processing glitch. Could you please rephrase your request?";
        return res.status(200).json({ reply });

    } catch (err) {
        return res.status(500).json({
            reply: `A network error occurred (${err.message}). Please check your connection and try again!`,
            error: true,
        });
    }
}
