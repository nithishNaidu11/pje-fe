import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppContainer, QuizContainer } from 'containers';

const RoutesContainer = () => {
    const renderRoutes = () => {
        return (
            <Routes>
                <>
                    {/* <Route path="*" element={<Navigate to="/" replace />} />
                    <Route
                        path="/"
                        element={<PreJoiningEngagementContainer />}
                    /> */}
                    <Route path="quiz/*" element={<QuizContainer />} />
                    <Route path="*" element={<AppContainer />} />
                </>
            </Routes>
        );
    };

    return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};

export default RoutesContainer;
