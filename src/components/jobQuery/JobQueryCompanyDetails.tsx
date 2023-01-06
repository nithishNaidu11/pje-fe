import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface JobQueryCompanyDetailsProps {
    companyName: string;
    companyLogo: string;
}

export const JobQueryCompanyDetails = ({
    companyName,
    companyLogo
}: JobQueryCompanyDetailsProps) => {
    return (
        <Grid container pb={4} justifyContent="center">
            <Grid item md={12} xs={12}>
                <img width={40} height={40} src={companyLogo}></img>
            </Grid>
            <Grid item md={12} xs={12}>
                <Typography variant="subtitle1" mb={2} gutterBottom={false}>
                    {companyName}
                </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
                <Divider />
            </Grid>
        </Grid>
    );
};
