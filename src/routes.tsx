import React from 'react';

import { JobQueryCheckInterestContainer } from 'containers/JobQueryCheckInterestContainer';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const RoutesContainer = () => {
    const renderRoutes = () => {
        return (
            <Routes>
                <>
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="/" element={<>Hi</>} />

                    <Route
                        path=":shortcode/"
                        element={<JobQueryCheckInterestContainer />}
                    />
                    <Route
                        path="job/:shortcode/"
                        element={<JobQueryCheckInterestContainer />}
                    />
                </>
            </Routes>
        );
    };

    return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};

export default RoutesContainer;
