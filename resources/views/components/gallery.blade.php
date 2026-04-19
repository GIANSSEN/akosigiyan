<div class="bento-card">
    <div class="flex items-center gap-2 mb-6">
        <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Gallery</h2>
    </div>
    
    <!-- Gallery Row -->
    <!-- Scrolling Gallery -->
    <div class="scrolling-wrapper">
        <div class="scrolling-track">
            @for($i = 1; $i <= 8; $i++)
            <div class="h-[300px] w-[225px] flex-shrink-0 bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl overflow-hidden gallery-item shadow-sm">
                <img src="{{ asset('gallery/item-' . $i . '.jpg') }}" alt="Gallery {{ $i }}" class="h-full w-full object-cover">
            </div>
            @endfor
            <!-- Duplicate for seamless loop -->
            @for($i = 1; $i <= 8; $i++)
            <div class="h-[300px] w-[225px] flex-shrink-0 bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl overflow-hidden gallery-item shadow-sm">
                <img src="{{ asset('gallery/item-' . $i . '.jpg') }}" alt="Gallery {{ $i }}" class="h-full w-full object-cover">
            </div>
            @endfor
        </div>
    </div>
</div>
