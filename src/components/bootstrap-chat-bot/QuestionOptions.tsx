import React from 'react';
import { QuestionOption } from './QuestionOption';

export const QuestionOptions = ({
    options,
    parentKey,
    onAnswerClick,
    answer
}: any) => {
    const onOptionClick = (key: string, value: string) => {
        onAnswerClick({ key, value });
    };

    return (
        <div className="d-flex">
            {options.map((option: any) => (
                <QuestionOption
                    label={option.label}
                    key={option.value}
                    parentKey={parentKey}
                    value={option.value}
                    onOptionClick={onOptionClick}
                    isAnswer={option.value === answer}
                />
            ))}
        </div>
    );
};
