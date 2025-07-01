import { blueGrey, green, grey, red } from '@mui/material/colors';

export const optionRadioStyleSx = {
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
};

export const optionFormControlSx = {
    width: '280px',
    ml: 0,
    mb: 1.5,
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
};
