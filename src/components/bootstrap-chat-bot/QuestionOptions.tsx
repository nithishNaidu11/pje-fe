import Grid from '@mui/material/Grid';

import { QuestionOption } from './QuestionOption';
import { QuestionOptionProps } from 'interfaces';

interface QuestionOptionsProps {
    options: QuestionOptionProps[];
    parentKey: string;
    onAnswerClick: (_: { key: string; value: string }) => void;
    answerValue?: string | string[];
}

export const QuestionOptions = ({
    options,
    parentKey,
    onAnswerClick,
    answerValue
}: QuestionOptionsProps) => {
    const onOptionClick = (key: string, value: string) => {
        onAnswerClick({ key, value });
    };

    return (
        <Grid container spacing={1}>
            {options.map((option: QuestionOptionProps) => (
                <QuestionOption
                    label={option.label}
                    key={option.value}
                    parentKey={parentKey}
                    value={option.value}
                    onOptionClick={onOptionClick}
                    isAnswer={option.value === answerValue}
                />
            ))}
        </Grid>
    );
};
