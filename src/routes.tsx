import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppContainer, QuizContainer } from 'containers';

const RoutesContainer = () => {
    const renderRoutes = () => {
        return (
            <Routes>
                <>
                    <Route path="abc/*" element={<QuizContainer />} />
                    <Route path="*" element={<AppContainer />} />
                </>
            </Routes>
        );
    };

    return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};

export default RoutesContainer;
