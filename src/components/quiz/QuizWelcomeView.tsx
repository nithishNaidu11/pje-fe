import React from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';

import { Alert, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CustomButton } from '@hunar.ai/hunar-design-system';

import { QuizLayout } from 'components/quiz';

import { useCreateQuiz } from 'hooks/apiHooks/quiz/useCreateQuiz';

import { CreateQuizResponseProps, ApiError } from 'interfaces';

export const QuizWelcomeView = () => {
    const theme = useTheme();
    const { preJoiningLeadId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const createQuiz = useCreateQuiz();

    const [errorMsg, setErrorMsg] = React.useState<string>('');

    const fullName = searchParams.get('fullname') || '';
    const quizId = searchParams.get('quizId') || null;

    const navigateToQuizPage = (quizId: string) => {
        navigate({
            pathname: `/abc/quiz/${quizId}`
        });
    };

    const createQuizForLead = (preJoiningLeadId: string) => {
        createQuiz.mutate(
            { params: { preJoiningLeadId } },
            {
                onSuccess: (data: CreateQuizResponseProps) => {
                    navigateToQuizPage(data.quizId);
                },
                onError: (apiError: ApiError) => {
                    setErrorMsg(apiError.errors.displayError);
                }
            }
        );
    };

    const onProceed = () => {
        if (quizId) {
            navigateToQuizPage(quizId);
        } else if (preJoiningLeadId) {
            createQuizForLead(preJoiningLeadId);
        }
    };

    return (
        <QuizLayout>
            <Box
                height="100%"
                pt={10}
                px={3}
                pb={1}
                display={'flex'}
                flexDirection={'column'}
                alignItems={isMobile ? 'flex-start' : 'center'}
                sx={{ background: theme.palette.quiz.bgColor.warmIvory }}
            >
                <Typography
                    variant={isMobile ? 'h4' : 'h2'}
                    fontWeight={700}
                    mb={isMobile ? 1 : 3}
                    textAlign={isMobile ? 'left' : 'center'}
                >
                    {`Hello ${fullName}`},
                </Typography>
                <Typography
                    variant={isMobile ? 'body1' : 'h5'}
                    fontWeight={400}
                    mb={4}
                >
                    {`Welcome to The Pre-Induction Assessment`}
                </Typography>
                <Typography
                    variant={isMobile ? 'body1' : 'h5'}
                    fontWeight={400}
                    textAlign={isMobile ? 'left' : 'center'}
                    mb={isMobile ? 4 : 8}
                >
                    {`This Pre-Induction Assessment contains 10 MCQ type
                    questions, which usually take 10 minutes to complete.`}
                </Typography>

                {errorMsg && (
                    <Alert severity="error" sx={{ mb: 1 }}>
                        {errorMsg}
                    </Alert>
                )}
                <CustomButton
                    isFullWidth
                    primaryColor={theme.palette.quiz.button.primary}
                    size="large"
                    onClick={onProceed}
                    sx={{ fontWeight: 700 }}
                >
                    {quizId
                        ? 'Continue Assessment'
                        : 'I Understand, Let’s start'}
                </CustomButton>
            </Box>
        </QuizLayout>
    );
};
