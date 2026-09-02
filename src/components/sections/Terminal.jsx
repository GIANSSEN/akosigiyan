import { useState, useRef, useEffect, useCallback } from 'react';
import TiltCard from '@/components/ui/TiltCard';
import { terminalCommands } from '@/data/portfolioData';

const ASCII_ART = `
 ██████╗ ██╗ █████╗ ███╗   ██╗
██╔════╝ ██║██╔══██╗████╗  ██║
██║  ███╗██║███████║██╔██╗ ██║
██║   ██║██║██╔══██║██║╚██╗██║
╚██████╔╝██║██║  ██║██║ ╚████║
 ╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝`.trim();

const BOOT_LINES = [
    { text: 'Booting GIAN-OS v2.0.26 ...', cls: 'accent', delay: 100 },
    { text: 'Loading kernel modules ......... OK', cls: 'success', delay: 400 },
    { text: 'Mounting filesystems ........... OK', cls: 'success', delay: 700 },
    { text: 'Starting network services ...... OK', cls: 'success', delay: 1000 },
    { text: 'Authenticating user: giyan ..... OK', cls: 'success', delay: 1300 },
    { text: '', cls: 'output', delay: 1600 },
    { text: "Type 'help' to see available commands.", cls: 'output', delay: 1700 },
    { text: '', cls: 'output', delay: 1800 },
];

export default function Terminal() {
    const [lines, setLines] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const [history, setHistory] = useState([]);
    const [histIdx, setHistIdx] = useState(-1);
    const [showAscii, setShowAscii] = useState(false);
    const bodyRef  = useRef(null);
    const inputRef = useRef(null);
    const booted   = useRef(false);
    const timersRef = useRef([]);

    const scrollToBottom = useCallback(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, []);

    const addLines = useCallback((newLines) => {
        setLines(prev => [...prev, ...newLines]);
        setTimeout(scrollToBottom, 0);
    }, [scrollToBottom]);

    // Boot sequence
    useEffect(() => {
        if (booted.current) return;
        booted.current = true;

        const timers = timersRef.current;
        const later = (fn, delay) => { const id = setTimeout(fn, delay); timers.push(id); };

        later(() => setShowAscii(true), 50);

        BOOT_LINES.forEach(({ text, cls, delay }) => {
            later(() => {
                setLines(prev => [...prev, { text, cls }]);
                setTimeout(scrollToBottom, 0);
            }, delay);
        });

        return () => { timers.forEach(clearTimeout); timers.length = 0; };
    }, [scrollToBottom]);

    const runCommand = useCallback((raw) => {
        const cmd = raw.trim().toLowerCase();
        if (!cmd) return;

        // Echo the command
        addLines([{ text: `giyan@portfolio:~$ ${raw}`, cls: 'prompt' }]);

        if (cmd === 'clear') {
            setLines([]);
            return;
        }

        const output = terminalCommands[cmd];
        if (output) {
            addLines(output);
        } else {
            addLines([
                { text: `Command not found: ${cmd}`, cls: 'error' },
                { text: "Type 'help' to see available commands.", cls: 'output' },
            ]);
        }
    }, [addLines]);

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            const val = inputVal;
            setHistory(prev => val ? [val, ...prev.slice(0, 49)] : prev);
            setHistIdx(-1);
            setInputVal('');
            runCommand(val);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const newIdx = Math.min(histIdx + 1, history.length - 1);
            setHistIdx(newIdx);
            setInputVal(history[newIdx] ?? '');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const newIdx = Math.max(histIdx - 1, -1);
            setHistIdx(newIdx);
            setInputVal(newIdx === -1 ? '' : history[newIdx] ?? '');
        }
    }

    function focusInput() { inputRef.current?.focus(); }

    return (
        <TiltCard>
            <div className="terminal-card h-full" onClick={focusInput}>
                {/* Title bar */}
                <div className="terminal-titlebar">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                    <span className="terminal-title">gian@portfolio:~</span>
                </div>

                {/* ASCII Banner */}
                <div className="px-4 pt-3">
                    <pre
                        className="terminal-ascii"
                        style={{ opacity: showAscii ? 1 : 0 }}
                    >
                        {ASCII_ART}
                    </pre>
                </div>

                {/* Output body */}
                <div className="terminal-body" ref={bodyRef}>
                    {lines.map((line, i) => (
                        <div key={i} className={`terminal-line ${line.cls}`}>
                            {line.href ? (
                                <a
                                    href={line.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {line.text}
                                </a>
                            ) : (
                                line.text || '\u00A0'
                            )}
                        </div>
                    ))}
                </div>

                {/* Input row */}
                <div className="terminal-input-row">
                    <span className="terminal-prompt-sym">giyan@portfolio:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="terminal-input"
                        placeholder="type 'help'..."
                        value={inputVal}
                        onChange={e => setInputVal(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        spellCheck="false"
                        autoCorrect="off"
                        autoCapitalize="off"
                    />
                    <span className="terminal-cursor" />
                </div>
            </div>
        </TiltCard>
    );
}
