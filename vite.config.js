import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import chatHandler from './api/chat.js';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    return {
        server: {
            allowedHosts: true,
        },
        plugins: [
            react(),
            tailwindcss(),
            {
                name: 'local-api-chat-middleware',
                configureServer(server) {
                    server.middlewares.use('/api/chat', async (req, res) => {
                        if (req.method !== 'POST') {
                            res.statusCode = 405;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ error: 'Method not allowed' }));
                            return;
                        }

                        let body = '';
                        req.on('data', chunk => { body += chunk; });
                        req.on('end', async () => {
                            try {
                                const parsedBody = body ? JSON.parse(body) : {};
                                const mockReq = { method: 'POST', body: parsedBody };
                                const mockRes = {
                                    statusCode: 200,
                                    headers: {},
                                    status(code) {
                                        this.statusCode = code;
                                        return this;
                                    },
                                    setHeader(k, v) {
                                        this.headers[k] = v;
                                        return this;
                                    },
                                    json(data) {
                                        res.statusCode = this.statusCode || 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.end(JSON.stringify(data));
                                    },
                                };
                                await chatHandler(mockReq, mockRes);
                            } catch (e) {
                                res.statusCode = 500;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ error: e.message }));
                            }
                        });
                    });
                },
            },
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
    };
});
