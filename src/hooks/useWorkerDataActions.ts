import React from 'react';

import {
    type Options,
    type FormFields,
    type FormattedFieldMap,
    type Worker
} from 'interfaces';
import { FORM_FIELD } from 'Enum';

interface FormActionsProps {
    formFields?: FormFields;
}

const fieldToFormFieldMap: { [key: string]: keyof FormFields } = {
    ownedVehicle: FORM_FIELD.vehicleOptions,
    currentState: FORM_FIELD.state,
    currentDistrict: FORM_FIELD.district
};

export const useWorkerDataActions = ({ formFields }: FormActionsProps) => {
    const mapObj: FormattedFieldMap = React.useMemo(() => {
        const formFieldKeys = Object.keys(formFields || {}) as Array<
            keyof typeof formFields
        >;
        return formFields
            ? formFieldKeys.reduce(
                  (formFieldMap: any, field: keyof typeof formFields) => {
                      const fieldArray: Options = formFields[field];
                      const fieldMapObj = fieldArray.reduce(
                          (
                              fieldMap: any,
                              datum: { value: string; label: string }
                          ) => {
                              fieldMap[datum.value] = datum.label;
                              return fieldMap;
                          },
                          {}
                      );
                      formFieldMap[field] = fieldMapObj;
                      return formFieldMap;
                  },
                  {} as Record<keyof FormFields, string>
              )
            : {};
    }, [formFields]);

    const getMultipleFormattedFields = (
        fieldName: keyof FormattedFieldMap,
        fieldValue: string[],
        formFieldMapObj: FormattedFieldMap
    ): string => {
        const fieldKey = fieldToFormFieldMap[fieldName]
            ? fieldToFormFieldMap[fieldName]
            : fieldName;

        if (formFieldMapObj[fieldKey])
            return (fieldValue || [])
                .map((datum: string) => formFieldMapObj[fieldKey][datum])
                .join(', ');
        return '';
    };

    const getFormattedBooleanField = (fieldValue: boolean | null) => {
        return fieldValue === false ? 'No' : fieldValue === true ? 'Yes' : '';
    };

    const getFormattedData = React.useCallback(
        (worker: Worker, formFieldMapObj: FormattedFieldMap) => {
            const {
                fullName,
                mobileNumber,
                educationalQualificationType,
                gender,
                workerId,
                englishProficiency,
                workerStatus,
                currentDistrict,
                hasSkillCertification,
                otherDetails,
                preferredLanguages,
                maritalStatus,
                currentAddress,
                permanentAddress,
                permanentDistrict,
                ownedVehicle,
                jobQueryWorkerStatus,
                matchPercentage,
                jobRoles,
                yearsOfExperience,
                isDoubleVaccinated,
                currentState,
                permanentState,
                hasOwnVehicle,
                age,
                referrer,
                auditMetadata
            } = worker;
            return {
                fullName,
                mobileNumber,
                currentDistrict: formFieldMapObj.district
                    ? formFieldMapObj.district[currentDistrict]
                    : currentDistrict,
                educationalQualificationType: getMultipleFormattedFields(
                    FORM_FIELD.educationalQualificationType,
                    educationalQualificationType,
                    formFieldMapObj
                ),
                gender: formFieldMapObj.gender
                    ? formFieldMapObj.gender[gender]
                    : gender,
                workerId,
                englishProficiency: englishProficiency
                    ? formFieldMapObj.englishProficiency[englishProficiency]
                    : '',
                workerStatus: workerStatus
                    ? formFieldMapObj.workerStatus[workerStatus]
                    : '',
                hasSkillCertification: getFormattedBooleanField(
                    hasSkillCertification
                ),
                otherDetails: {
                    ...otherDetails,
                    willingToMove:
                        formFieldMapObj.willingToMove[
                            otherDetails?.willingToMove
                        ],
                    isDifferentlyAbled: getFormattedBooleanField(
                        otherDetails?.isDifferentlyAbled
                    )
                },
                maritalStatus: formFieldMapObj.maritalStatus[maritalStatus],
                currentAddress,
                permanentAddress,
                currentState: formFieldMapObj.state[currentState],
                permanentState: formFieldMapObj.state[permanentState],
                ownedVehicle,
                permanentDistrict: formFieldMapObj.district[permanentDistrict],
                preferredLanguages: getMultipleFormattedFields(
                    FORM_FIELD.preferredLanguages,
                    preferredLanguages,
                    formFieldMapObj
                ),
                jobQueryWorkerStatus: jobQueryWorkerStatus
                    ? formFieldMapObj.jobQueryWorkerStatus[jobQueryWorkerStatus]
                    : '',
                matchPercentage,
                yearsOfExperience,
                isDoubleVaccinated:
                    getFormattedBooleanField(isDoubleVaccinated),
                hasOwnedVehicle: getFormattedBooleanField(hasOwnVehicle),
                age,
                jobRoles: jobRoles
                    ? jobRoles
                          .map(
                              (jobRole: string) =>
                                  formFieldMapObj.jobRoles[jobRole]
                          )
                          .join(', ')
                    : '',
                referrer,
                auditMetadata
            };
        },
        []
    );

    const getSingleWorkerFormattedData = React.useCallback(
        (data: Worker, formFieldMapObj: FormattedFieldMap) => {
            return getFormattedData(data, formFieldMapObj);
        },
        [getFormattedData]
    );

    const getData = React.useCallback(
        (data: { workers: Worker[] }, formFieldMapObj: FormattedFieldMap) => {
            if (data)
                return data.workers.map((worker: Worker) => {
                    return getFormattedData(worker, formFieldMapObj);
                });
            else return [];
        },
        [getFormattedData]
    );

    return {
        getData,
        mapObj,
        getSingleWorkerFormattedData,
        getMultipleFormattedFields
    };
};
