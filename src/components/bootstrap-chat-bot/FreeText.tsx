import React from 'react';

import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { TextArea } from 'components/common/TextArea';
import { Box } from '@mui/material';

interface FreeTextProps {
    parentKey: string;
    onAnswerClick: (_: { key: string; value: string }) => void;
    answerValue?: string;
}

export const FreeText = ({
    onAnswerClick,
    parentKey,
    answerValue = ''
}: FreeTextProps) => {
    const [value, setValue] = React.useState(answerValue);
    return (
        <Box sx={{ position: 'relative' }}>
            <TextArea
                onChange={e => setValue(e.target.value)}
                value={value}
                placeholder=""
            />
            <IconButton
                sx={{ position: 'absolute', bottom: -6, right: -36 }}
                onClick={() => {
                    if (!value) return;
                    onAnswerClick({ key: parentKey, value });
                }}
            >
                <CheckBoxIcon />
            </IconButton>
        </Box>
    );
};
