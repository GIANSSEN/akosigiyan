<!-- Hero Section -->
<div class="flex items-center justify-between mb-8">
    <div class="flex items-center gap-6">

        <!-- Profile Picture (JS-powered hover swap) -->
        <div id="profile-wrapper"
            class="relative w-32 h-32 rounded-[1.5rem] bg-gray-100 dark:bg-[#1a1a1a] overflow-hidden shadow-sm shrink-0 ring-4 ring-white dark:ring-[#1a1a1a] cursor-pointer"
            style="transition: transform 0.3s ease;">

            <!-- Light Mode Default Image -->
            <img id="profile-img-light"
                 src="{{ asset('profile-light.png') }}" alt="Giyan"
                 style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; transition: opacity 0.5s ease; opacity: 1; z-index: 1;">

            <!-- Dark Mode Default Image -->
            <img id="profile-img-dark"
                 src="{{ asset('profile-dark.png') }}" alt="Giyan"
                 style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; transition: opacity 0.5s ease; opacity: 0; z-index: 2;">

            <!-- Hover Image (Surprised/Funny) — shown on hover in light mode -->
            <img id="profile-img-hover"
                 src="{{ asset('profile-hover.png') }}" alt="Giyan Surprised"
                 style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: opacity 0.4s ease; opacity: 0; z-index: 3;">

            <!-- Dark Mode Hover Image (Startled/Woken Up) — shown on hover in dark mode -->
            <img id="profile-img-dark-hover"
                 src="{{ asset('profile-dark-hover.png') }}" alt="Giyan Startled"
                 style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top; transition: opacity 0.4s ease; opacity: 0; z-index: 4;">

            <!-- Fallback SVG -->
            <div class="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-700" style="z-index: 0;">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
        </div>

        <!-- Info -->
        <div>
            <div class="flex items-center gap-1.5 mb-1.5">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Gianssen G. Jasolin</h1>
                <!-- Verified Badge (Twitter/X style) -->
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" title="Verified">
                    <path d="M12 2L13.8 5.4L17.6 4.4L17.2 8.2L20.8 9.4L18.6 12.4L20.8 15.4L17.2 16.6L17.6 20.4L13.8 19.4L12 22.8L10.2 19.4L6.4 20.4L6.8 16.6L3.2 15.4L5.4 12.4L3.2 9.4L6.8 8.2L6.4 4.4L10.2 5.4L12 2Z" fill="#1D9BF0"/>
                    <path d="M9.5 12.5L11 14L14.5 10.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="text-[13px] text-gray-700 dark:text-white flex items-center gap-1.5 mb-3 font-semibold">
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Metro Manila, Philippines
            </div>

            <div class="text-[14px] font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                BSIT Student / Aspiring IT Professional
            </div>

            <div class="flex items-center gap-3">
                <a href="#" onclick="event.preventDefault(); window.showToast('My Resume is currently being updated. Coming soon!');"
                    class="bg-[#111111] dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-[13px] font-bold shadow-sm hover:scale-[1.02] transition-transform flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Resume
                </a>
                <a href="mailto:jasolingianssen@gmail.com"
                    class="bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-300 px-4 py-2 rounded-lg text-[13px] font-bold border border-gray-200 dark:border-[#2a2a2a] shadow-sm hover:scale-[1.02] transition-transform flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                </a>
            </div>
        </div>
    </div>

    <!-- Theme Toggle Switch -->
    <div class="self-start">
        <button id="theme-toggle" aria-label="Toggle Dark Mode"
            style="position: relative; width: 56px; height: 30px; border-radius: 999px; border: 1.5px solid #d1d5db; background: #f3f4f6; outline: none; cursor: pointer; transition: background 0.4s, border-color 0.4s; flex-shrink: 0; display: flex; align-items: center;">

            <!-- Sun icon (left) -->
            <span style="position: absolute; left: 8px; top: 50%; transform: translateY(-50%); pointer-events: none; display: flex; align-items: center; justify-content: center; width: 14px; height: 14px;">
                <svg id="toggle-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: opacity 0.3s;">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            </span>

            <!-- Moon icon (right) -->
            <span style="position: absolute; right: 7px; top: 50%; transform: translateY(-50%); pointer-events: none; display: flex; align-items: center;">
                <svg id="toggle-moon" width="12" height="12" viewBox="0 0 20 20" fill="#4b5563" style="transition: opacity 0.3s;">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
            </span>

            <!-- Sliding Handle -->
            <div id="theme-handle"
                style="position: absolute; top: 50%; transform: translateY(-50%) translateX(2px); width: 22px; height: 22px; border-radius: 999px; background: white; box-shadow: 0 1px 4px rgba(0,0,0,0.3); transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); z-index: 10;">
            </div>
        </button>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const profileWrapper  = document.getElementById('profile-wrapper');
    const imgLight        = document.getElementById('profile-img-light');
    const imgDark         = document.getElementById('profile-img-dark');
    const imgHover        = document.getElementById('profile-img-hover');
    const imgDarkHover    = document.getElementById('profile-img-dark-hover');
    const handle          = document.getElementById('theme-handle');
    const sunIcon         = document.getElementById('toggle-sun');
    const moonIcon        = document.getElementById('toggle-moon');
    const toggleBtn       = document.getElementById('theme-toggle');

    function isDark() {
        return document.documentElement.classList.contains('dark');
    }

    // ─── Set correct default images for current mode ───────────────────────
    function syncProfile() {
        // Hide all hover images first
        imgHover.style.opacity     = '0';
        imgDarkHover.style.opacity = '0';
        if (isDark()) {
            imgLight.style.opacity = '0';
            imgDark.style.opacity  = '1';
        } else {
            imgLight.style.opacity = '1';
            imgDark.style.opacity  = '0';
        }
    }

    // ─── Toggle button visual state ────────────────────────────────────────
    function syncToggle() {
        if (isDark()) {
            toggleBtn.style.background   = '#1e293b';
            toggleBtn.style.borderColor  = '#334155';
            handle.style.transform       = 'translateY(-50%) translateX(28px)';
            handle.style.background      = '#334155';
            sunIcon.style.opacity        = '1';
            moonIcon.style.opacity       = '0.3';
        } else {
            toggleBtn.style.background   = '#f3f4f6';
            toggleBtn.style.borderColor  = '#d1d5db';
            handle.style.transform       = 'translateY(-50%) translateX(2px)';
            handle.style.background      = 'white';
            sunIcon.style.opacity        = '0.4';
            moonIcon.style.opacity       = '1';
        }
    }

    // ─── Profile hover swap ────────────────────────────────────────────────
    profileWrapper.addEventListener('mouseenter', function () {
        profileWrapper.style.transform = 'scale(1.04)';

        if (isDark()) {
            // Dark mode hover → show startled/woken-up image
            imgLight.style.opacity     = '0';
            imgDark.style.opacity      = '0';
            imgHover.style.opacity     = '0';
            imgDarkHover.style.opacity = '1';
        } else {
            // Light mode hover → show funny/surprised image
            imgLight.style.opacity     = '0';
            imgDark.style.opacity      = '0';
            imgDarkHover.style.opacity = '0';
            imgHover.style.opacity     = '1';
        }
    });

    profileWrapper.addEventListener('mouseleave', function () {
        profileWrapper.style.transform = 'scale(1)';
        syncProfile(); // Restore correct default for current mode
    });

    // ─── Watch for dark/light class changes (driven by app.js) ────────────
    const observer = new MutationObserver(function () {
        syncToggle();
        syncProfile();
    });
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    // ─── Initial state sync ────────────────────────────────────────────────
    syncProfile();
    syncToggle();
});
</script>