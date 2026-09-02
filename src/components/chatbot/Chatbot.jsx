import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Sparkles, RefreshCw } from 'lucide-react';

/* ── Constants ───────────────────────────────────────────────────────────── */
const MAX_CHARS = 1000;
const MAX_HISTORY = 30;
const MAX_CONTEXT = 12;
const STORAGE_KEY = 'giyan-chat-history';

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function escapeHTML(str) {
    const d = document.createElement('div');
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
}

function renderMarkdown(text) {
    return escapeHTML(text)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-white/10 px-1 py-0.5 rounded text-[11.5px] font-mono">$1</code>')
        .replace(/^[•\-] (.+)$/gm, '<li class="ml-3 list-disc my-0.5">$1</li>')
        .replace(/\n/g, '<br/>');
}

function isValidMessage(msg) {
    return (
        msg &&
        (msg.role === 'user' || msg.role === 'ai') &&
        typeof msg.text === 'string' &&
        msg.text.trim().length > 0
    );
}

function loadHistory() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(isValidMessage).slice(-MAX_HISTORY);
    } catch {
        return [];
    }
}

/* ── Typing Indicator ─────────────────────────────────────────────────────── */
function TypingIndicator() {
    return (
        <div className="flex items-start gap-2 animate-fadeIn">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 shrink-0 mt-1 bg-gray-100 dark:bg-white/5">
                <img src="/profile-light.png" alt="Giyan" className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex items-center gap-1 py-2.5 px-3 bg-white dark:bg-[#181818] border border-gray-200/80 dark:border-white/10 shadow-sm rounded-2xl rounded-tl-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    );
}

/* ── Chat Message Bubble ─────────────────────────────────────────────────── */
function ChatBubble({ msg, onRetry, isLast }) {
    const isUser = msg.role === 'user';
    const isError = msg.isError;

    return (
        <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse self-end max-w-[88%]' : 'self-start max-w-[92%]'}`}>
            {!isUser && (
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 shrink-0 mt-1 bg-gray-100 dark:bg-white/5">
                    <img src="/profile-light.png" alt="Giyan" className="w-full h-full object-cover object-top" />
                </div>
            )}
            <div className="min-w-0">
                <div
                    className={`py-2.5 px-3.5 text-[13.5px] leading-relaxed break-words ${
                        isUser
                            ? 'bg-[#111111] dark:bg-white text-white dark:text-gray-900 rounded-2xl rounded-tr-xs shadow-sm'
                            : isError
                            ? 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-300 rounded-2xl rounded-tl-xs'
                            : 'bg-white dark:bg-[#181818] border border-gray-200/80 dark:border-white/10 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-xs shadow-sm'
                    }`}
                    dangerouslySetInnerHTML={{ __html: isUser ? escapeHTML(msg.text) : renderMarkdown(msg.text) }}
                />
                {isError && onRetry && isLast && (
                    <button
                        onClick={onRetry}
                        className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                        <RefreshCw size={11} />
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
}

/* ── Main Chatbot Component ───────────────────────────────────────────────── */
export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(loadHistory);
    const [inputVal, setInputVal] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesRef = useRef(null);
    const inputRef = useRef(null);
    const abortRef = useRef(null);

    const scrollToBottom = useCallback((instant = false) => {
        if (!messagesRef.current) return;
        if (instant) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        } else {
            requestAnimationFrame(() => {
                messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
            });
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 250);
            scrollToBottom(true);
        }
    }, [isOpen, scrollToBottom]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, scrollToBottom]);

    // Persist conversation
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
        } catch {
            /* storage full */
        }
    }, [messages]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen]);

    // Abort on unmount
    useEffect(() => () => abortRef.current?.abort(), []);

    async function sendMessage(text) {
        const userText = text.trim();
        if (!userText || isTyping) return;

        const nextMessages = [...messages.slice(-MAX_CONTEXT), { role: 'user', text: userText }];
        setMessages(nextMessages);
        setInputVal('');
        setIsTyping(true);

        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: nextMessages }),
                signal: controller.signal,
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.reply || errData.error || `HTTP ${res.status}`);
            }

            const data = await res.json();
            setMessages([...nextMessages, { role: 'ai', text: data.reply || "I couldn't process that. Please try again." }]);
        } catch (err) {
            if (err.name !== 'AbortError') {
                setMessages([
                    ...nextMessages,
                    {
                        role: 'ai',
                        text: `Unable to connect: ${err.message || 'Please check your connection and try again.'}`,
                        isError: true,
                    },
                ]);
            }
        } finally {
            setIsTyping(false);
        }
    }

    function retryLast() {
        const lastUser = [...messages].reverse().find(m => m.role === 'user');
        if (lastUser) {
            sendMessage(lastUser.text);
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(inputVal);
        }
    }

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end font-sans" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
            {/* ── Chatbot Popup Card (RBL Style) ── */}
            {isOpen && (
                <div
                    role="dialog"
                    aria-label="Chat with Giyan"
                    className="mb-3 w-[360px] sm:w-[400px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[80vh] bg-white dark:bg-[#121212] border border-gray-200/90 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn"
                    style={{ animationDuration: '0.22s' }}
                >
                    {/* Header */}
                    <div className="p-3.5 border-b border-gray-100 dark:border-white/[0.08] flex items-center justify-between bg-white dark:bg-[#121212]">
                        <div className="flex items-center gap-2.5">
                            {/* Circular avatar with green indicator dot at bottom right */}
                            <div className="relative w-9 h-9 shrink-0">
                                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
                                    <img src="/profile-light.png" alt="Giyan" className="w-full h-full object-cover object-top" />
                                </div>
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#121212]" />
                            </div>

                            <div>
                                <h3 className="font-bold text-[14px] leading-tight text-gray-900 dark:text-white">
                                    Chat with Giyan
                                </h3>
                                <p className="text-[9.5px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase mt-0.5">
                                    ONLINE
                                </p>
                            </div>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                            aria-label="Close chat"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Messages scrollable body */}
                    <div
                        ref={messagesRef}
                        className="flex-1 overflow-y-auto hide-scrollbar p-3.5 space-y-3.5 bg-gray-50/50 dark:bg-[#0f0f0f]"
                    >
                        {/* Default Initial Greeting */}
                        {messages.length === 0 && (
                            <div className="flex items-start gap-2">
                                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 shrink-0 mt-1 bg-gray-100 dark:bg-white/5">
                                    <img src="/profile-light.png" alt="Giyan" className="w-full h-full object-cover object-top" />
                                </div>
                                <div className="py-2.5 px-3.5 text-[13.5px] leading-relaxed bg-white dark:bg-[#181818] border border-gray-200/80 dark:border-white/10 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-xs shadow-sm">
                                    Hey! I'm Giyan - feel free to ask about my projects, the stack I work with, or anything else on the site.
                                </div>
                            </div>
                        )}

                        {/* Conversation messages */}
                        {messages.map((msg, idx) => (
                            <ChatBubble
                                key={idx}
                                msg={msg}
                                onRetry={retryLast}
                                isLast={idx === messages.length - 1}
                            />
                        ))}

                        {/* Typing indicator */}
                        {isTyping && <TypingIndicator />}
                    </div>

                    {/* Input bar */}
                    <div className="p-3 border-t border-gray-100 dark:border-white/[0.08] bg-white dark:bg-[#121212]">
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value.slice(0, MAX_CHARS))}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                className="flex-1 bg-white dark:bg-[#181818] border border-gray-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-gray-500 dark:focus:border-white/30 transition-colors"
                                style={{ fontSize: '16px' }}
                                disabled={isTyping}
                            />
                            <button
                                onClick={() => sendMessage(inputVal)}
                                disabled={!inputVal.trim() || isTyping}
                                className="w-9 h-9 rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] disabled:opacity-25 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0 hover:opacity-90 active:scale-95 shadow-sm"
                                aria-label="Send message"
                            >
                                <svg
                                    className="w-4 h-4 translate-x-0.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Toggle Button (Exact RBL Rectangular Button) ── */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex items-center gap-2.5 bg-[#111111] dark:bg-[#1c1c1c] text-white dark:text-white rounded-xl px-4 py-2.5 text-[13.5px] font-bold shadow-lg hover:shadow-xl hover:bg-black dark:hover:bg-[#252525] active:scale-[0.98] transition-all border border-transparent dark:border-white/10"
                aria-label={isOpen ? 'Close chat' : 'Chat with Giyan'}
            >
                {/* Clean speech bubble outline icon */}
                <svg
                    className="w-[18px] h-[18px] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>{isOpen ? 'Close chat' : 'Chat with Giyan'}</span>
            </button>
        </div>
    );
}
