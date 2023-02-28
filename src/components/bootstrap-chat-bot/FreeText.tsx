import React from 'react';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        if (isFocused == false) {
            const timeoutID = setTimeout(() => setValue(answerValue));
            return () => clearTimeout(timeoutID);
        }
    }, [answerValue, isFocused]);

    return (
        <OutlinedInput
            size="small"
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        sx={{ opacity: isFocused ? 1 : 0 }}
                        aria-label="submit answer"
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
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => {
                setIsFocused(true);
            }}
            onBlur={() => {
                setIsFocused(false);
            }}
        />
    );
};
