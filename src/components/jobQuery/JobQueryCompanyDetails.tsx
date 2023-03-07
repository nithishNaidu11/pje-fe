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
        <Grid container spacing={2} justifyContent="center">
            <Grid item md={12} xs={12} display="flex" justifyContent="center">
                <img width={40} height={40} src={companyLogo}></img>
            </Grid>
            <Grid item md={12} xs={12}>
                <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom={false}
                    display="flex"
                    justifyContent="center"
                >
                    {companyName}
                </Typography>
            </Grid>
        </Grid>
    );
};
