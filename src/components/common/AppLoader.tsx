import CircularProgress from '@mui/material/CircularProgress';

import { LoaderBackdrop } from './LoaderBackdrop';

interface AppLoaderProps {
    isInsideDrawer?: boolean;
    zIndex?: number;
}

export const AppLoader = ({
    isInsideDrawer = false,
    zIndex = undefined
}: AppLoaderProps) => {
    return (
        <LoaderBackdrop isFullScreen={!isInsideDrawer} zIndex={zIndex}>
            <CircularProgress sx={{ color: 'white' }} />
        </LoaderBackdrop>
    );
};
