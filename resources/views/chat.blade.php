@extends('layouts.app')

@section('content')
<div class="max-w-3xl mx-auto px-6 py-12">
    <div class="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 overflow-hidden border border-slate-100">
        <div class="p-8 border-b border-slate-50 flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-black text-slate-800">Chat with Giyan AI</h2>
                <p class="text-slate-400 text-sm font-medium">Online & Powered by Gemini</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-black">AI</div>
        </div>

        <div id="chat-box" class="h-[500px] overflow-y-auto p-8 space-y-6 bg-slate-50/50">
            <div class="flex justify-start">
                <div class="bg-white border border-slate-100 p-5 rounded-3xl rounded-tl-none shadow-sm max-w-[80%] text-slate-700 leading-relaxed">
                    Kumusta! I'm Giyan's AI assistant. Ask me about his projects, skills, or even his inspiration from Bryl Lim!
                </div>
            </div>
        </div>

        <div class="p-6 bg-white border-t border-slate-50">
            <div class="relative flex items-center">
                <input id="user-input" type="text" class="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500 font-medium" placeholder="Ask me something...">
                <button onclick="sendMessage()" class="absolute right-2 bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-all">Send</button>
            </div>
        </div>
    </div>
</div>

<script>
    async function sendMessage() {
        const input = document.getElementById('user-input');
        const box = document.getElementById('chat-box');
        if(!input.value.trim()) return;

        const msg = input.value;
        box.innerHTML += `<div class="flex justify-end"><div class="bg-blue-600 text-white p-5 rounded-3xl rounded-tr-none shadow-lg max-w-[80%] font-medium">${msg}</div></div>`;
        input.value = '';
        box.scrollTop = box.scrollHeight;

        try {
            const res = await axios.post('/chat', { prompt: msg });
            box.innerHTML += `<div class="flex justify-start"><div class="bg-white border border-slate-100 p-5 rounded-3xl rounded-tl-none shadow-sm max-w-[80%] text-slate-700 leading-relaxed">${res.data.answer}</div></div>`;
        } catch (e) {
            box.innerHTML += `<div class="text-center text-red-400 text-xs font-bold">Connection lost. Check your API key in .env.</div>`;
        }
        box.scrollTop = box.scrollHeight;
    }
</script>
@endsection