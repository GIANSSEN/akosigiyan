@props(['certifications'])

<div class="bento-card h-full flex flex-col">
    <div class="flex items-center gap-2 mb-6">
        <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Recent Certifications</h2>
    </div>

    <div class="flex flex-col gap-4 flex-1">
        @foreach($certifications as $cert)
        <div class="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#2a2a2a] hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-300 flex flex-col p-3">
            
            {{-- Image Preview (Clickable for Modal) --}}
            <div class="w-full flex justify-center mb-3">
                <a href="{{ $cert['image'] }}" class="open-modal w-3/4 aspect-[4/3] sm:aspect-video rounded-lg overflow-hidden relative shadow-sm border border-gray-200 dark:border-gray-700 bg-white group/img cursor-pointer block">
                    <img src="{{ $cert['image'] }}" alt="{{ $cert['name'] }}" class="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 border border-transparent">
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                        <div class="bg-black/70 text-white rounded-full p-3 shadow-2xl transform scale-90 group-hover/img:scale-100 transition-all duration-300">
                           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                        </div>
                    </div>
                </a>
            </div>

            {{-- Text Content (Not Clickable) --}}
            <div class="flex-1 min-w-0 px-2 pb-1 text-center flex flex-col items-center justify-center">
                <div class="text-[13px] font-bold text-gray-900 dark:text-white leading-snug mb-1.5">{{ $cert['name'] }}</div>
                <div class="text-[11px] text-gray-500 dark:text-gray-400 flex flex-wrap items-center justify-center gap-1.5">
                    <span class="font-medium text-blue-600 dark:text-blue-400">{{ $cert['issuer'] }}</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    <span>{{ $cert['date'] }}</span>
                </div>
            </div>

        </div>
        @endforeach
    </div>
</div>
