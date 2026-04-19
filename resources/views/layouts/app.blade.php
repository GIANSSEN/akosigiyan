<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Giyan">
    <title>akosigiyan</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script>
        // Check local storage for theme preference
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</head>

<body
    class="bg-[#f5f5f5] text-gray-900 dark:bg-[#0a0a0a] dark:text-[#e5e7eb] antialiased transition-colors duration-300">
    <!-- Global Image Modal -->
    <div id="image-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 opacity-0 transition-opacity duration-300 backdrop-blur-sm">
        <div class="relative max-w-5xl max-h-[90vh] w-full p-4 md:p-10 mx-auto flex items-center justify-center">
            <button id="close-modal" class="absolute top-2 right-2 md:top-6 md:right-6 text-white hover:text-white/70 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-all z-10">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <img id="modal-image" src="" alt="Certificate" class="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain scale-95 transition-transform duration-300 border border-white/10">
        </div>
    </div>

    <!-- Toast Notification Container -->
    <div id="toast-container" class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none"></div>

    @yield('content')

    <script>
        // ─── Image Modal (Certifications) ────────────────────────────────────────────
        document.addEventListener('DOMContentLoaded', () => {
            const imageModal = document.getElementById('image-modal');
            const modalImage = document.getElementById('modal-image');
            const closeModalBtn = document.getElementById('close-modal');

            document.querySelectorAll('.open-modal').forEach(trigger => {
                trigger.addEventListener('click', e => {
                    e.preventDefault(); // Stop from going to another website
                    let src = trigger.getAttribute('href');
                    if(trigger.tagName !== 'A') src = trigger.querySelector('img')?.src;
                    if (!src || src === '#') return;
                    
                    modalImage.src = src;
                    imageModal.classList.remove('hidden');
                    imageModal.classList.add('flex');
                    
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
            window.showToast = function(message) {
                const container = document.getElementById('toast-container');
                if (!container) return;

                const toast = document.createElement('div');
                toast.className = 'bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-2xl font-bold text-sm backdrop-blur-md transform transition-all duration-300 translate-y-full opacity-0 flex items-center gap-2';
                toast.innerHTML = `
                    <svg class="w-5 h-5 text-blue-400 dark:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    ${message}
                `;
                container.appendChild(toast);
                
                requestAnimationFrame(() => toast.classList.remove('translate-y-full', 'opacity-0'));
                setTimeout(() => {
                    toast.classList.add('translate-y-full', 'opacity-0');
                    setTimeout(() => toast.remove(), 300);
                }, 3000);
            };

            document.querySelectorAll('.project-link').forEach(link => {
                link.addEventListener('click', e => {
                    if (link.dataset.isSoon === 'true') {
                        e.preventDefault();
                        link.classList.add('clicked-soon');
                        setTimeout(() => link.classList.remove('clicked-soon'), 1000);
                        window.showToast('This project is currently in development. Link coming soon!');
                    }
                });
            });
        });
    </script>
</body>

</html>