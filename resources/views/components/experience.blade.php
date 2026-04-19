@props(['experience'])

<div class="bento-card h-full">
    <div class="flex items-center gap-2 mb-6">
        <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2"/></svg>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Experience</h2>
    </div>

    <div class="pl-2">
        @foreach($experience as $job)
        <div class="exp-line {{ $loop->first ? 'active' : ($loop->last ? 'completed' : '') }}">
            <div class="flex flex-col mb-1 relative -top-1.5">
                <div class="flex justify-between items-start w-full">
                    <h3 class="text-[13px] font-bold text-gray-900 dark:text-white pr-4">{{ $job['role'] }}</h3>
                    <span class="text-[11px] text-gray-600 dark:text-gray-200 font-bold whitespace-nowrap mt-1 uppercase tracking-wider">{{ $job['period'] }}</span>
                </div>
                <span class="text-[12px] text-gray-800 dark:text-white mt-1 font-bold leading-tight">{{ $job['company'] }}</span>
                <p class="text-[11px] text-gray-700 dark:text-gray-100 mt-1 leading-relaxed font-medium">{{ $job['description'] }}</p>
            </div>
        </div>
        @endforeach
    </div>
</div>
