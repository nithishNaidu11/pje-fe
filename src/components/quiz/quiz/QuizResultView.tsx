import { useParams } from 'react-router-dom';

import { Box, useTheme, useMediaQuery } from '@mui/material';

import { AppLoader } from 'components/common';
import { QuizLayout, QuizScoreCard } from 'components/quiz';

import { useGetQuiz } from 'hooks/apiHooks/quiz/useGetQuiz';

import { QUIZ_STATUS } from 'Enum';

export const QuizResultView = () => {
    const theme = useTheme();
    const { quizId } = useParams();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { data: quizData, isLoading } = useGetQuiz({
        quizId,
        enabled: Boolean(quizId)
    });

    return (
        <QuizLayout>
            {isLoading || !quizData ? (
                <AppLoader />
            ) : (
                <Box pt={isMobile ? 3 : 9} pb={5} mx={isMobile ? 3 : 9}>
                    <QuizScoreCard
                        score={quizData?.score}
                        status={
                            (quizData?.score ?? 0) >= 70
                                ? QUIZ_STATUS.PASSED
                                : QUIZ_STATUS.FAILED
                        }
                    />
                </Box>
            )}
        </QuizLayout>
    );
};
