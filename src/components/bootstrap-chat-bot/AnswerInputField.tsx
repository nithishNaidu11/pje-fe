import { FIELD_TYPE } from 'Enum';
import { Options, QuestionOptionProps } from 'interfaces';
import { Select } from 'components/common/Select';
import { QuestionOptions } from './QuestionOptions';

const getSelectedOption = (options: Options, value: string | undefined) => {
    return value ? options.filter(option => option.value === value)[0] : null;
};

const DROPDOWN_LIMIT = 5;

interface AnswerInputFieldProps {
    options: QuestionOptionProps[];
    questionType: FIELD_TYPE;
    parentKey: string;
    onAnswerClick: (_: { key: string; value: string }) => void;
    answerValue?: string;
}

export const AnswerInputField = ({
    questionType,
    options,
    onAnswerClick,
    parentKey,
    answerValue
}: AnswerInputFieldProps) => {
    switch (questionType) {
        case FIELD_TYPE.YES_NO:
        case FIELD_TYPE.SINGLE_SELECT:
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
                    label=""
                    value={getSelectedOption(options, answerValue)}
                    onChange={(_, selectedOptions) => {
                        if (selectedOptions == null) return;
                        const value = Array.isArray(selectedOptions)
                            ? selectedOptions[0].value
                            : selectedOptions.value;
                        onAnswerClick({
                            key: parentKey,
                            value
                        });
                    }}
                />
            );
        default:
            return <></>;
    }
};
