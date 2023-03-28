import { type OptionsProps } from './option.interface';
import { FORM_FIELD } from 'Enum';

export interface FormFields {
    [FORM_FIELD.gender]: OptionsProps;
    [FORM_FIELD.educationalQualificationType]: OptionsProps;
    [FORM_FIELD.district]: OptionsProps;
    [FORM_FIELD.preferredLanguages]: OptionsProps;
    [FORM_FIELD.willingToMove]: OptionsProps;
    [FORM_FIELD.englishProficiency]: OptionsProps;
    [FORM_FIELD.vehicleOptions]: OptionsProps;
    [FORM_FIELD.maritalStatus]: OptionsProps;
    [FORM_FIELD.jobRoles]: OptionsProps;
    [FORM_FIELD.state]: OptionsProps;
    [FORM_FIELD.perkOptions]: OptionsProps;
    [FORM_FIELD.workerStatus]: OptionsProps;
    [FORM_FIELD.jobQueryWorkerStatus]: OptionsProps;
    [FORM_FIELD.employerJobQueryWorkerStatus]: OptionsProps;
    [FORM_FIELD.referrerType]: OptionsProps;
    [FORM_FIELD.logoPlacement]: OptionsProps;
}

export interface MappedField {
    [key: string]: string;
}

export type FormattedFieldMap = {
    [key in keyof FormFields]: MappedField;
};
