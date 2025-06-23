import React from 'react';

import { QuizQuestion } from '@/components/quiz';

import type {
    QuizQuestionProps,
    QuizQuestionAnswerMapProps,
    QuizQuestionAnswerProps
} from '@/interfaces/quiz.interface';

interface QuizQuestionListProps {
    quizQuestions: QuizQuestionProps[];
    totalQuestions: number;
    currentQIndex: number | null;
    quizAnswers: QuizQuestionAnswerMapProps;
    questionsContainerRef: React.RefObject<HTMLDivElement>;
    onUpdateQuizAnswer: (
        questionKey: string,
        answer: QuizQuestionAnswerProps
    ) => void;
}

export const QuizQuestionList = ({
    quizQuestions = [],
    totalQuestions,
    quizAnswers = {},
    currentQIndex,
    questionsContainerRef,
    onUpdateQuizAnswer
}: QuizQuestionListProps) => {
    return (
        <>
            {quizQuestions?.map((question, index) => (
                <QuizQuestion
                    key={question.id}
                    id={index + 1}
                    ref={
                        index + 1 === currentQIndex
                            ? questionsContainerRef
                            : undefined
                    }
                    question={question}
                    answer={quizAnswers[question.key] ?? null}
                    onAnswer={onUpdateQuizAnswer}
                    totalQuestions={totalQuestions}
                />
            ))}
        </>
    );
};
