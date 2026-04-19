@extends('layouts.app')

@section('content')

<div class="max-w-6xl mx-auto px-4 md:px-8 py-10 w-full">

    <!-- 1. Hero Section (Full width, not carded) -->
    <div class="animate-entrance">
        <x-hero />
    </div>

    <!-- 2. Main Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">

        <!-- Left Column: About & Tech Stack -->
        <div class="col-span-1 lg:col-span-7 flex flex-col gap-6">
            <div class="animate-entrance delay-100">
                <x-about />
            </div>
            <div class="animate-entrance delay-200">
                <x-tech-stack :stack="$stack" />
            </div>
        </div>

        <!-- Right Column: Experience -->
        <div class="col-span-1 lg:col-span-5 animate-entrance delay-300">
            <x-experience :experience="$experience" />
        </div>

        <!-- Second Row: Projects & Certifications (Side by side) -->
        <div class="col-span-1 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="animate-entrance delay-400">
                <x-projects :projects="$projects" />
            </div>
            <div class="animate-entrance delay-400">
                <x-certifications :certifications="$certifications" />
            </div>
        </div>

        <!-- Third Row: Goals, Links, Contact -->
        <div class="col-span-1 lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="animate-entrance delay-500">
                <x-goals :goals="$goals" />
            </div>
            <div class="col-span-2 animate-entrance delay-500">
                <x-social-contact />
            </div>
        </div>

        <!-- Fourth Row: Gallery -->
        <div class="col-span-1 lg:col-span-12 animate-entrance delay-500">
            <x-gallery />
        </div>
        
    </div>

    <!-- Copyright -->
    <div class="w-full text-center py-10 text-[12px] font-medium text-gray-500">
        © 2026 Giyan — All rights reserved.
    </div>

</div>

<!-- Chatbot -->
<x-chatbot />

@endsection