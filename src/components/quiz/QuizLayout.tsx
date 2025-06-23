import React from 'react';

import { Grid } from '@mui/material';

import { QuizOverlay, QuizBanner } from '@/components/quiz';

interface QuizLayoutProps {
    children: React.ReactNode;
}

export const QuizLayout = ({ children }: QuizLayoutProps) => {
    return (
        <>
            <QuizOverlay />
            <Grid
                id="page-layout"
                container
                justifyContent="center"
                height="100vh"
            >
                <Grid
                    item
                    display="flex"
                    flexDirection="column"
                    width={{ xs: '100%', sm: 600 }}
                    height={{ xs: '100%' }}
                    my="auto"
                    borderRadius={{ xs: 0, sm: 4 }}
                    overflow="clip"
                >
                    <Grid
                        bgcolor="white"
                        flexGrow={1}
                        height="100%"
                        sx={{ overflowY: 'auto' }}
                    >
                        <QuizBanner />
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
