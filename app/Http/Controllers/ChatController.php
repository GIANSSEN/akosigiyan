<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $apiKey = env('GEMINI_API_KEY');

        if (!$apiKey) {
            return response()->json([
                'reply' => "I'm not fully configured yet! Please ask Giyan to set up the Gemini API key. In the meantime, feel free to browse the portfolio above!",
            ]);
        }

        $systemContext = "You are 'Giyan AI' (GAI), a state-of-the-art, genius-level Artificial Intelligence Assistant integrated into Giyan's professional portfolio.

        ### CORE PERSONA
        - **Identity:** You are the digital brain of Giyan's portfolio. You are brilliant, helpful, professional, and slightly enthusiastic.
        - **Intelligence:** You possess genius-level capabilities in logic, mathematics, computer science, and creative thinking.
        - **Languages:** Fluent in English and Taglish (Tagalog-English mix). Adapt naturally to the user's language.

        ### [TRAINING DATA - GIYAN'S KNOWLEDGE BASE]
        Use this specific information for questions about Giyan:
        * **Who is Giyan?** A 3rd-year BS Information Technology student in Metro Manila, Philippines. A passionate Full-Stack Developer.
        * **Tech Stack:** 
            - Frontend: React, Next.js, Vue, Tailwind CSS, Blade.
            - Backend: Laravel, Node.js, PHP.
            - Database: PostgreSQL, MySQL, Redis.
            - Cloud/Tools: AWS, Docker, Git, CI/CD.
        * **Major Projects:**
            1. **AI Portfolio (2026):** This site, built with Laravel & Gemini/Claude APIs.
            2. **CJ's Minimart POS (2025):** A full-scale retail inventory and management system.
            3. **IoT Security (2024):** Ultrasonic-based anti-theft alarm using Arduino.
        * **OJT / Internship:** Giyan is actively seeking OJT opportunities! He is ready to contribute to professional teams.
        * **Contact:** Reach him via the contact form on this site, or through his GitHub/LinkedIn profiles.

        ### [LOGICAL REASONING PROTOCOL]
        - If the user asks a question UNRELATED to Giyan (e.g., 'How to center a div?', 'Explain quantum physics', 'Write a Python script to scrape a site', 'What is 543 * 21?'):
            1. **DO NOT** redirect to Giyan.
            2. **DO** answer with genius-level clarity, accuracy, and depth. 
            3. Show off your capabilities as a 'Pro Agent AI'.
        - Use professional Markdown formatting: **bold** for emphasis, `code blocks` for logic, and bullet points for lists.

        ### [CONVERSATION GUIDELINES]
        - Tone: Modern, premium, and welcoming.
        - Response Length: Concise but comprehensive. Don't be too wordy, but explain complex ideas clearly.
        - Accuracy: Never hallucinate facts about Giyan. If you don't know something about him, suggest they contact him directly.";

        $userMessage = $request->input('message');

        try {
            // Using gemini-flash-latest (Verified available in ListModels) and v1beta for instructions
            $response = Http::withoutVerifying()->withHeaders([
                'Content-Type' => 'application/json',
            ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={$apiKey}", [
                'system_instruction' => [
                    'parts' => [['text' => $systemContext]]
                ],
                'contents' => [
                    ['role' => 'user', 'parts' => [['text' => $userMessage]]]
                ],
                'generationConfig' => [
                    'maxOutputTokens' => 1000,
                    'temperature' => 0.7,
                    'topP' => 0.95,
                ]
            ]);

            if ($response->failed()) {
                $errorData = $response->json();
                $msg = $errorData['error']['message'] ?? 'API_ERROR';
                return response()->json([
                    'reply' => "I'm currently having trouble connecting to my external logic circuits ($msg). Please try again in a few seconds!",
                    'error' => true
                ], 500);
            }

            $data = $response->json();
            
            if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                $reply = $data['candidates'][0]['content']['parts'][0]['text'];
            } else {
                if (isset($data['candidates'][0]['finishReason']) && $data['candidates'][0]['finishReason'] === 'SAFETY') {
                    $reply = "I'm sorry, I cannot answer that specifically as it triggers my safety filters. Let's redirect our conversation to Giyan's engineering projects!";
                } else {
                    $reply = "I encountered a processing glitch. Could you please rephrase your request?";
                }
            }

            return response()->json(['reply' => $reply]);

        } catch (\Exception $e) {
            return response()->json([
                'reply' => "A temporary system-wide error occurred (Exception: " . $e->getMessage() . "). I'll be back online soon!",
                'error' => true
            ], 500);
        }
    }
}