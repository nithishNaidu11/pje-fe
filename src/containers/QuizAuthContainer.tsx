import { Routes, Route } from 'react-router-dom';

import { QuizLogin, QuizOtpForm } from '@/components/quiz';

export const QuizAuthContainer = () => {
    return (
        <Routes>
            <Route path="login" element={<QuizLogin />} />
            <Route path="otp" element={<QuizOtpForm />} />
        </Routes>
    );
};
