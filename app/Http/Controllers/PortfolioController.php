<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index()
    {
        $stack = [
            'Frontend' => ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS'],
            'Backend'  => ['PHP', 'Laravel', 'Node.js', 'Python', 'PostgreSQL', 'MySQL'],
            'DevOps & Cloud' => ['AWS', 'Docker', 'GitHub Actions', 'Linux'],
        ];

        $projects = [
            [
                'title'       => "CJ's Minimart POS System",
                'description' => 'A comprehensive retail management and POS system featuring real-time inventory tracking, bulk stock handling, and automated reporting.',
                'url'         => 'github.com/Gianssen/Minimart',
                'link'        => 'https://github.com/Gianssen/Minimart',
                'image'       => 'projects/cj-minimart.png',
            ],
            [
                'title'       => 'Weather Globe App',
                'description' => 'A fully responsive and interactive 7-day weather forecast application deployed on Vercel.',
                'url'         => 'weather-globe-app.vercel.app',
                'link'        => 'https://weather-globe-app.vercel.app/?_vercel_share=ChNJ7A3uJvSAGPZUnk1Zz2ibCaSkprGm',
                'image'       => 'projects/weather-pulse.png',
            ],
            [
                'title'       => 'AI-Powered Chatbot',
                'description' => 'Gemini-integrated chatbot assistant for portfolio websites with context-aware responses.',
                'url'         => 'github.com/akosigiyan',
                'link'        => '#',
            ],
            [
                'title'       => 'E-Commerce Platform',
                'description' => 'Full-stack e-commerce solution with React frontend and Laravel backend API.',
                'url'         => 'github.com/akosigiyan',
                'link'        => '#',
            ],
        ];

        $experience = [
            [
                'role'        => 'AI Orchestrator & Vibe Coder',
                'company'     => 'Personal Developer Portfolio',
                'period'      => '2026',
                'description' => 'Built a high-performance portfolio by orchestrating Claude Code and Gemini 2.5 to translate Figma designs into a Laravel 12 + TypeScript environment.',
            ],
            [
                'role'        => 'Lead Full-Stack Developer',
                'company'     => "CJ's Minimart Inventory System",
                'period'      => '2025',
                'description' => 'Engineered an automated retail management and POS system featuring real-time stock tracking, built with Laravel and MySQL.',
            ],
            [
                'role'        => 'IoT & Mobile Systems Prototyping',
                'company'     => 'Anti-Thief Security Alarm',
                'period'      => '2024',
                'description' => 'Designed a hardware-software prototype using Arduino Uno and ultrasonic sensors. Explored mobile integration concepts using React Native for real-time security alerts.',
            ],
            [
                'role'        => 'BS Information Technology',
                'company'     => 'University Milestone',
                'period'      => '2023',
                'description' => 'Deepened specialization in Web Development and Software Engineering, mastering modern JavaScript frameworks like React.',
            ],
            [
                'role'        => 'The Foundation (Hello World!)',
                'company'     => 'First Programming Language',
                'period'      => '2022',
                'description' => 'Started my journey with VB.NET, developing a strong foundation in desktop application logic and structural programming.',
            ],
        ];

        $certifications = [
            [
                'name' => 'Responsive Web Design & Javascript Developer',
                'issuer' => 'CodeCamp Learning',
                'image' => asset('certifications/codecamp.jpg'),
                'date' => 'Oct 2026',
            ],
            [
                'name' => 'Problem Solving (Basic)',
                'issuer' => 'HackerRank',
                'image' => asset('certifications/hackerrank.png'),
                'date' => 'Apr 2026',
            ]
        ];

        $recommendations = [
            [
                'text'  => 'Giyan is a highly skilled software engineer who consistently delivers quality code. His dedication to learning new technologies makes him an asset to any team.',
                'name'  => 'John Dela Cruz',
                'title' => 'Senior Developer at TechCorp',
            ]
        ];

        $goals = [
            'Grow and build a strong career in IT through continuous learning and hands-on experience.',
            'Improve my skills in software development and contribute to real-world impactful projects.'
        ];

        return view('welcome', compact(
            'stack',
            'projects',
            'experience',
            'certifications',
            'recommendations',
            'goals'
        ));
    }
}