import React from 'react';

import { JobQueryCheckInterestContainer } from 'containers/JobQueryCheckInterestContainer';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { NotFound } from './containers';

const RoutesContainer = () => {
    // const isProduction = process.env.REACT_APP_BUILD_ENV === 'production';
    const isProduction = false;
    const renderRoutes = () => {
        return (
            <Routes>
                {isProduction ? (
                    <>
                        <Route
                            path=":applyCode/"
                            element={<JobQueryCheckInterestContainer />}
                        />
                    </>
                ) : (
                    <>
                        <Route path="*" element={<Navigate to="/" replace />} />
                        <Route path="/" element={<>Hi</>} />

                        <Route
                            path=":applyCode/"
                            element={<JobQueryCheckInterestContainer />}
                        />
                    </>
                )}
            </Routes>
        );
    };

    return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};

export default RoutesContainer;
