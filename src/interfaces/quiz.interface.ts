import { QUIZ_QUESTION_TYPE, QUIZ_STATUS } from 'Enum';

export type QuizQuestionAnswerProps = 'a' | 'b' | 'c' | 'd';
export type QuizQuestionAnswerMapProps = Record<
    string,
    QuizQuestionAnswerProps
>;

export interface QuizQuestionOptionProps {
    label: string;
    value: string;
}

export interface QuizQuestionProps {
    id: string;
    key: string;
    type: QUIZ_QUESTION_TYPE;
    order: number;
    question: {
        msg: string;
        options: QuizQuestionOptionProps[];
        correctOption: QuizQuestionOptionProps;
    };
    weightage: number;
    validations: [] | null;
}

/* API Responses */

export interface RequestQuizOtpResponseProps {
    success: boolean;
}

export interface ValidateQuizOtpResponseProps {
    email: string;
    fullName: string;
    quizId: null | string;
    quizStatus: QUIZ_STATUS;
    preJoiningLeadId: string;
}

export interface CreateQuizResponseProps {
    quizId: string;
    created: boolean;
}

export interface GetQuizResponseProps {
    id: string;
    customFields: object;
    auditMetadata: {
        createdBy: string;
        createdOn: string;
        updatedBy: string;
        updatedOn: string;
    };
    preJoiningLead: string;
    questions: QuizQuestionProps[];
    answers: QuizQuestionAnswerMapProps;
    score: number | null;
    status: QUIZ_STATUS;
    link: string | null;
}

export interface SubmitQuizAnswersResponseProps {
    answers: QuizQuestionAnswerMapProps;
}

export interface SubmitQuizResponseProps {
    score: number;
}
