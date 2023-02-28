import { QuestionsProps } from './jobQuery.interface';

export type SingleConversation = QuestionsProps[string];

export type Conversation = {
    [key: string]: SingleConversation;
};

export interface ChatContainerProps {
    icon: string;
}

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

export interface AnswerProps {
    label: string;
    value: string;
}
