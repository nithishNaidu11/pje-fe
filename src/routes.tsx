import { JobQueryCheckInterestContainer } from 'containers/JobQueryCheckInterestContainer';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

const RoutesContainer = () => {
    const renderRoutes = () => {
        return (
            <Routes>
                <>
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route
                        path="/"
                        element={
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                height="100vh"
                            >
                                <Grid>
                                    <Typography variant="h4">
                                        Welcome to Hunar Job Portal
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                    />

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
