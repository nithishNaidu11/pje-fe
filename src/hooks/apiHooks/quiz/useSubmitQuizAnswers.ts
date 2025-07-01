import { useMutation } from '@tanstack/react-query';

import { submitAnswers } from 'api/quiz';

import {
    ApiError,
    SubmitQuizAnswersResponseProps,
    QuizQuestionAnswerMapProps
} from 'interfaces';

interface SubmitQuizAnswersProps {
    params: {
        quizId: string;
    };
    body: {
        answers: QuizQuestionAnswerMapProps;
    };
}

export const useSubmitQuizAnswers = () => {
    return useMutation<
        SubmitQuizAnswersResponseProps,
        ApiError,
        SubmitQuizAnswersProps
    >(({ params: { quizId }, body: { answers } }: SubmitQuizAnswersProps) => {
        return submitAnswers
            .post({
                params: { quizId },
                body: { answers }
            })
            .then((response: SubmitQuizAnswersResponseProps) => {
                return response;
            })
            .catch((error: ApiError): Promise<ApiError> => {
                return Promise.reject(error);
            });
    });
};
