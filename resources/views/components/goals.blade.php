@props(['goals'])

<div class="bento-card h-full flex flex-col">
    <div class="flex items-center gap-2 mb-6">
        <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Goals</h2>
    </div>

    <div class="flex flex-col gap-3 flex-1">
        @foreach($goals as $goal)
        <div class="bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-lg p-3">
            <p class="text-gray-600 dark:text-gray-400 text-[12px] leading-relaxed font-medium">
                {{ $goal }}
            </p>
        </div>
        @endforeach
    </div>
</div>
