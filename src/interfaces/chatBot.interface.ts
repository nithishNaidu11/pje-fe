export type QuestionOption = {
    label: string;
    next: string;
    value: string;
};

export type SingleConversation = {
    type: 'SINGLE_SELECT';
    id: string;
    key: string;
    question: {
        msg: string;
        options: QuestionOption[];
        answer?: QuestionOption;
    };
    next: string | null;
};

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

export interface ChatWindowProps {
    setOpen: (_: boolean) => void;
    conversation: Conversation;
    onSubmit: any;
}

export interface QuestionProps {
    msg: string;
    options: QuestionOption[];
    parentKey: string;
    onAnswerClick: any;
    answer?: string;
}

export interface AnswerProps {
    label: string;
    value: string;
}
