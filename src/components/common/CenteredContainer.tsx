import Grid from '@mui/material/Grid';

interface CenteredContainerProps {
    children: React.ReactNode;
}

export const CenteredContainer = ({ children }: CenteredContainerProps) => {
    return (
        <Grid
            id="parent"
            container
            justifyContent="center"
            alignContent="center"
            height={'100vh'}
        >
            <Grid item md={5} xs={12}>
                {children}
            </Grid>
        </Grid>
    );
};
