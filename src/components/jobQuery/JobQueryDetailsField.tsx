import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const JobQueryDetailsField = ({
    fieldName,
    fieldValue
}: {
    fieldName: string;
    fieldValue: number | boolean | string[] | null | undefined | string;
}) => {
    return (
        <Grid>
            <Typography
                gutterBottom={false}
                variant="body2"
                component="span"
                fontWeight={600}
            >
                {fieldName}:
            </Typography>
            <Typography gutterBottom={false} variant="body2" component="span">
                {fieldValue}
            </Typography>
        </Grid>
    );
};
