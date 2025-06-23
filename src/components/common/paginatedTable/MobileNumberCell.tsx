import { Grid, Typography } from '@mui/material';

interface MobileNumberCellProps {
    value: string;
    width?: number;
}

export const MobileNumberCell = ({
    value,
    width = 100
}: MobileNumberCellProps) => {
    return (
        <Grid container alignItems="center">
            <Typography variant="body2" width={width}>
                {value}
            </Typography>
        </Grid>
    );
};
