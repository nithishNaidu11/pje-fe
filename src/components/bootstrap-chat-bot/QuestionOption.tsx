import { Button, Grid } from '@mui/material';

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
    return (
        <Grid item>
            <Button
                variant="outlined"
                className="me-1"
                style={{
                    borderRadius: '5px',
                    borderColor: '#3445a2',
                    border: isAnswer ? 'inherit' : 'solid 1px',
                    color: isAnswer ? 'white' : '#3445a2',
                    backgroundColor: isAnswer ? '#3445a2' : 'inherit',
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
