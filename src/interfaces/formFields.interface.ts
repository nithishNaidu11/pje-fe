import { type OptionsProps } from './option.interface';
import { FORM_FIELD } from 'Enum';

export interface FormFields {
    [FORM_FIELD.gender]: OptionsProps;
    // [FORM_FIELD.educationalQualificationType]: OptionsProps;
    // [FORM_FIELD.educationalQualificationDetail]: OptionsProps;
    // [FORM_FIELD.district]: OptionsProps;
    // [FORM_FIELD.preferredLanguages]: OptionsProps;
    // [FORM_FIELD.willingToMove]: OptionsProps;
    // [FORM_FIELD.englishProficiency]: OptionsProps;
    // [FORM_FIELD.vehicleOptions]: OptionsProps;
    // [FORM_FIELD.maritalStatus]: OptionsProps;
    // [FORM_FIELD.jobRoles]: OptionsProps;
    // [FORM_FIELD.state]: OptionsProps;
    // [FORM_FIELD.perkOptions]: OptionsProps;
    // [FORM_FIELD.workerStatus]: OptionsProps;
    // [FORM_FIELD.jobQueryWorkerStatus]: OptionsProps;
    // [FORM_FIELD.employerJobQueryWorkerStatus]: OptionsProps;
    // [FORM_FIELD.referrerType]: OptionsProps;
    // [FORM_FIELD.logoPlacement]: OptionsProps;
    // [FORM_FIELD.documentType]: OptionsProps;
    // [FORM_FIELD.jobQueryWorkerCommentStatus]: OptionsProps;
    // [FORM_FIELD.jobQueryWorkerCommunicationStatus]: OptionsProps;
    // [FORM_FIELD.verificationStatus]: OptionsProps;
    // [FORM_FIELD.channelType]: OptionsProps;
    // [FORM_FIELD.channel]: OptionsProps;
    // [FORM_FIELD.matchLabel]: OptionsProps;
    // [FORM_FIELD.candidateStatus]: OptionsProps;
    // [FORM_FIELD.interviewScheduleStatus]: OptionsProps;
    // [FORM_FIELD.interviewTurnUpStatus]: OptionsProps;
    // [FORM_FIELD.interviewSelectionStatus]: OptionsProps;
    // [FORM_FIELD.interviewMode]: OptionsProps;
    // [FORM_FIELD.joiningStatus]: OptionsProps;
    // [FORM_FIELD.countries]: OptionsProps;
    // [FORM_FIELD.documentDuplicateStatus]: OptionsProps;
    // [FORM_FIELD.leadSource]: OptionsProps;
    // [FORM_FIELD.interviewStatus]: OptionsProps;
    // [FORM_FIELD.kycStatus]: OptionsProps;
}

export interface MappedField {
    [key: string]: string;
}

export type FormattedFieldMap = {
    [key in keyof FormFields]: MappedField;
};
