import { Grid, useTheme } from '@mui/material';

export const QuizOverlay = () => {
    const theme = useTheme();

    return (
        <Grid
            height="100vh"
            bgcolor={theme.palette.common.black}
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={-1}
        />
    );
};
