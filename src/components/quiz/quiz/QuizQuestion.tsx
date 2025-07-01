import React from 'react';

import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { QuizQuestionOptions, LabelWithHighlight } from 'components/quiz';

import type {
    QuizQuestionAnswerProps,
    QuizQuestionProps as IQuizQuestionProps
} from 'interfaces';

interface QuizQuestionProps {
    id: number;
    question: IQuizQuestionProps;
    answer: QuizQuestionAnswerProps;
    totalQuestions: number;
    onAnswer: (questionKey: string, answer: QuizQuestionAnswerProps) => void;
}

export const QuizQuestion = React.forwardRef(
    (props: QuizQuestionProps, ref) => {
        const { id, question, answer, totalQuestions, onAnswer } = props;
        const { msg, options, correctOption } = question?.question ?? {};

        return (
            <Box mb={6} ref={ref}>
                <Typography
                    variant="body2"
                    fontWeight={400}
                    color={grey[700]}
                    mb={1}
                >{`Question ${id}/${totalQuestions}`}</Typography>
                <LabelWithHighlight label={msg} />
                <Typography
                    variant="body2"
                    fontWeight={400}
                    color={grey[700]}
                    my={1}
                >
                    {`Choose the correct option:`}
                </Typography>
                <QuizQuestionOptions
                    questionKey={question.key}
                    options={options ?? []}
                    answer={answer}
                    correctOption={correctOption}
                    onUpdateQuizAnswer={onAnswer}
                />
            </Box>
        );
    }
);

QuizQuestion.displayName = 'QuizQuestion';
