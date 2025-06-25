import { Routes, Route } from 'react-router-dom';

import { QuizAuthContainer } from 'containers';
import {
    QuizQuestionView,
    QuizResultView,
    QuizVideoPlayer,
    QuizWelcomeView
} from 'components/quiz';

export const QuizContainer = () => {
    return (
        <Routes>
            <Route path="auth/*" element={<QuizAuthContainer />} />
            <Route
                path="welcome/:preJoiningLeadId"
                element={<QuizWelcomeView />}
            />
            <Route path=":quizId" element={<QuizQuestionView />} />
            <Route path=":quizId/result" element={<QuizResultView />} />
            <Route path="video/:videoCode" element={<QuizVideoPlayer />} />
        </Routes>
    );
};
