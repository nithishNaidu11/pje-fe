import { useGetReactQuery } from '@/hooks/useGetReactQuery';

import { get } from '@/api/quiz';

import { ApiError, GetQuizResponseProps, QueryResultProps } from '@/interfaces';

interface GetQuizProps {
    enabled: boolean;
    quizId?: string;
}

export const useGetQuiz = ({
    enabled = true,
    quizId
}: GetQuizProps): QueryResultProps<GetQuizResponseProps, ApiError> => {
    return useGetReactQuery({
        queryKey: ['quizId'],
        params: { quizId },
        requestUrl: get,
        onSuccess: data => data,
        enabled: enabled && Boolean(quizId)
    });
};
