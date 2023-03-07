import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { JOB_QUERY_MARK_STATUS } from 'Enum';
import { useIsMobile } from 'hooks';

interface JobQueryCheckInterestFooterProps {
    onMarkInterestStatus: (_: JOB_QUERY_MARK_STATUS) => void;
}

export const JobQueryCheckInterestFooter = ({
    onMarkInterestStatus
}: JobQueryCheckInterestFooterProps) => {
    const isMobile = useIsMobile();

    return (
        <>
            <Typography variant="h6" fontWeight={600} my={2}>
                Are you interested?
            </Typography>

            <Grid container justifyContent="end" spacing={2}>
                {isMobile ? (
                    <>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={() =>
                                    onMarkInterestStatus(
                                        JOB_QUERY_MARK_STATUS.INTERESTED
                                    )
                                }
                                fullWidth
                            >
                                YES, INTERESTED
                            </Button>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    onMarkInterestStatus(
                                        JOB_QUERY_MARK_STATUS.NOT_INTERESTED
                                    )
                                }
                                fullWidth
                            >
                                NO, NOT INTERESTED
                            </Button>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item md={6}>
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    onMarkInterestStatus(
                                        JOB_QUERY_MARK_STATUS.NOT_INTERESTED
                                    )
                                }
                                fullWidth
                            >
                                NO, NOT INTERESTED
                            </Button>
                        </Grid>
                        <Grid item md={6}>
                            <Button
                                variant="contained"
                                onClick={() =>
                                    onMarkInterestStatus(
                                        JOB_QUERY_MARK_STATUS.INTERESTED
                                    )
                                }
                                fullWidth
                            >
                                YES, INTERESTED
                            </Button>
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );
};
