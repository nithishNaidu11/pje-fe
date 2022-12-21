import React from 'react';

import RoutesContainer from './routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { PushNotification } from 'containers';

import './config';

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Lato',
            textTransform: 'none'
        }
    }
});

const queryClient = new QueryClient();

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <RoutesContainer />
                <PushNotification />
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
