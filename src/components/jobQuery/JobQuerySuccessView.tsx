import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import SuccessIcon from './Success.png';

export const JobQuerySuccessView = () => {
    return (
        <Grid container justifyContent="center" alignContent="center">
            <Grid item md={12} xs={12} display="flex" justifyContent="center">
                <img
                    src={SuccessIcon}
                    alt="success"
                    style={{
                        width: 136,
                        height: 136
                    }}
                />
            </Grid>
            <Grid item md={12} xs={12} display="flex" justifyContent="center">
                <Typography variant="h6" p={2} textAlign="center">
                    Thank for you registering your response.
                </Typography>
            </Grid>
        </Grid>
    );
};
