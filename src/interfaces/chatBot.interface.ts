import { QuestionProps, QuestionsProps } from './jobQuery.interface';

export type QuestionAnswerProps = QuestionProps & {
    answer?: string;
};

export type SingleConversation = QuestionsProps[string] & {
    question: QuestionAnswerProps;
};

export type Conversations = Record<string, SingleConversation>;

export type Position =
    | 'bottomLeft'
    | 'bottomRight'
    | 'bottom'
    | 'top'
    | 'topLeft'
    | 'topRight';

export interface ChatIconProps {
    icon: string;
    size?: 'sm' | 'lg';
    position?: Position;
    open: boolean;
    onClick: any;
}

export type PositionClassMapProps = { [key in Position]: string };
