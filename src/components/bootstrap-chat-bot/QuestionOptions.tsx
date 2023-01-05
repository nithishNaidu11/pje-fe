import Grid from '@mui/material/Grid';

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
        <Grid container spacing={1}>
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
        </Grid>
    );
};
