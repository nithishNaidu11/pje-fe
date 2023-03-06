import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';

import { DatePicker, Select, UploadButton, TextArea } from 'components/common';
import { QuestionOptions } from './QuestionOptions';

import { ALLOWED_EXTENSION, QUESTION_TYPE } from 'Enum';
import { QuestionOptionProps } from 'interfaces';

import { TimeUtils } from 'utils';

import { useFormUtils } from 'hooks';

const DROPDOWN_LIMIT = 5;

interface AnswerInputFieldProps {
    options: QuestionOptionProps[];
    questionType: QUESTION_TYPE;
    parentKey: string;
    isFileUploading: boolean;
    answerValue?: string | string[];
    onAnswerClick: (_: { key: string; value: string | string[] }) => void;
    onFileUpload: (_: File) => void;
}

export const AnswerInputField = ({
    questionType,
    options = [],
    parentKey,
    isFileUploading,
    answerValue,
    onAnswerClick,
    onFileUpload
}: AnswerInputFieldProps) => {
    const { getSelectedOption, getMultiSelectedOptions } = useFormUtils();
    const [value, setValue] = React.useState(answerValue);
    const theme = useTheme();

    switch (questionType.toUpperCase()) {
        case QUESTION_TYPE.YES_NO:
        case QUESTION_TYPE.SINGLE_SELECT:
            return options.length <= DROPDOWN_LIMIT ? (
                <QuestionOptions
                    options={options}
                    parentKey={parentKey}
                    onAnswerClick={onAnswerClick}
                    answerValue={answerValue}
                />
            ) : (
                <Select
                    size="small"
                    options={options}
                    sx={{ minWidth: '50%', width: '80%' }}
                    label=""
                    value={getSelectedOption({
                        options,
                        fieldValue: answerValue
                    })}
                    onChange={(_, selectedOption) => {
                        if (
                            selectedOption == null ||
                            Array.isArray(selectedOption)
                        )
                            return;

                        onAnswerClick({
                            key: parentKey,
                            value: selectedOption.value
                        });
                    }}
                />
            );
        case QUESTION_TYPE.MULTI_SELECT:
            return (
                <Select
                    size="small"
                    multiple
                    options={options}
                    sx={{ minWidth: '50%', width: '80%' }}
                    label=""
                    value={
                        Array.isArray(answerValue)
                            ? getMultiSelectedOptions({
                                  options,
                                  fieldValue: answerValue || []
                              })
                            : undefined
                    }
                    onChange={(_, selectedOptions) => {
                        if (
                            selectedOptions == null ||
                            !Array.isArray(selectedOptions)
                        )
                            return;
                        onAnswerClick({
                            key: parentKey,
                            value: selectedOptions.map(option => option.value)
                        });
                    }}
                />
            );

        case QUESTION_TYPE.TEXT:
            return (
                <OutlinedInput
                    size="small"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="submit answer"
                                sx={{
                                    color: theme.palette.chatBot.color
                                        .questionInput
                                }}
                                onClick={() => {
                                    if (!value) return;
                                    onAnswerClick({ key: parentKey, value });
                                }}
                                edge="end"
                            >
                                <CheckBoxIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    value={value || ''}
                    onChange={e => setValue(e.target.value)}
                />
            );
        case QUESTION_TYPE.TEXT_AREA:
            return (
                <Box sx={{ position: 'relative' }}>
                    <TextArea
                        onChange={e => setValue(e.target.value)}
                        value={!Array.isArray(value) ? value : ''}
                        placeholder=""
                        color={theme.palette.chatBot.color.questionInput}
                    />
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: -6,
                            right: -32,
                            color: theme.palette.chatBot.color.questionInput
                        }}
                        onClick={() => {
                            if (!value) return;
                            onAnswerClick({ key: parentKey, value });
                        }}
                    >
                        <CheckBoxIcon />
                    </IconButton>
                </Box>
            );
        case QUESTION_TYPE.FILE_UPLOAD_LINK:
            return (
                <UploadButton
                    color={theme.palette.chatBot.color.questionInput}
                    name="file_upload"
                    isLoading={isFileUploading}
                    title={answerValue ? 'REUPLOAD' : 'UPLOAD'}
                    onChange={e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        onFileUpload(file);
                        onAnswerClick({ key: parentKey, value: file.name });
                    }}
                    acceptFileType={[
                        ALLOWED_EXTENSION.PDF,
                        ALLOWED_EXTENSION.DOC,
                        ALLOWED_EXTENSION.DOCX
                    ]}
                />
            );
        case QUESTION_TYPE.DATE:
            return (
                <Box sx={{ width: '80%' }}>
                    <DatePicker
                        label=""
                        size="small"
                        inputFormat="yyyy-MM-dd"
                        onChange={selectedDate => {
                            if (!selectedDate) return;
                            setValue(
                                TimeUtils.format(selectedDate, 'YYYY-MM-DD')
                            );
                        }}
                        onAccept={selectedDate => {
                            if (!selectedDate) return;
                            onAnswerClick({
                                key: parentKey,
                                value: TimeUtils.format(
                                    selectedDate,
                                    'YYYY-MM-DD'
                                )
                            });
                        }}
                        value={!Array.isArray(value) ? value : ''}
                    />
                </Box>
            );
        default:
            return <></>;
    }
};
