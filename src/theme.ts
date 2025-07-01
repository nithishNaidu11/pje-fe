import { createTheme } from '@mui/material/styles';
import { blueGrey, green, grey, red } from '@mui/material/colors';

export interface ButtonColorsProps {
    primary: string;
    success: string;
    danger: string;
}

interface ABCBrandPaletteProps {
    button: {
        primary: string;
        disabled: string;
    };
    bgColor: {
        light: string;
        warmIvory: string;
    };
    font: {
        success: string;
        error: string;
        disabled: string;
    };
}

declare module '@mui/material/styles' {
    interface Palette {
        button: ButtonColorsProps;
        quiz: ABCBrandPaletteProps;
    }
    interface PaletteOptions {
        button: ButtonColorsProps;
        quiz: ABCBrandPaletteProps;
    }
}

export const asteriskStyle = {
    color: red[600],
    fontSize: '20px',
    fontFamily: '"Anek Latin", sans-serif'
};

export const theme = createTheme({
    typography: {
        fontFamily: '"Anek Latin", sans-serif'
    },
    palette: {
        button: { danger: '#E50000', primary: '#4081DD', success: '#51B642' },
        quiz: {
            button: {
                primary: '#C7222A',
                disabled: '#9E9E9E'
            },
            bgColor: {
                light: '#FFFFFF',
                warmIvory: '#FFF4D9'
            },
            font: {
                success: '#70B865',
                error: '#C7222A',
                disabled: '#00000061'
            }
        }
    },
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: asteriskStyle
            }
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: grey[900],
                    '&.MuiRadio-colorPrimary': {
                        color: grey[900]
                    },
                    '&.Mui-checked.MuiRadio-colorError': {
                        color: '#CB1A33'
                    },
                    '&.Mui-checked.MuiRadio-colorSuccess': {
                        color: '#66BE58'
                    },
                    '&.Mui-disabled': {
                        color: '#00000061'
                    }
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    border: `1px solid ${blueGrey[200]}`,
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    color: blueGrey[900],
                    '&.MuiRadio-success': {
                        background: green[50],
                        border: '1px solid #66BE58',
                        marginBottom: '6px'
                    },
                    '&.MuiRadio-error': {
                        background: red[50],
                        border: '1px solid #CB1A33',
                        marginBottom: '6px'
                    },
                    '.MuiTypography-root': {
                        lineHeight: '100% !important',
                        padding: '5px 0'
                    }
                }
            }
        }
    }
});
