import { createTheme } from '@mui/material/styles';

interface ChatBotTheme {
    bgColor: {
        question: string;
        answer: string;
    };
    color: {
        questionInput: string;
        answer: string;
    };
}

declare module '@mui/material/styles' {
    interface Palette {
        chatBot: ChatBotTheme;
    }
    interface PaletteOptions {
        chatBot: ChatBotTheme;
    }
}

export const theme = createTheme({
    typography: {
        fontFamily: 'Lato, Arial'
    },
    palette: {
        chatBot: {
            bgColor: {
                question: 'rgb(104,134,255,.2)',
                answer: '#fbfbfb'
            },
            color: {
                questionInput: '#3445a2',
                answer: '#bdbdbd'
            }
        }
    }
});
