import _ from 'lodash';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FORM_FIELD } from 'Enum';
import { useWorkerDataActions } from 'hooks';
import { FormFields, SingleJobQuery, type JobQueryFilters } from 'interfaces';
import { JobQueryDetailsField } from './JobQueryDetailsField';

type FilterMapOptions = {
    [key in keyof JobQueryFilters]?: { label: string };
};

const filterMap: FilterMapOptions = {
    [FORM_FIELD.gender]: { label: 'Gender' },
    [FORM_FIELD.educationalQualificationType]: {
        label: 'Education qualification'
    },
    [FORM_FIELD.preferredLanguages]: { label: 'Preferred languages' },
    [FORM_FIELD.englishProficiency]: { label: 'English proficiency' },
    [FORM_FIELD.willingToMove]: { label: 'Willing to move distance' },
    [FORM_FIELD.maritalStatus]: { label: 'Marital status' },
    currentState: { label: 'Current state' },
    [FORM_FIELD.workerStatus]: { label: 'Worker status' },
    minAge: { label: 'Minimum age' },
    maxAge: { label: 'Maximum age' },
    bankDetailsAvailable: { label: 'Bank details available' },
    isBankAccountVerified: { label: 'Bank account verified' },
    isDifferentlyAbled: { label: 'Is differently abled' },
    ownedVehicle: { label: 'Vehicle type' },
    hasSkillCertification: { label: 'Has certification' },
    minCurrentSalary: { label: 'Minimum current salary' },
    maxCurrentSalary: { label: 'Maximum current salary' },
    minExpectedSalary: { label: 'Minimum expected salary' },
    maxExpectedSalary: { label: 'Maximum expected salary' },
    isAadhaarVerified: { label: 'Is aadhaar verified' },
    isDoubleVaccinated: { label: 'Is double vaccinated' }
};

interface JobQueryDetailsProps {
    jobQuery: SingleJobQuery;
    formFields: FormFields;
    isDialog?: boolean;
}

export const JobQueryDetails = ({
    formFields,
    jobQuery,
    isDialog = false
}: JobQueryDetailsProps) => {
    const { mapObj, getMultipleFormattedFields } = useWorkerDataActions({
        formFields
    });

    const filterKeys = Object.keys(jobQuery.filters) as Array<
        keyof typeof jobQuery.filters
    >;

    return (
        <>
            {mapObj && Object.keys(mapObj).length && (
                <Grid container width={isDialog ? '540px' : 'inherit'}>
                    <Grid item xs={12} mt={3}>
                        <Typography
                            gutterBottom={false}
                            variant="h6"
                            fontWeight={600}
                        >
                            Job Description
                        </Typography>
                        <Typography
                            gutterBottom={false}
                            paragraph
                            component="span"
                            variant="body2"
                        >
                            {jobQuery.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                        {/* <JobQueryDetailsField
                            fieldName={'Customer'}
                            fieldValue={jobQuery.customer.legalEntityName}
                        /> */}
                        {!!jobQuery.customJobRole && (
                            <JobQueryDetailsField
                                fieldName={'Role'}
                                fieldValue={jobQuery.customJobRole}
                            />
                        )}
                        {!!jobQuery.numberOfOpenings && (
                            <JobQueryDetailsField
                                fieldName={'Workers Required'}
                                fieldValue={jobQuery.numberOfOpenings}
                            />
                        )}
                        {!!jobQuery.customJobDistrict && (
                            <JobQueryDetailsField
                                fieldName={'Job district'}
                                fieldValue={jobQuery.customJobDistrict}
                            />
                        )}
                        {jobQuery.perks && !!jobQuery.perks.length && (
                            <JobQueryDetailsField
                                fieldName={'Perks'}
                                fieldValue={getMultipleFormattedFields(
                                    FORM_FIELD.perkOptions,
                                    jobQuery.perks,
                                    mapObj
                                )}
                            />
                        )}
                        {!!jobQuery.inHandSalary || !!jobQuery.ctcSalary ? (
                            <>
                                {!!jobQuery.inHandSalary && (
                                    <JobQueryDetailsField
                                        fieldName={'In hand salary'}
                                        fieldValue={jobQuery.inHandSalary}
                                    />
                                )}
                                {!!jobQuery.ctcSalary && (
                                    <JobQueryDetailsField
                                        fieldName={'CTC salary'}
                                        fieldValue={jobQuery.ctcSalary}
                                    />
                                )}
                            </>
                        ) : !!jobQuery.minSalary || !!jobQuery.maxSalary ? (
                            <>
                                {!!jobQuery.minSalary && (
                                    <JobQueryDetailsField
                                        fieldName={'Minimum salary'}
                                        fieldValue={jobQuery.minSalary}
                                    />
                                )}
                                {!!jobQuery.maxSalary && (
                                    <JobQueryDetailsField
                                        fieldName={'Maximum salary'}
                                        fieldValue={jobQuery.maxSalary}
                                    />
                                )}
                            </>
                        ) : (
                            <JobQueryDetailsField
                                fieldName={'Salary'}
                                fieldValue={'Negotiable'}
                            />
                        )}
                        {!!jobQuery.interviewDate && (
                            <JobQueryDetailsField
                                fieldName={'Interview date'}
                                fieldValue={jobQuery.interviewDate}
                            />
                        )}
                        {!!jobQuery.jobLocality && (
                            <JobQueryDetailsField
                                fieldName={'Job address'}
                                fieldValue={jobQuery.jobLocality}
                            />
                        )}
                        {filterKeys.map((key: keyof JobQueryFilters) => {
                            if (Array.isArray(jobQuery.filters[key])) {
                                const filterKey = key as FORM_FIELD;
                                return (
                                    filterMap[key] && (
                                        <JobQueryDetailsField
                                            key={`${filterKey}`}
                                            fieldName={_.get(
                                                filterMap[key],
                                                'label',
                                                ''
                                            )}
                                            fieldValue={getMultipleFormattedFields(
                                                filterKey,
                                                _.get(
                                                    jobQuery.filters,
                                                    filterKey,
                                                    []
                                                ),
                                                mapObj
                                            )}
                                        />
                                    )
                                );
                            } else {
                                return (
                                    filterMap[key] && (
                                        <JobQueryDetailsField
                                            key={key}
                                            fieldName={_.get(
                                                filterMap[key],
                                                'label',
                                                ''
                                            )}
                                            fieldValue={
                                                jobQuery.filters[key] === true
                                                    ? 'Yes'
                                                    : jobQuery.filters[key] ===
                                                      false
                                                    ? 'No'
                                                    : jobQuery.filters[key]
                                            }
                                        />
                                    )
                                );
                            }
                        })}
                    </Grid>
                </Grid>
            )}
        </>
    );
};
