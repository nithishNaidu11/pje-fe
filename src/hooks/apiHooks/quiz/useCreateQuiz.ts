import { useMutation } from '@tanstack/react-query';

import { create } from 'api/quiz';

import { ApiError, CreateQuizResponseProps } from 'interfaces';

interface CreateQuizProps {
    params: {
        preJoiningLeadId: string;
    };
}

export const useCreateQuiz = () => {
    return useMutation<CreateQuizResponseProps, ApiError, CreateQuizProps>(
        ({ params: { preJoiningLeadId } }: CreateQuizProps) => {
            return create
                .post({ params: { preJoiningLeadId } })
                .then((response: CreateQuizResponseProps) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
