import { FIELD_TYPE } from 'Enum';
import { QuestionOptionProps } from 'interfaces';
import { QuestionOptions } from './QuestionOptions';

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
    return questionType == FIELD_TYPE.SINGLE_SELECT && options.length <= 5 ? (
        <QuestionOptions
            options={options}
            parentKey={parentKey}
            onAnswerClick={onAnswerClick}
            answerValue={answerValue}
        />
    ) : (
        <></>
    );
};
