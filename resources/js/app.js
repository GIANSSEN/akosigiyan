import './bootstrap';

// ─── Theme Toggle Logic ──────────────────────────────────────────────────────
const themeToggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

// The initial state is set inline in app.blade.php to prevent flicker.
// Now we just handle the button click.
themeToggleBtn?.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});


// ─── Chatbot ─────────────────────────────────────────────────────────────────
const chatWindow   = document.getElementById('chatbot-window');
const chatToggle   = document.getElementById('chatbot-toggle');
const chatClose    = document.getElementById('chatbot-close');
const chatInput    = document.getElementById('chat-input');
const chatSend     = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

let isOpen = false;

function openChat() {
    isOpen = true;
    chatWindow.style.display = 'flex';
    // We don't hide the main button anymore in this design, we just show the window above it.
    chatInput.focus();
}

function closeChat() {
    isOpen = false;
    chatWindow.style.display = 'none';
}

function toggleChat() {
    isOpen ? closeChat() : openChat();
}

chatToggle?.addEventListener('click', toggleChat);
chatClose?.addEventListener('click', closeChat);
document.getElementById('chat-toggle-hero')?.addEventListener('click', openChat);
document.getElementById('chat-toggle-footer')?.addEventListener('click', openChat);

function appendMessage(text, role) {
    const div = document.createElement('div');
    // Using inline styles/classes based on our app.css
    div.classList.add(role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai');
    div.style.marginLeft  = role === 'user' ? 'auto' : '0';
    div.style.marginRight = role === 'user' ? '0' : 'auto';
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    const div = document.createElement('div');
    div.id = 'typing-indicator';
    div.classList.add('chat-bubble-ai');
    div.style.marginLeft = '0';
    div.style.marginRight = 'auto';
    div.innerHTML = `<div style="display:flex;gap:4px;align-items:center;padding:2px 0">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
    </div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
    document.getElementById('typing-indicator')?.remove();
}

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage(message, 'user');
    chatInput.value = '';
    chatSend.disabled = true;

    showTyping();

    try {
        const res = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            },
            body: JSON.stringify({ message }),
        });

        const data = await res.json();
        removeTyping();
        appendMessage(data.reply || 'Sorry, something went wrong.', 'ai');
    } catch (err) {
        removeTyping();
        appendMessage('Connection error. Please try again.', 'ai');
    } finally {
        chatSend.disabled = false;
        chatInput.focus();
    }
}

chatSend?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});


// ─── Recommendations carousel ─────────────────────────────────────────────────
const slides = document.querySelectorAll('.rec-slide');
const dots   = document.querySelectorAll('.rec-dot');
let current  = 0;

function goToSlide(n) {
    slides[current]?.classList.remove('active');
    // Using standard Tailwind classes for dot UI swapping
    dots[current]?.classList.remove('bg-black', 'dark:bg-white', 'w-2.5');
    dots[current]?.classList.add('bg-gray-300', 'dark:bg-[#2a2a2a]');

    current = (n + slides.length) % slides.length;

    slides[current]?.classList.add('active');
    dots[current]?.classList.add('bg-black', 'dark:bg-white', 'w-2.5');
    dots[current]?.classList.remove('bg-gray-300', 'dark:bg-[#2a2a2a]');
}

// Click dots
dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

// Auto-advance
if (slides.length > 0) setInterval(() => goToSlide(current + 1), 6000);

// ─── Image Modal (Certifications) ────────────────────────────────────────────
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModalBtn = document.getElementById('close-modal');

document.querySelectorAll('.open-modal').forEach(trigger => {
    trigger.addEventListener('click', e => {
        e.preventDefault();
        const src = trigger.getAttribute('href') || trigger.dataset.src;
        if (!src || src === '#') return;
        
        modalImage.src = src;
        imageModal.classList.remove('hidden');
        imageModal.classList.add('flex');
        
        // Slight delay for transition entry
        requestAnimationFrame(() => {
            imageModal.classList.remove('opacity-0');
            modalImage.classList.remove('scale-95');
            modalImage.classList.add('scale-100');
        });
    });
});

function closeImageModal() {
    if(!imageModal) return;
    imageModal.classList.add('opacity-0');
    modalImage.classList.remove('scale-100');
    modalImage.classList.add('scale-95');
    
    setTimeout(() => {
        imageModal.classList.add('hidden');
        imageModal.classList.remove('flex');
        modalImage.src = '';
    }, 300);
}

closeModalBtn?.addEventListener('click', closeImageModal);
imageModal?.addEventListener('click', e => {
    if (e.target === imageModal) closeImageModal(); 
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && imageModal && !imageModal.classList.contains('hidden')) {
        closeImageModal();
    }
});

// ─── Toast Notifications (Coming Soon) ───────────────────────────────────────
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-2xl font-bold text-sm backdrop-blur-md transform transition-all duration-300 translate-y-full opacity-0 flex items-center gap-2';
    toast.innerHTML = `
        <svg class="w-5 h-5 text-blue-400 dark:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        ${message}
    `;
    
    container.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-full', 'opacity-0');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-y-full', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Hook into project links that are "Soon"
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', e => {
        if (link.dataset.isSoon === 'true') {
            e.preventDefault();
            
            // Add a temporary click effect class
            link.classList.add('clicked-soon');
            setTimeout(() => link.classList.remove('clicked-soon'), 1000);
            
            showToast('This project is currently in development. Link coming soon!');
        }
    });
});
