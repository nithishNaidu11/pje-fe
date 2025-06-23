import { ApiClient } from 'middleware';

export const requestOTP = ApiClient({
    url: `/v1/auth/send-otp/`
});

export const validateOTP = ApiClient({
    url: `/v1/auth/verify-otp/`
});

export const create = ApiClient({
    url: '/v1/pre-joining-lead/{preJoiningLeadId}/create-quiz/'
});

export const get = ApiClient({
    url: '/v1/quiz/{quizId}/'
});

export const submitAnswers = ApiClient({
    url: `v1/quiz/{quizId}/populate-answers/`
});

export const submitQuiz = ApiClient({
    url: `v1/quiz/{quizId}/submit-quiz/`
});
