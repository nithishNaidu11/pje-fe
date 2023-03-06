import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { QUESTION_TYPE } from 'Enum';
import { QuestionOptionProps } from 'interfaces';

import { AnswerInputField } from './AnswerInputField';

interface QuestionProps {
    msg: string;
    type: QUESTION_TYPE;
    options: QuestionOptionProps[];
    parentKey: string;
    onAnswerClick: (_: { key: string; value: string }) => void;
    onFileUpload: (_: File) => void;
    isFileUploading: boolean;
    answerValue?: string;
}

export const Question = ({
    msg,
    type,
    options,
    parentKey,
    onAnswerClick,
    onFileUpload,
    isFileUploading,
    answerValue
}: QuestionProps) => {
    const theme = useTheme();
    return (
        <>
            <Grid container justifyContent="start" mb={2}>
                <Box
                    p={1.5}
                    sx={{
                        borderRadius: '15px',
                        backgroundColor: theme.palette.chatBot.bgColor.question,
                        borderBottomLeftRadius: 0
                    }}
                >
                    <Typography
                        gutterBottom={false}
                        variant="body2"
                        component="span"
                    >
                        {msg}
                    </Typography>
                </Box>
            </Grid>
            <Grid container justifyContent="start" mb={4}>
                <AnswerInputField
                    options={options}
                    questionType={type}
                    parentKey={parentKey}
                    onAnswerClick={onAnswerClick}
                    onFileUpload={onFileUpload}
                    isFileUploading={isFileUploading}
                    answerValue={answerValue}
                />
            </Grid>
        </>
    );
};
