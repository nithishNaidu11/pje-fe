import { DATE_FILTER_TYPE } from '@hunar.ai/hunar-design-system';

import { FILTER_TYPE, SORT_TYPE } from 'Enum';
import type { HandleSortProps, OptionsProps, Sort } from 'interfaces';

export interface TableFiltersProps {
    gender?: string[];
    maritalStatus?: string[];
    currentDistrict?: string[];
    currentState?: string[];
    permanentDistrict?: string[];
    permanentState?: string[];
    jobRoles?: string[];
    preferredLanguages?: string[];
    educationalQualificationType?: string[];
    isAadhaarVerified?: string[];
    isDifferentlyAbled?: string[];
    hasOwnVehicle?: string[];
    bankDetailsAvailable?: string[];
    isDoubleVaccinated?: string[];
    hasSkillCertification?: string[];
    englishProficiency?: string[];
    willingToMove?: string[];
    workerStatus?: string[];
    ownedVehicle?: string[];
    jobQueryWorkerStatus?: string[];
    isBankAccountVerified?: string[];
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
    isCredentialsShared?: string[];
    verificationStatus?: string[];
    candidateStatus?: string[];
    createdOn?: DateFilterStateProps;
    updatedOn?: DateFilterStateProps;
    dateOfBirth?: DateFilterStateProps;
    interviewScheduleDate?: DateFilterStateProps;
    dateOfJoining?: DateFilterStateProps;
    addedBy?: string[];
    status?: string[];
    jobQueryWorkerCommunicationStatus?: string[];
    commentStatus?: string[];
    communicationStatus?: string[];
    channel?: string[];
    channelType?: string[];
    matchLabel?: string[];
    scheduleStatus?: string[];
    turnUpStatus?: string[];
    selectionStatus?: string[];
    callingStatus_1?: string[];
    callingStatus_2?: string[];
    callingStatus_3?: string[];
    source?: string[];
    joiningStatus?: string[];
    interviewStatus?: string[];
    finalSelectionStatus?: string[];
    kycStatus?: string[];
}

export type FilterKeyProps =
    | 'gender'
    | 'maritalStatus'
    | 'currentDistrict'
    | 'currentState'
    | 'jobRoles'
    | 'preferredLanguages'
    | 'educationalQualificationType'
    | 'isAadhaarVerified'
    | 'isDoubleVaccinated'
    | 'hasSkillCertification'
    | 'englishProficiency'
    | 'willingToMove'
    | 'workerStatus'
    | 'age'
    | 'yearsOfExperience'
    | 'currentSalary'
    | 'permanentState'
    | 'permanentDistrict'
    | 'ownedVehicle'
    | 'jobQueryWorkerStatus'
    | 'expectedSalary'
    | 'bankDetailsAvailable'
    | 'hasOwnVehicle'
    | 'isDifferentlyAbled'
    | 'isBankAccountVerified'
    | 'isAadhaarVerified'
    | 'referrerType'
    | 'status'
    | 'isCredentialsShared'
    | 'commentStatus'
    | 'communicationStatus'
    | 'isCredentialsShared'
    | 'verificationStatus'
    | 'candidateStatus'
    | 'createdOn'
    | 'updatedOn'
    | 'addedBy'
    | 'channel'
    | 'channelType'
    | 'matchLabel'
    | 'scheduleStatus'
    | 'turnUpStatus'
    | 'selectionStatus'
    | 'callingStatus_1'
    | 'callingStatus_2'
    | 'callingStatus_3'
    | 'source'
    | 'joiningStatus'
    | 'interviewStatus'
    | 'finalSelectionStatus'
    | 'dateOfBirth'
    | 'interviewScheduleDate'
    | 'dateOfJoining'
    | 'kycStatus';

export type MultiSelectFilterKeyProps =
    | 'gender'
    | 'maritalStatus'
    | 'currentDistrict'
    | 'currentState'
    | 'jobRoles'
    | 'preferredLanguages'
    | 'educationalQualificationType'
    | 'isAadhaarVerified'
    | 'isDoubleVaccinated'
    | 'hasSkillCertification'
    | 'englishProficiency'
    | 'willingToMove'
    | 'workerStatus'
    | 'permanentState'
    | 'permanentDistrict'
    | 'ownedVehicle'
    | 'jobQueryWorkerStatus'
    | 'bankDetailsAvailable'
    | 'isDifferentlyAbled'
    | 'hasOwnVehicle'
    | 'isBankAccountVerified'
    | 'status'
    | 'referrerType'
    | 'isCredentialsShared'
    | 'verificationStatus'
    | 'candidateStatus'
    | 'addedBy'
    | 'communicationStatus'
    | 'commentStatus'
    | 'channel'
    | 'channelType'
    | 'matchLabel'
    | 'scheduleStatus'
    | 'turnUpStatus'
    | 'selectionStatus'
    | 'callingStatus_1'
    | 'callingStatus_2'
    | 'callingStatus_3'
    | 'source'
    | 'joiningStatus'
    | 'interviewStatus'
    | 'finalSelectionStatus'
    | 'kycStatus';

export type DateRangeFilterKeyProps =
    | 'createdOn'
    | 'updatedOn'
    | 'dateOfBirth'
    | 'interviewScheduleDate'
    | 'dateOfJoining';

export interface ColumnActionsProps {
    sortProps: {
        sort?: Sort;
        handleSort: HandleSortProps;
        sortType?: SORT_TYPE;
    };
    filterProps?: {
        filterType?: FILTER_TYPE;
        keyword?: string;
        options?: OptionsProps;
        filters: {
            tableFilters: TableFiltersProps;
            dateFilterTypeMap?: DateFilterTypeMapProps;
            hideBlanks?: boolean;
            setTableFilters: (_: TableFiltersProps) => void;
            setDateFilterTypeMap?: (_: DateFilterTypeMapProps) => void;
        };
    };
}

export interface DateFilterStateProps {
    startDate?: string | null;
    endDate?: string | null;
}

export type Unit = 'days' | 'months' | 'years';

interface DateRangeFilterDate {
    period: number;
    unit?: Unit;
}

export interface DateRangeFilterOptionProps {
    [key: string]: {
        label: string;
        value: string;
        extraProps: {
            startDate: DateRangeFilterDate;
            endDate: DateRangeFilterDate;
        };
    };
}

export interface ColumnFilterProps {
    column: {
        columnActionsProps: ColumnActionsProps;
        id:
            | 'gender'
            | 'maritalStatus'
            | 'currentDistrict'
            | 'currentState'
            | 'permanentDistrict'
            | 'permanentState'
            | 'jobRoles'
            | 'preferredLanguages'
            | 'educationalQualificationType'
            | 'isAadhaarVerified'
            | 'isBankAccountVerified'
            | 'hasSkillCertification'
            | 'englishProficiency'
            | 'willingToMove'
            | 'workerStatus'
            | 'age'
            | 'yearsOfExperience'
            | 'otherDetails.currentSalary'
            | 'otherDetails.expectedSalary'
            | 'ownedVehicle'
            | 'jobQueryWorkerStatus'
            | 'bankDetailsAvailable'
            | 'isBankAccountVerified'
            | 'isDifferentlyAbled'
            | 'referrerType'
            | 'isCredentialsShared'
            | 'verificationStatus'
            | 'candidateStatus'
            | 'auditMetadata.createdOn'
            | 'auditMetadata.addedBy'
            | 'commentStatus'
            | 'communicationStatus'
            | 'joiningStatus'
            | 'matchLabel'
            | 'interviewStatus'
            | 'finalSelectionStatus'
            | 'kycStatus';
    };
}

export interface DateFilterTypeMapProps {
    [key: string]: DATE_FILTER_TYPE;
}
