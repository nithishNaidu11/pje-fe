import { Option } from './option.interface';
import { JOBQUERY_WORKER_STATUS, FIELD_TYPE } from 'Enum';

export interface QuestionOptionProps extends Option {
    next?: string | null;
}

export interface QuestionProps {
    msg: string;
    options: QuestionOptionProps[];
    optionsKey?: string;
}

export interface QuestionsProps {
    [key: string]: {
        id: string;
        key: string;
        next: string | null;
        question: QuestionProps;
        type: FIELD_TYPE;
    };
}

export interface JobQueryFilters {
    gender?: string[] | null;
    minAge?: number | null;
    maxAge?: number | null;
    educationalQualificationType?: string[] | null;
    currentState?: string[] | null;
    currentDistrict?: string[] | null;
    preferredLanguages?: string[] | null;
    maritalStatus?: string[] | null;
    bankDetailsAvailable?: null | boolean;
    isBankAccountVerified?: null | boolean;
    isDifferentlyAbled?: null | boolean;
    ownedVehicle?: null | boolean;
    hasSkillCertification?: null | boolean;
    englishProficiency?: string[] | null;
    willingToMove?: string[] | null;
    workerStatus?: string[] | null;
    minCurrentSalary?: number | null;
    maxCurrentSalary?: number | null;
    minExpectedSalary?: number | null;
    maxExpectedSalary?: number | null;
    isAadhaarVerified?: null | boolean;
    isDoubleVaccinated?: boolean | null;
}

export interface WorkerStatusCountProps {
    status: JOBQUERY_WORKER_STATUS;
    count: number;
}

export interface CreateJobQueryFields {
    title: string;
    name: string;
    customerId: string;
    description: string;
    minSalary: number | null;
    maxSalary: number | null;
    jobState: string | null;
    jobDistrict: string | null;
    jobLocality: string | null;
    interviewDate: string | null;
    perks: string[];
    jobRole: string | null;
    numberOfOpenings: number | null;
    inHandSalary: number | null;
    ctcSalary: number | null;
    header: string | null;
}

export interface JobQueryFields {
    jobQueryId: string;
    companyId: string;
    companyName: string | null;
    companyLogo: string | null;
    title: string;
    name: string;
    customerId: string;
    description: string;
    minSalary: number | null;
    maxSalary: number | null;
    jobState: string | null;
    jobDistrict: string | null;
    jobLocality: string | null;
    interviewDate: string | null;
    perks: string[];
    jobRole: string | null;
    numberOfOpenings: number | null;
    inHandSalary: number | null;
    ctcSalary: number | null;
    header: string | null;
    auditMetadata: {
        createdOn: string;
        updatedOn: string;
        addedBy: string;
    };
    workerStatusCount: WorkerStatusCountProps[];
    customer: {
        legalEntityName: string;
        alias: string;
    };
    questions: QuestionsProps;
    profileUpdateQuestions: QuestionsProps;
}

export interface CreateSingleJobQuery extends CreateJobQueryFields {
    filters: JobQueryFilters;
}

export interface SingleJobQuery extends JobQueryFields {
    filters: JobQueryFilters;
    campaignId: null | string;
}

export interface SingleJobQueryResponse extends SingleJobQuery {
    filters: JobQueryFilters;
    workers: unknown;
}
