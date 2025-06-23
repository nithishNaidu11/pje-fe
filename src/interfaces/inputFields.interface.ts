import type { DateTimeInputFormat } from 'utils';
import { TEXT_CASE } from 'Enum';

export interface InputField {
    name: string;
    label: string;
    choiceKey: string | null;
    type: string;
    format?: DateTimeInputFormat;
    displayFormat?: DateTimeInputFormat;
    fileKey: string | null;
    validations: {
        minLength: number;
        maxLength: number;
        regex: string;
    };
    systemMandatory?: boolean;
    frontAndBack?: boolean;
    canVerify?: boolean;
    case?: TEXT_CASE;
    next?: string;
    error: string | null;
}

export interface InputFields {
    [key: string]: InputField;
}

interface OrderedInputField extends InputField {
    order: number;
}

export interface OrderedInputFields {
    [key: string]: OrderedInputField;
}
