import React from 'react';

import { type OptionProps, type FormFields, PersonnelProps } from 'interfaces';
import { PERSONNEL_ROLE } from 'Enum';
// import { useAuth } from './useAuth';

export interface TableFilters {
    hasOwnVehicle?: boolean | null;
    hasSkillCertification?: boolean | null;
    isDifferentlyAbled?: boolean | null;
    bankDetailsAvailable?: boolean | null;
    currentState?: string[] | null;
    educationalQualificationType?: string[] | null;
    gender?: string[] | null;
    maxAge?: number | null;
    minAge?: number | null;
    maxCurrentSalary?: number | null;
    minCurrentSalary?: number | null;
    maxExpectedSalary?: number | null;
    minExpectedSalary?: number | null;
    preferredLanguages?: string[] | null;
    age?: {
        min?: number;
        max?: number;
        none?: boolean;
    };
    yearsOfExperience?: {
        min?: number;
        max?: number;
        none?: boolean;
    };
    currentSalary?: {
        min?: number;
        max?: number;
        none?: boolean;
    };
    expectedSalary?: {
        min?: number;
        max?: number;
        none?: boolean;
    };
    referrerType?: string[];
    isCredentialsShared?: boolean | null;
    verificationStatus?: string[];
    addedBy?: string[];
}

export const useTableFilters = (
    formFields?: FormFields,
    personnelData?: PersonnelProps[]
) => {
    // const { loggedInPersonnel } = useAuth();
    // const [filters, setFilters] = React.useState<TableFilters>({});
    // const stateOptions = React.useMemo(() => {
    //     if (formFields) return formFields.state;
    //     return [];
    // }, [formFields]);

    // const districtOptions = React.useMemo(() => {
    //     if (formFields) return formFields.district;
    //     return [];
    // }, [formFields]);

    // const educationalQualificationTypeOptions = React.useMemo(() => {
    //     if (formFields) return formFields.educationalQualificationType;
    //     return [];
    // }, [formFields]);

    // const languageOptions = React.useMemo(() => {
    //     if (formFields) return formFields.preferredLanguages;
    //     return [];
    // }, [formFields]);

    const genderOptions: OptionProps[] = React.useMemo(() => {
        if (formFields) return formFields.gender;
        return [];
    }, [formFields]);

    // const maritalStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.maritalStatus;
    //     return [];
    // }, [formFields]);
    // const preferredLanguagesOptions = React.useMemo(() => {
    //     if (formFields) return formFields.preferredLanguages;
    //     return [];
    // }, [formFields]);

    // const willingToMoveOptions = React.useMemo(() => {
    //     if (formFields) return formFields.willingToMove;
    //     return [];
    // }, [formFields]);

    // const englishProficiencyOptions = React.useMemo(() => {
    //     if (formFields) return formFields.englishProficiency;
    //     return [];
    // }, [formFields]);

    // const jobRoleOptions = React.useMemo(() => {
    //     if (formFields) return formFields.jobRoles;
    //     return [];
    // }, [formFields]);

    // const vehicleOptions = React.useMemo(() => {
    //     if (formFields) return formFields.vehicleOptions;
    //     return [];
    // }, [formFields]);

    // const workerStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.workerStatus;
    //     return [];
    // }, [formFields]);

    // const jobQueryWorkerStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.jobQueryWorkerStatus;
    //     return [];
    // }, [formFields]);

    // const employerJobQueryWorkerStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.employerJobQueryWorkerStatus;
    //     return [];
    // }, [formFields]);

    // const referrerTypeOptions = React.useMemo(() => {
    //     if (formFields) return formFields.referrerType;
    //     return [];
    // }, [formFields]);

    // const booleanOptions: OptionProps[] = React.useMemo(
    //     () => [
    //         { label: 'Yes', value: 'TRUE' },
    //         { label: 'No', value: 'FALSE' }
    //     ],
    //     []
    // );

    // const jqWorkerCommentStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.jobQueryWorkerCommentStatus;
    //     return [];
    // }, [formFields]);

    // const jqWorkerCommStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.jobQueryWorkerCommunicationStatus;
    //     return [];
    // }, [formFields]);

    // const jqInterestedWorkerFunnelStatusOptions: OptionProps[] = React.useMemo(
    //     () =>
    //         jobQueryWorkerStatusOptions.filter(datum =>
    //             [
    //                 JOBQUERY_WORKER_STATUS.INTERESTED,
    //                 JOBQUERY_WORKER_STATUS.NOT_INTERESTED
    //             ].includes(datum.value as JOBQUERY_WORKER_STATUS)
    //         ),
    //     [jobQueryWorkerStatusOptions]
    // );

    // const jqQualifiedWorkerFunnelStatusOptions: OptionProps[] = React.useMemo(
    //     () =>
    //         jobQueryWorkerStatusOptions.filter(datum =>
    //             [
    //                 JOBQUERY_WORKER_STATUS.QUALIFIED,
    //                 JOBQUERY_WORKER_STATUS.NOT_QUALIFIED
    //             ].includes(datum.value as JOBQUERY_WORKER_STATUS)
    //         ),
    //     [jobQueryWorkerStatusOptions]
    // );

    // const verificationStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.verificationStatus;
    //     return [];
    // }, [formFields]);

    // const candidateStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.candidateStatus;
    //     return [];
    // }, [formFields]);

    // const matchLabelOptions = React.useMemo(() => {
    //     if (formFields) return formFields.matchLabel;
    //     return [];
    // }, [formFields]);

    // const interviewScheduleStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.interviewScheduleStatus;
    //     return [];
    // }, [formFields]);

    // const interviewTurnUpStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.interviewTurnUpStatus;
    //     return [];
    // }, [formFields]);

    // const interviewSelectionStatusOptions = React.useMemo(() => {
    //     if (formFields)
    //         return formFields.interviewSelectionStatus.filter(
    //             option => option.value !== IS_SELECTION_STATUS.ON_HOLD
    //         );
    //     return [];
    // }, [formFields]);

    // const interviewerSelectionStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.interviewSelectionStatus;
    //     return [];
    // }, [formFields]);

    // const interviewStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.interviewStatus;
    //     return [];
    // }, [formFields]);

    // const leadSourceOptions = React.useMemo(() => {
    //     if (formFields) return formFields.leadSource;
    //     return [];
    // }, [formFields]);

    const personnelOptions = React.useMemo(() => {
        if (personnelData) {
            const options = personnelData
                .filter(option => option.role === PERSONNEL_ROLE.SUPERVISOR)
                .map(option => {
                    return {
                        // label:
                        //     option.email === loggedInPersonnel?.email
                        //         ? 'Self'
                        //         : option.email,
                        label: option.email,
                        value: option.email
                    };
                });
            return options;
        }

        return [];
    }, [personnelData]);

    // const leadSourceFilterOptions = React.useMemo(() => {
    //     return [...(leadSourceOptions ?? []), ...personnelOptions];
    // }, [leadSourceOptions, personnelOptions]);

    // const joiningStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.joiningStatus;
    //     return [];
    // }, [formFields]);

    // const documentDuplicateStatusOptions = React.useMemo(() => {
    //     if (formFields) return formFields.documentDuplicateStatus;
    //     return [];
    // }, [formFields]);

    // const kycStatusOptions = React.useMemo(() => {
    //     if (formFields)
    //         return formFields.kycStatus.map(kycField => {
    //             return {
    //                 ...kycField,
    //                 label: kycField.label.replace('KYC', 'Candidature')
    //             };
    //         });
    //     return [];
    // }, [formFields]);

    return {
        // filters,
        // districtOptions,
        // stateOptions,
        // educationalQualificationTypeOptions,
        // languageOptions,
        genderOptions,
        // maritalStatusOptions,
        // preferredLanguagesOptions,
        // willingToMoveOptions,
        // englishProficiencyOptions,
        // jobRoleOptions,
        // vehicleOptions,
        // workerStatusOptions,
        // jobQueryWorkerStatusOptions,
        // employerJobQueryWorkerStatusOptions,
        // booleanOptions,
        // referrerTypeOptions,
        // jqInterestedWorkerFunnelStatusOptions,
        // jqWorkerCommentStatusOptions,
        // jqWorkerCommStatusOptions,
        // jqQualifiedWorkerFunnelStatusOptions,
        // channelOptions: formFields?.channel || [],
        // channelTypeOptions: formFields?.channelType || [],
        // setFilters,
        // verificationStatusOptions,
        // candidateStatusOptions,
        // matchLabelOptions,
        // interviewScheduleStatusOptions,
        // interviewTurnUpStatusOptions,
        // interviewSelectionStatusOptions,
        // interviewerSelectionStatusOptions,
        // interviewStatusOptions,
        personnelOptions
        // leadSourceFilterOptions,
        // joiningStatusOptions,
        // documentDuplicateStatusOptions,
        // leadSourceOptions,
        // kycStatusOptions
    };
};
