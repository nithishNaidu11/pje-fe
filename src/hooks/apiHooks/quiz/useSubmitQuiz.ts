import { useMutation } from '@tanstack/react-query';

import { submitQuiz } from 'api/quiz';

import { ApiError, SubmitQuizResponseProps } from 'interfaces';

interface SubmitQuizProps {
    params: {
        quizId: string;
    };
}

export const useSubmitQuiz = () => {
    return useMutation<SubmitQuizResponseProps, ApiError, SubmitQuizProps>(
        ({ params: { quizId } }: SubmitQuizProps) => {
            return submitQuiz
                .post({ params: { quizId } })
                .then((response: SubmitQuizResponseProps) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
