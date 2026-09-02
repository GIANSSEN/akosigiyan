import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/components/ui/Toast';
import ClickSpark from '@/components/ui/ClickSpark';
import Chatbot from '@/components/chatbot/Chatbot';
import HomePage from '@/pages/HomePage';
import ResumePage from '@/pages/ResumePage';

export default function App() {
    return (
        <ThemeProvider>


            <ToastProvider>
                <BrowserRouter>
                    <ClickSpark>
                        <Routes>
                            <Route path="/"       element={<HomePage />} />
                            <Route path="/resume" element={<ResumePage />} />
                            <Route path="*"       element={<Navigate to="/" replace />} />
                        </Routes>
                        <Chatbot />
                    </ClickSpark>
                </BrowserRouter>
            </ToastProvider>
        </ThemeProvider>
    );
}
