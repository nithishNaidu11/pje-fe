import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import _ from 'lodash';

import { Alert, Box, useTheme } from '@mui/material';
import { CustomButton } from '@hunar.ai/hunar-design-system';

import { AppLoader } from 'components/common';
import { QuizLayout, QuizQuestionList } from 'components/quiz';

import { useErrorHelper } from 'hooks/useErrorHelper';
import { useGetQuiz } from 'hooks/apiHooks/quiz/useGetQuiz';
import { useSubmitQuiz } from 'hooks/apiHooks/quiz/useSubmitQuiz';

import { type ApiError } from 'interfaces';
import type {
    QuizQuestionAnswerMapProps,
    QuizQuestionProps,
    QuizQuestionAnswerProps
} from 'interfaces/quiz.interface';
import { DataUtils } from 'utils';

export const QuizQuestionView = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const { getApiErrorMsg } = useErrorHelper();
    const submitQuiz = useSubmitQuiz();

    const [currentQIndex, setCurrentQIndex] = React.useState<null | number>(
        null
    );
    const [quizQuestions, setQuizQuestions] = React.useState<
        QuizQuestionProps[]
    >([]);
    const [quizAnswers, setQuizAnswers] =
        React.useState<QuizQuestionAnswerMapProps>({});
    const [errorMsg, setErrorMsg] = React.useState('');
    const questionsContainerRef = React.useRef<HTMLDivElement>(null);

    const {
        data: quizData,
        isLoading: isLoadingQuizData,
        isError
    } = useGetQuiz({
        quizId,
        enabled: Boolean(quizId)
    });

    const isQuizCompleted = React.useMemo(
        () => Object.keys(quizAnswers).length === quizQuestions?.length,
        [quizAnswers, quizQuestions]
    );

    const isLoading = React.useMemo(
        () => isLoadingQuizData || submitQuiz.isLoading,
        [isLoadingQuizData, submitQuiz]
    );

    const navigateToResultsPage = (quizId: string) => {
        navigate({
            pathname: `/abc/quiz/${quizId}/result`
        });
    };

    const onShowQuizResult = () => {
        if (!quizId) {
            return;
        }

        submitQuiz.mutate(
            {
                params: { quizId }
            },
            {
                onSuccess: () => {
                    navigateToResultsPage(quizId);
                },
                onError: (apiError: ApiError) => {
                    setErrorMsg(getApiErrorMsg(apiError));
                }
            }
        );
    };

    const onUpdateQuizAnswer = (
        questionKey: string,
        answer: QuizQuestionAnswerProps
    ) => {
        setQuizAnswers(prevQuizAnswers => {
            return {
                [questionKey]: answer,
                ...prevQuizAnswers
            };
        });
        updateCurrentQIndex(currentQIndex || 0);
    };

    const updateCurrentQIndex = _.debounce((previousIndex: number) => {
        setCurrentQIndex(previousIndex + 1);
    }, 1500);

    React.useEffect(() => {
        if (!isError && quizData) {
            // Setup Inital State
            const numberOfQuestionsAnswered = Object.keys(
                quizData?.answers ?? {}
            ).length;

            setQuizQuestions(quizData?.questions ?? []);
            setQuizAnswers(DataUtils.snakize(quizData?.answers ?? {}));
            setCurrentQIndex(numberOfQuestionsAnswered + 1);
        }
    }, [quizData, isError]);

    React.useEffect(() => {
        if (questionsContainerRef.current) {
            questionsContainerRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [currentQIndex]);

    if (isLoading) {
        return (
            <QuizLayout>
                <AppLoader />
            </QuizLayout>
        );
    }

    return (
        <QuizLayout>
            <Box
                sx={{
                    padding: '24px 16px',
                    paddingBottom: '250px',
                    overflow: 'auto'
                }}
            >
                <QuizQuestionList
                    quizQuestions={quizQuestions?.slice(0, currentQIndex || 0)}
                    totalQuestions={quizQuestions?.length}
                    currentQIndex={currentQIndex}
                    quizAnswers={quizAnswers}
                    questionsContainerRef={questionsContainerRef}
                    onUpdateQuizAnswer={onUpdateQuizAnswer}
                />
                {errorMsg && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMsg}
                    </Alert>
                )}
                {isQuizCompleted ? (
                    <CustomButton
                        isFullWidth
                        size="large"
                        primaryColor={theme.palette.quiz.button.primary}
                        onClick={onShowQuizResult}
                        sx={{ fontWeight: 700 }}
                    >
                        {`SHOW MY SCORE`}
                    </CustomButton>
                ) : (
                    <></>
                )}
            </Box>
        </QuizLayout>
    );
};
