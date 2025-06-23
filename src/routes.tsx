import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AppContainer } from 'containers';

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
                    <Route path="*" element={<AppContainer />} />
                </>
            </Routes>
        );
    };

    return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};

export default RoutesContainer;
