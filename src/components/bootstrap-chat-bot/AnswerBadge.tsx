import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AnswerProps } from 'interfaces';

interface AnswerBadgeProps {
    answer?: AnswerProps;
}

export const AnswerBadge = ({ answer }: AnswerBadgeProps) => {
    return (
        <Grid container justifyContent="end" mb={2}>
            <Box
                p={1.5}
                style={{
                    borderRadius: '15px',
                    backgroundColor: '#fbfbfb',
                    borderBottomRightRadius: 0,
                    border: '1px solid #bdbdbd'
                }}
            >
                <Typography
                    gutterBottom={false}
                    variant="body2"
                    component="span"
                >
                    {answer?.label}
                </Typography>
            </Box>
        </Grid>
    );
};
