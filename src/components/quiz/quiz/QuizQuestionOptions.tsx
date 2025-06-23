import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Box,
    CircularProgress,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
    useTheme
} from '@mui/material';

import { LabelWithHighlight } from '@/components/quiz';

import { useSubmitQuizAnswers } from '@/hooks/apiHooks/quiz/useSubmitQuizAnswers';

import type {
    QuizQuestionOptionProps,
    QuizQuestionAnswerProps
} from '@/interfaces';

interface QuizQuestionOptionsProps {
    questionKey: string;
    answer: QuizQuestionAnswerProps;
    options: QuizQuestionOptionProps[];
    correctOption: QuizQuestionOptionProps;
    onUpdateQuizAnswer: (
        questionKey: string,
        answer: QuizQuestionAnswerProps
    ) => void;
}

type ANSWER_TYPE = 'right' | 'wrong';

const ANSWER: Record<string, ANSWER_TYPE> = {
    RIGHT: 'right',
    WRONG: 'wrong'
};

export const QuizQuestionOptions = ({
    questionKey,
    options,
    correctOption,
    answer,
    onUpdateQuizAnswer
}: QuizQuestionOptionsProps) => {
    const { quizId } = useParams();
    const theme = useTheme();

    const [selectedOption, setSelectedOption] = React.useState<string | null>(
        answer
    );
    const [isSelectedOptionCorrect, setIsSelectedOptionCorrect] =
        React.useState<ANSWER_TYPE | null>(() => {
            if (answer === null) {
                return null;
            }

            return answer === correctOption.value ? 'right' : 'wrong';
        });

    const submitAnswers = useSubmitQuizAnswers();

    const showFeedback = (answer: QuizQuestionAnswerProps) => {
        if (answer === correctOption.value) {
            setIsSelectedOptionCorrect(ANSWER.RIGHT);
        } else {
            setIsSelectedOptionCorrect(ANSWER.WRONG);
        }
        onUpdateQuizAnswer(questionKey, answer);
    };

    const submitAnswer = (answer: QuizQuestionAnswerProps) => {
        if (!quizId) return;

        setSelectedOption(answer);

        submitAnswers.mutate(
            {
                params: {
                    quizId
                },
                body: { answers: { [questionKey]: answer } }
            },
            {
                onSuccess: () => {
                    showFeedback(answer);
                }
            }
        );
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedOption !== null) return;

        submitAnswer(e.target.value as QuizQuestionAnswerProps);
    };

    const getRadioColor = (isSelectedOptionCorrect: ANSWER_TYPE | null) => {
        if (isSelectedOptionCorrect === null) return undefined;
        return isSelectedOptionCorrect === 'right' ? 'success' : 'error';
    };

    return (
        <Box>
            <RadioGroup value={selectedOption} onChange={onChange}>
                {options.map(option => {
                    const isSelected =
                        selectedOption && selectedOption === option.value;
                    const isRightOption =
                        isSelected && selectedOption === correctOption.value;
                    const isDisabled =
                        Boolean(selectedOption) &&
                        option.value !== selectedOption;
                    const radioColor = isSelected
                        ? getRadioColor(isSelectedOptionCorrect)
                        : undefined;

                    return (
                        <Box key={option.label}>
                            <FormControlLabel
                                key={option.label}
                                value={option.value}
                                control={<Radio color={radioColor} />}
                                label={option.label}
                                sx={{ width: '280px', ml: 0, mb: 1.5 }}
                                className={
                                    radioColor
                                        ? `MuiRadio-${radioColor}`
                                        : undefined
                                }
                                disabled={isDisabled}
                            />
                            {isSelected && isSelectedOptionCorrect !== null ? (
                                <Typography
                                    variant="body2"
                                    fontWeight={400}
                                    color={
                                        theme.palette.quiz.font[
                                            isRightOption ? 'success' : 'error'
                                        ]
                                    }
                                    mb={1.5}
                                >
                                    {isRightOption
                                        ? 'Correct Answer!'
                                        : 'Wrong Answer!'}
                                </Typography>
                            ) : (
                                <></>
                            )}
                        </Box>
                    );
                })}
            </RadioGroup>

            {submitAnswers.isLoading ? (
                <Box display="flex" alignItems="center">
                    <CircularProgress color="inherit" size={10} />
                    <Typography ml={1} variant="caption">
                        {`Saving answer...`}
                    </Typography>
                </Box>
            ) : (
                <></>
            )}

            {isSelectedOptionCorrect !== null ? (
                <LabelWithHighlight
                    label={
                        isSelectedOptionCorrect === ANSWER.RIGHT
                            ? 'Great Job!'
                            : 'The correct answer is:'
                    }
                    highlight={
                        isSelectedOptionCorrect === ANSWER.WRONG
                            ? correctOption.label
                            : ''
                    }
                />
            ) : (
                <></>
            )}
        </Box>
    );
};
