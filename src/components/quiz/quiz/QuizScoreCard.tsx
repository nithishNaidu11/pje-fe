import React from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { QUIZ_STATUS } from 'Enum';
import { grey } from '@mui/material/colors';

import QuizPassedImage from '@/assets/quiz/quiz_pass.svg';
import QuizFailedImage from '@/assets/quiz/quiz_fail.svg';

interface QuizScoreCardProps {
    score: null | number;
    status: QUIZ_STATUS.PASSED | QUIZ_STATUS.FAILED;
}

const QUIZ_RESULT_MESSAGE = {
    [QUIZ_STATUS.PASSED]: {
        title: 'Very Good!',
        content:
            // eslint-disable-next-line max-len
            "You've passed the assessment with a great score! We can't wait to meet you on your first day with Aditya Birla Group!"
    },
    [QUIZ_STATUS.FAILED]: {
        title: 'You can do better!',
        content:
            // eslint-disable-next-line max-len
            'You could not pass the assessment with a good score! We recommend revisiting the video resources and attempting the assessment again for a better score.'
    }
};

export const QuizScoreCard = ({ score, status }: QuizScoreCardProps) => {
    const theme = useTheme();

    const isQuizPassed = React.useMemo(
        () => status === QUIZ_STATUS.PASSED,
        [status]
    );

    return (
        <>
            <Box p={3} mb={3}>
                <center>
                    <img
                        src={isQuizPassed ? QuizPassedImage : QuizFailedImage}
                        height="40px"
                        width="40px"
                    />
                </center>
                <Typography
                    fontSize="80px"
                    fontWeight={700}
                    color={
                        theme.palette.quiz.font[
                            isQuizPassed ? 'success' : 'error'
                        ]
                    }
                    textAlign="center"
                    lineHeight="normal"
                >
                    {score}
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={400}
                    color={
                        theme.palette.quiz.font[
                            isQuizPassed ? 'success' : 'error'
                        ]
                    }
                    textAlign="center"
                >
                    out of 100
                </Typography>
            </Box>
            <Box
                p={3}
                sx={{
                    border: `1px solid ${grey[300]}`,
                    borderRadius: '8px'
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={400}
                    color={grey[900]}
                    mb={0.5}
                >
                    {QUIZ_RESULT_MESSAGE[status]?.title}
                </Typography>
                <Typography
                    variant="caption"
                    fontWeight={400}
                    color={grey[600]}
                >
                    {QUIZ_RESULT_MESSAGE[status].content}
                </Typography>
            </Box>
        </>
    );
};
