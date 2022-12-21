import React from 'react';

import OneSignal from 'react-onesignal';

import RoutesContainer from './routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    React.useEffect(() => {
        OneSignal?.init({
            appId: '2c42941b-8210-4add-aa05-bf60a7c3c6a7'
        }).then(() => {
            OneSignal.showSlidedownPrompt();
        });
        OneSignal.on('subscriptionChange', function (isSubscribed) {
            console.log("The user's subscription state is now:", isSubscribed);
            OneSignal.setExternalUserId('urvashi');
        });
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <RoutesContainer />
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
