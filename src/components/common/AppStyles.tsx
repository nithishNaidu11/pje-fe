import { type SxProps } from '@mui/material';
import { grey } from '@mui/material/colors';

export const xsTextFieldSx: SxProps = {
    '& .MuiInputBase-sizeSmall': {
        fontSize: '0.85rem',
        minHeight: '2.2rem'
    },
    '& .MuiInputBase-inputSizeSmall': {
        fontSize: '0.85rem',
        height: '0.9rem'
    },
    '& .MuiInputLabel-sizeSmall': {
        fontSize: '0.85rem'
    }
};

export const getSingleEntityEditFooterSx = (drawerZIndex: number) => {
    return {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: drawerZIndex + 1,
        borderTopWidth: 1,
        borderTopColor: grey[200],
        borderTopStyle: 'solid',
        backgroundColor: 'white'
    };
};

export const getSelectMenuSx = (value: string) => {
    return {
        '.MuiSelect-select.MuiSelect-outlined': {
            color: value ? undefined : grey[600]
        }
    };
};
