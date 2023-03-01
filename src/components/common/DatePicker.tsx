import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

interface DatePickerProps {
    name?: string;
    id?: string;
    size?: 'small' | 'medium' | undefined;
    onChange?: (_: Date | null) => void;
    onAccept?: (_: Date | null) => void;
    minDate?: Date;
    value?: string | null;
    label: string;
    inputFormat: string;
    error?: boolean;
    helperText?: string;
}
export const DatePicker = (props: DatePickerProps) => {
    const {
        onChange = () => undefined,
        onAccept = () => undefined,
        minDate,
        value = null,
        label,
        inputFormat,
        name = 'date-picker',
        id = 'date-picker',
        size,
        error,
        helperText
    } = props;
    const errorProp = value == '' ? false : error;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
                label={label}
                inputFormat={inputFormat}
                onChange={onChange}
                onAccept={onAccept}
                minDate={minDate}
                value={value}
                renderInput={params => (
                    <TextField
                        {...params}
                        size={size}
                        fullWidth
                        error={errorProp}
                        helperText={helperText}
                        name={name}
                        id={id}
                    />
                )}
            />
        </LocalizationProvider>
    );
};
