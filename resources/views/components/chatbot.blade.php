<!-- Chatbot Floating Widget -->
<div id="chatbot-container" class="fixed z-[60] flex flex-col items-end pointer-events-none font-sans" style="bottom: 24px; right: 24px; gap: 12px;">

    <!-- Chat Window -->
    <div id="chatbot-window"
         class="flex flex-col bg-white overflow-hidden pointer-events-auto absolute right-0 transition-all duration-300 opacity-0 invisible group/window"
         style="width: 380px; height: 600px; max-width: calc(100vw - 2rem); max-height: calc(100vh - 6rem); bottom: 65px; border: 1px solid #e5e7eb; box-shadow: 0 10px 40px rgba(0,0,0,0.1); border-radius: 6px; z-index: 50;">

        <!-- Clean Header -->
        <div class="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100 shrink-0">
            <div class="flex items-center gap-3">
                <!-- Square Profile Picture -->
                <div style="width: 42px; height: 42px; border-radius: 4px; overflow: hidden; border: 1px solid #f3f4f6; flex-shrink: 0;">
                    <img src="{{ asset('profile.png') }}" alt="Giyan" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="flex flex-col justify-center">
                    <h3 class="text-gray-900 text-[17px] font-bold leading-tight m-0 p-0">Chat with Giyan</h3>
                    <div class="flex items-center mt-1" style="gap: 6px;">
                        <span style="width: 8px; height: 8px; background-color: #22c55e; display: inline-block;"></span>
                        <span class="text-gray-800 text-[13px] leading-none">Online</span>
                    </div>
                </div>
            </div>
            <button id="chatbot-close" title="Close" class="text-gray-500 hover:text-black transition-colors focus:outline-none p-1">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>

        <!-- Messages Area -->
        <div id="chat-messages" class="flex-1 overflow-y-auto px-5 py-6 flex flex-col bg-white scroll-smooth" style="gap: 20px;">
            
            <!-- AI Initial Message Wrapper -->
            <div class="chat-message-ai flex flex-col items-start max-w-[85%]">
                <!-- Avatar and Name above bubble -->
                <div class="flex items-center gap-2 mb-2 px-1">
                    <div style="width: 24px; height: 24px; border-radius: 3px; overflow: hidden; flex-shrink: 0;">
                        <img src="{{ asset('profile.png') }}" alt="Giyan" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <span class="text-gray-900 text-[14px] font-medium">Giyan</span>
                </div>
                
                <!-- Bubble with Triangle Tail -->
                <div class="bubble-ai relative bg-[#f4f4f5] text-gray-900 px-4 py-3 rounded-[4px] text-[15px] line-height-[1.5] ml-[10px]">
                    Hi there! 👋 Thanks for visiting my website. Feel free to ask me anything about programming, web development, or my experiences in tech. Let me know how I can help!
                </div>
            </div>

            <!-- Suggestion Grid (Restored for convenience) -->
            <div id="suggested-questions" class="flex flex-col gap-2 mt-2 transition-opacity duration-300 ml-[10px]" style="max-width: 85%;">
                 @php
                    $suggestions = [
                        'Who is Giyan?',
                        'What is your tech stack?',
                        'Tell me about your experience.',
                    ];
                @endphp
                @foreach($suggestions as $suggest)
                <button class="suggestion-btn text-left text-[14px] text-blue-600 hover:text-blue-800 transition-colors py-1 focus:outline-none bg-transparent border-none p-0 cursor-pointer">
                    → {{ $suggest }}
                </button>
                @endforeach
            </div>

        </div>

        <!-- Input Area Footer -->
        <div class="bg-white border-t border-[#f3f4f6]" style="padding: 16px 20px;">
            <div class="flex items-center gap-3">
                <input id="chat-input"
                       type="text"
                       placeholder="Type a message..."
                       autocomplete="off"
                       maxlength="1000"
                       style="flex-grow: 1; border: 1px solid #e5e7eb; padding: 12px 14px; font-size: 15px; border-radius: 4px; outline: none; background: white; color: #111827;">
                
                <button id="chat-send"
                        disabled
                        style="width: 46px; height: 46px; background-color: #888; color: white; border: none; border-radius: 4px; display: flex; align-items: center; justify-center; cursor: pointer; flex-shrink: 0; transition: background-color 0.2s;">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                </button>
            </div>
            <div class="flex justify-between items-center mt-2.5 text-[13px] text-gray-900">
                <span>Ask me about programming, web dev, or tech!</span>
                <span id="char-count">0/1000</span>
            </div>
        </div>
    </div>

    <!-- Floating Toggle Button (Simple Minimal Toggle) -->
    <button id="chatbot-toggle"
            class="pointer-events-auto transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
            style="background-color: #111; color: white; border: none; border-radius: 6px; padding: 12px 20px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; letter-spacing: 0.2px;">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        Chat with Giyan
    </button>
</div>

<style>
/* Minimal scrollbar */
#chat-messages::-webkit-scrollbar {
    width: 6px;
}
#chat-messages::-webkit-scrollbar-track {
    background: transparent;
}
#chat-messages::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 10px;
}
#chat-messages::-webkit-scrollbar-thumb:hover {
    background-color: #9ca3af;
}

/* AI Message Bubble Triangle Tail */
.bubble-ai::after {
    content: '';
    position: absolute;
    left: -6px;
    top: 12px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid #f4f4f5;
}

/* User chat bubble styles */
.chat-message-user {
    align-self: flex-end;
    background-color: #cbd5e1; /* Light gray/blue per screenshot feel */
    color: #111827;
    padding: 12px 16px;
    border-radius: 4px;
    font-size: 15px;
    line-height: 1.5;
    max-width: 85%;
    position: relative;
    margin-right: 10px;
    margin-top: 8px;
    animation: fadeIn 0.3s ease-out;
}
.chat-message-user::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 12px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid #cbd5e1;
}

/* AI Message Wrapper */
.chat-message-ai {
    animation: fadeIn 0.3s ease-out;
}

/* Send Button States */
#chat-send:disabled {
    background-color: #e5e7eb !important;
    color: #9ca3af !important;
    cursor: not-allowed;
}
#chat-send:not(:disabled):hover {
    background-color: #555 !important;
}

/* Input Focus */
#chat-input:focus {
    border-color: #9ca3af !important;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Mobile responsive */
@media (max-width: 640px) {
    #chatbot-window {
        bottom: 0 !important;
        right: 0 !important;
        width: 100vw !important;
        height: 100svh !important;
        max-height: 100svh !important;
        border-radius: 0 !important;
        border: none !important;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const windowEl = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const inputEl = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messagesEl = document.getElementById('chat-messages');
    const suggestionsEl = document.getElementById('suggested-questions');
    const charCount = document.getElementById('char-count');

    function validateInput() {
        const val = inputEl.value.trim();
        const len = inputEl.value.length;
        charCount.textContent = `${len}/1000`;
        charCount.style.color = len >= 990 ? '#ef4444' : '#111';
        sendBtn.disabled = val.length === 0;
    }

    inputEl.addEventListener('input', validateInput);

    function toggleChat() {
        const isClosed = windowEl.classList.contains('invisible');
        if (isClosed) {
            windowEl.classList.remove('invisible', 'opacity-0');
            setTimeout(() => inputEl.focus(), 300);
            scrollToBottom();
        } else {
            windowEl.classList.add('invisible', 'opacity-0');
        }
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Handle Quick Suggestions
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.innerText.replace('→', '').trim();
            if(suggestionsEl) {
                suggestionsEl.style.opacity = '0';
                setTimeout(() => suggestionsEl.style.display = 'none', 300);
            }
            sendMessage(text);
        });
    });

    // Message Sending Logic (Keep Gemini Integration)
    async function sendMessage(text) {
        if (!text) return;

        appendMessage(text, 'user');
        inputEl.value = '';
        validateInput();
        inputEl.disabled = true;

        if (suggestionsEl && suggestionsEl.style.display !== 'none') {
            suggestionsEl.style.opacity = '0';
            setTimeout(() => suggestionsEl.style.display = 'none', 300);
        }

        // Typing Indicator
        const loadingId = 'loading-' + Date.now();
        const loadingHtml = `
        <div id="${loadingId}" class="chat-message-ai flex flex-col items-start max-w-[85%]">
            <div class="flex items-center gap-2 mb-2 px-1">
                <div style="width: 24px; height: 24px; border-radius: 3px; overflow: hidden; flex-shrink: 0;">
                    <img src="{{ asset('profile.png') }}" alt="Giyan" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <span class="text-gray-900 text-[14px] font-medium">Giyan</span>
            </div>
            <div class="bubble-ai relative bg-[#f4f4f5] text-gray-500 px-4 py-3 rounded-[4px] text-[14px] ml-[10px]">
                Typing...
            </div>
        </div>`;
        
        messagesEl.insertAdjacentHTML('beforeend', loadingHtml);
        scrollToBottom();

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();
            document.getElementById(loadingId)?.remove();

            if (response.ok) {
                appendMessage(data.reply, 'ai');
            } else {
                appendMessage(data.reply || "Something went wrong on our end.", 'ai');
            }

        } catch (error) {
            console.error(error);
            document.getElementById(loadingId)?.remove();
            appendMessage('Connection to the server failed.', 'ai');
        } finally {
            inputEl.disabled = false;
            inputEl.focus();
        }
    }

    function appendMessage(text, role) {
        let html = '';
        if (role === 'ai') {
            html = `
            <div class="chat-message-ai flex flex-col items-start max-w-[85%]">
                <div class="flex items-center gap-2 mb-2 px-1">
                    <div style="width: 24px; height: 24px; border-radius: 3px; overflow: hidden; flex-shrink: 0;">
                        <img src="{{ asset('profile.png') }}" alt="Giyan" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <span class="text-gray-900 text-[14px] font-medium">Giyan</span>
                </div>
                <div class="bubble-ai relative bg-[#f4f4f5] text-gray-900 px-4 py-3 rounded-[4px] text-[15px] leading-relaxed ml-[10px]">
                    ${text.replace(/\n/g, '<br>')}
                </div>
            </div>`;
        } else {
            html = `
            <div class="chat-message-user">
                ${text}
            </div>`;
        }
        messagesEl.insertAdjacentHTML('beforeend', html);
        scrollToBottom();
    }

    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    sendBtn.addEventListener('click', () => sendMessage(inputEl.value.trim()));
    inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !sendBtn.disabled) {
            e.preventDefault();
            sendMessage(inputEl.value.trim());
        }
    });
});
</script>
