import { QuestionProps, QuestionsProps } from './jobQuery.interface';

export type QuestionAnswerProps = QuestionProps & {
    answer?: string | string[];
};

export type SingleConversationProps = QuestionsProps[string] & {
    question: QuestionAnswerProps;
};

export type ConversationsProps = Record<string, SingleConversationProps>;

export type PositionProps =
    | 'bottomLeft'
    | 'bottomRight'
    | 'bottom'
    | 'top'
    | 'topLeft'
    | 'topRight';

export interface ChatIconProps {
    icon: string;
    size?: 'sm' | 'lg';
    position?: PositionProps;
    open: boolean;
    onClick: any;
}

export type PositionClassMapProps = { [key in PositionProps]: string };
