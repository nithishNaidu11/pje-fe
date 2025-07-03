import React from 'react';
import { ToastContainer } from 'react-toastify';

import RoutesContainer from './routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from 'theme';

import './config';
import './style.scss';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <RoutesContainer />
                <ToastContainer />
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
