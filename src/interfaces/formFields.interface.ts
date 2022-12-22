import { type Options } from './option.interface';
import { FORM_FIELD } from 'Enum';

export interface FormFields {
    [FORM_FIELD.gender]: Options;
    [FORM_FIELD.educationalQualificationType]: Options;
    [FORM_FIELD.district]: Options;
    [FORM_FIELD.preferredLanguages]: Options;
    [FORM_FIELD.willingToMove]: Options;
    [FORM_FIELD.englishProficiency]: Options;
    [FORM_FIELD.vehicleOptions]: Options;
    [FORM_FIELD.maritalStatus]: Options;
    [FORM_FIELD.jobRoles]: Options;
    [FORM_FIELD.state]: Options;
    [FORM_FIELD.perkOptions]: Options;
    [FORM_FIELD.workerStatus]: Options;
    [FORM_FIELD.jobQueryWorkerStatus]: Options;
    [FORM_FIELD.employerJobQueryWorkerStatus]: Options;
    [FORM_FIELD.referrerType]: Options;
    [FORM_FIELD.logoPlacement]: Options;
}

export interface MappedField {
    [key: string]: string;
}

export type FormattedFieldMap = {
    [key in keyof FormFields]: MappedField;
};
