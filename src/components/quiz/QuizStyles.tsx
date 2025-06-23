import { type SxProps } from '@mui/material';

export const otpInputSx: SxProps = {
    '& .MuiInputBase-input': {
        py: '12.5px',
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            display: 'none'
        }
    }
};
