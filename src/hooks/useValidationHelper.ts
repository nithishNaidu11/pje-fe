import React from 'react';

import type {
    ErrorStateProps,
    FormErrorStateProps,
    ValidationMapProps
} from 'interfaces';

interface HasFormFieldErrorProps {
    fieldName: string;
    fieldValue: string | number | null;
    isRequired?: boolean;
}

interface GetFormErrorStateProps {
    form: Record<string, any>;
    requiredFields?: string[];
}

type ValidationFieldProps =
    | 'fullName'
    | 'name'
    | 'mobileNumber'
    | 'rejectionFeedback'
    | 'referrerType';

export interface ValidationProps {
    required?: boolean;
    validator: (_: string | null) => {
        hasError: boolean;
        errorMsg: string | undefined;
    };
}

type SubmitFormErrorProps = Partial<Record<ValidationFieldProps, string>>;

export const useFieldValidationHelper = () => {
    // const { getStandardInputValidity, getMobileNumberValidity } =
    //     useJQValidationHelper();

    const getFieldValidation = (
        fieldName: ValidationFieldProps
    ): ValidationProps => {
        switch (fieldName) {
            // case 'name':
            // case 'fullName':
            // case 'mobileNumber':
            //     return {
            //         validator: (value: string | null) =>
            //             getMobileNumberValidity(value),
            //         required: true
            //     };
            default:
                return {
                    required: false,
                    validator: () => ({
                        hasError: false,
                        errorMsg: undefined
                    })
                };
        }
    };

    const getFieldError = (
        fieldName: ValidationFieldProps,
        fieldValue: string | null
    ) => {
        const validatorResponse = getFieldValidation(fieldName);

        const validator = validatorResponse.validator?.(fieldValue);

        return {
            hasError: validator.hasError,
            errorMsg: validator.errorMsg
        };
    };

    const getSubmitFormError = (form: SubmitFormErrorProps) => {
        const formErrorState: FormErrorStateProps = Object.keys(form).reduce(
            (errorState, name) => {
                const fieldName = name as ValidationFieldProps;
                const fieldValue = form[fieldName] ?? null;

                const fieldError = getFieldError(fieldName, fieldValue);

                return {
                    ...errorState,
                    [fieldName]: {
                        error: !!fieldError?.hasError,
                        errorMsg: fieldError?.errorMsg
                    }
                };
            },
            {}
        );

        return formErrorState;
    };

    const hasFormError = React.useCallback(
        (formErrorState: FormErrorStateProps) =>
            !!Object.values(formErrorState).find(
                errorState => errorState.error
            ),
        []
    );

    return {
        getSubmitFormError,
        getFieldValidation,
        getFieldError,
        hasFormError
    };
};

export const useValidationHelper = (validationMap: ValidationMapProps = {}) => {
    const hasFormFieldError = ({
        fieldName,
        fieldValue,
        isRequired
    }: HasFormFieldErrorProps) => {
        let error = false;
        const trimmedFieldValue =
            typeof fieldValue === 'number'
                ? `${fieldValue}`
                : fieldValue?.trimStart();
        if (isRequired) {
            error =
                !trimmedFieldValue ||
                (fieldName in validationMap &&
                    !validationMap[fieldName](trimmedFieldValue));
        } else {
            error =
                !!trimmedFieldValue &&
                fieldName in validationMap &&
                !validationMap[fieldName](trimmedFieldValue);
        }
        return error;
    };

    const getFormErrorState = ({
        form,
        requiredFields = []
    }: GetFormErrorStateProps) => {
        const errorState = Object.keys(form).reduce((acc, fieldName) => {
            const isRequired = requiredFields.includes(fieldName);
            if (fieldName in validationMap || isRequired) {
                return {
                    ...acc,
                    [fieldName]: hasFormFieldError({
                        fieldName,
                        fieldValue: form[fieldName],
                        isRequired: isRequired
                    })
                };
            } else {
                return acc;
            }
        }, {});
        return errorState;
    };

    const hasError = (errorState: ErrorStateProps) =>
        Object.values(errorState).indexOf(true) > -1;

    const getFormErrorData = (props: GetFormErrorStateProps) => {
        const errorState = getFormErrorState(props);
        return {
            errorState,
            hasFormError: hasError(errorState)
        };
    };

    // const hasTimeRangeError = (timeSlot: TimeSlotProps) => {
    //     if (
    //         timeSlot.startTime &&
    //         timeSlot.endTime &&
    //         timeSlot.startTime >= timeSlot.endTime
    //     ) {
    //         return { startTime: true, endTime: true };
    //     } else {
    //         return { startTime: false, endTime: false };
    //     }
    // };

    const hasFileSizeError = React.useCallback(
        (file: File, sizeLimit = 5) => file.size / (1024 * 1024) > sizeLimit,
        []
    );

    return {
        hasFormFieldError,
        getFormErrorState,
        getFormErrorData,
        hasError,
        // hasTimeRangeError,
        hasFileSizeError
    };
};
