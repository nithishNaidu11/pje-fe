import React from 'react';
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
                        <Route path=":chekInterestCode/apply" element={<></>} />
                    </>
                ) : (
                    <>
                        <Route path="*" element={<Navigate to="/" replace />} />
                        <Route path="/" element={<>Hi</>} />

                        <Route
                            path="company/:companyId/:chekInterestCode/apply"
                            element={<></>}
                        />
                    </>
                )}
            </Routes>
        );
    };

    return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};

export default RoutesContainer;
