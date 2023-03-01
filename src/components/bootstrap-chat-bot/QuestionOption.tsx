import { Button, Grid, useTheme } from '@mui/material';

interface QuestionOptionProps {
    label: string;
    parentKey: string;
    value: string;
    onOptionClick: (_: string, __: string) => void;
    isAnswer: boolean;
}

export const QuestionOption = ({
    label,
    parentKey,
    value,
    onOptionClick,
    isAnswer = false
}: QuestionOptionProps) => {
    const {
        palette: { chatBot }
    } = useTheme();

    return (
        <Grid item>
            <Button
                variant="outlined"
                style={{
                    borderRadius: '5px',
                    borderColor: chatBot.color.questionInput,
                    color: isAnswer ? 'white' : chatBot.color.questionInput,
                    backgroundColor: isAnswer
                        ? chatBot.color.questionInput
                        : 'inherit',
                    textTransform: 'none'
                }}
                onClick={() => {
                    onOptionClick(parentKey, value);
                }}
            >
                {label}
            </Button>
        </Grid>
    );
};
