@props(['projects'])

<div class="bento-card h-full flex flex-col">
    <div class="flex items-center gap-2 mb-6">
        <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Recent Projects</h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        @foreach($projects as $index => $project)
            <x-project-card :project="$project" :index="$index" />
        @endforeach
    </div>
</div>
