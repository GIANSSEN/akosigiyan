@props(['stack'])

@php
    $techIcons = [
        'JavaScript' => 'javascript',
        'TypeScript' => 'typescript',
        'React' => 'react',
        'Next.js' => 'nextdotjs',
        'Vue.js' => 'vuedotjs',
        'Tailwind CSS' => 'tailwindcss',
        'PHP' => 'php',
        'Laravel' => 'laravel',
        'Node.js' => 'nodedotjs',
        'Python' => 'python',
        'PostgreSQL' => 'postgresql',
        'MySQL' => 'mysql',
        'AWS' => 'amazonwebservices',
        'Docker' => 'docker',
        'GitHub Actions' => 'githubactions',
        'Linux' => 'linux',
    ];
    // Icons that are inherently black/very-dark and need inversion on dark bg
    $invertInDark = ['Next.js', 'GitHub Actions', 'Linux', 'AWS'];
@endphp

<div class="bento-card h-full">
    <div class="flex items-center gap-2 mb-6">
        <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Tech Stack</h2>
    </div>

    <div class="space-y-6">
        @foreach($stack as $category => $items)
            <div>
                <h3 class="text-[13px] font-bold text-gray-900 dark:text-white mb-2">{{ $category }}</h3>
                <div class="flex flex-wrap gap-2">
                    @foreach($items as $tech)
                        @php
                            $needsInvert = in_array($tech, $invertInDark);
                        @endphp
                        <span class="tech-badge inline-flex items-center gap-1.5 text-[12px] font-bold
                                     px-3 py-1.5 rounded-lg shadow-sm
                                     transition-all duration-200 cursor-default">
                            @if(isset($techIcons[$tech]))
                                <img src="https://cdn.simpleicons.org/{{ $techIcons[$tech] }}" alt="{{ $tech }} icon"
                                    class="w-3.5 h-3.5 tech-icon {{ $needsInvert ? 'needs-invert' : '' }}" />
                            @endif
                            {{ $tech }}
                        </span>
                    @endforeach
                </div>
            </div>
        @endforeach
    </div>
</div>

<style>
    /* Tech Stack badge — works in both light & dark mode without Tailwind rebuild */
    .tech-badge {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        color: #1e293b;
    }

    .tech-badge:hover {
        border-color: #60a5fa;
        background: #f8fafc;
    }

    html.dark .tech-badge {
        background: #242424;
        border: 1px solid #444444;
        color: #ffffff;
    }

    html.dark .tech-badge:hover {
        border-color: #3b82f6;
        background: #2e2e2e;
    }

    /* Invert dark icons (Next.js, GitHub Actions, Linux, AWS) in dark mode */
    html.dark .tech-icon.needs-invert {
        filter: invert(1) brightness(1.5);
    }

    /* Slightly brighten other colored icons in dark mode */
    html.dark .tech-icon:not(.needs-invert) {
        filter: brightness(1.25);
    }
</style>