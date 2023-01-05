import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { QuestionOption } from 'interfaces';

import { QuestionOptions } from './QuestionOptions';

interface QuestionProps {
    msg: string;
    options: QuestionOption[];
    parentKey: string;
    onAnswerClick: (_: { key: string; value: string }) => void;
    answerValue?: string;
}

export const Question = ({
    msg,
    options,
    parentKey,
    onAnswerClick,
    answerValue
}: QuestionProps) => {
    return (
        <>
            <Grid container justifyContent="start" mb={2}>
                <Box
                    p={1.5}
                    style={{
                        borderRadius: '15px',
                        backgroundColor: 'rgb(104,134,255,.2)',
                        borderBottomLeftRadius: 0
                    }}
                >
                    <Typography
                        gutterBottom={false}
                        variant="body2"
                        component="span"
                    >
                        {msg}
                    </Typography>
                </Box>
            </Grid>
            <Grid container justifyContent="start" mb={4}>
                <QuestionOptions
                    options={options}
                    parentKey={parentKey}
                    onAnswerClick={onAnswerClick}
                    answerValue={answerValue}
                />
            </Grid>
        </>
    );
};
