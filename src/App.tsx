import React from 'react';

import RoutesContainer from './routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import './config';

const theme = createTheme({
    typography: {
        fontFamily: 'Lato, Arial'
    }
});

const queryClient = new QueryClient();

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <RoutesContainer />
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
