import React from 'react';

import { PJEDynamicColumns } from './PJEDynamicColumns';

import { type Column, Cell, LinkCell } from 'components/common';
import { type OrderedInputFields } from 'interfaces';
import { COLUMN_STICKY_TYPE } from 'Enum';

interface PJEColumnsProps {
    templateFields: OrderedInputFields;
}

export const PJEColumns = ({ templateFields }: PJEColumnsProps) => {
    const dynamicColumns = PJEDynamicColumns({
        templateFields
    });

    const columns: Array<Column> = React.useMemo(
        () => [
            {
                id: 'source',
                accessor: 'source',
                Header: 'Source',
                headerText: 'Source',
                sticky: COLUMN_STICKY_TYPE.LEFT,
                minWidth: 160,
                height: '41.8px'
            },
            {
                id: 'applicantCode',
                accessor: 'applicantCode',
                Header: 'Applicant Code',
                headerText: 'Applicant Code',
                sticky: COLUMN_STICKY_TYPE.LEFT,
                minWidth: 160
            },
            {
                id: 'fullName',
                accessor: 'fullName',
                Header: 'Full Name',
                headerText: 'Full Name',
                sticky: COLUMN_STICKY_TYPE.LEFT,
                minWidth: 180
            },
            {
                id: 'employeeStatus',
                accessor: 'employeeStatus',
                Header: 'Employee Status',
                headerText: 'Employee Status',
                minWidth: 160
            },
            {
                id: 'email',
                accessor: 'email',
                Header: 'Personal Email ID',
                headerText: 'Personal Email ID'
            },
            {
                id: 'mobileNumber',
                accessor: 'mobileNumber',
                Header: 'Mobile Number',
                headerText: 'Mobile Number',
                minWidth: 180
            },
            {
                id: 'gender',
                accessor: 'gender',
                Header: 'Gender',
                headerText: 'Gender'
            },
            {
                id: 'alternateNumber',
                accessor: 'alternateNumber',
                Header: 'Alternet Number',
                headerText: 'Alternet Number',
                minWidth: 180
            },
            {
                id: 'alternateContactPersonName',
                accessor: 'alternateContactPersonName',
                Header: 'Alternet Contact Person Name',
                headerText: 'Alternet Contact Person Name',
                minWidth: 265
            },
            {
                id: 'jobBandOffered',
                accessor: 'jobBandOffered',
                Header: 'Job Band (Offered) - Optional',
                headerText: 'Job Band (Offered) - Optional',
                minWidth: 265
            },
            {
                id: 'offerAcceptedDate',
                accessor: 'offerAcceptedDate',
                Header: 'Offer Accepted Date',
                headerText: 'Offer Accepted Date',
                minWidth: 180
            },
            {
                id: 'dateOfJoining',
                accessor: 'dateOfJoining',
                Header: 'Expected Date of Joining',
                headerText: 'Expected Date of Joining',
                minWidth: 265
            },
            {
                id: 'dateOfBirth',
                accessor: 'dateOfBirth',
                Header: 'Date of Birth',
                headerText: 'Date of Birth',
                minWidth: 180
            },
            {
                id: 'entity',
                accessor: 'entity',
                Header: 'Entity',
                headerText: 'Entity',
                minWidth: 160
            },
            {
                id: 'function',
                accessor: 'function',
                Header: 'Function',
                headerText: 'Function',
                minWidth: 180
            },
            {
                id: 'subFunction',
                accessor: 'subFunction',
                Header: 'Sub Function',
                headerText: 'Sub Function',
                minWidth: 180
            },
            {
                id: 'department',
                accessor: 'department',
                Header: 'Department',
                headerText: 'Department',
                minWidth: 180
            },
            {
                id: 'subDepartment',
                accessor: 'subDepartment',
                Header: 'Sub Department',
                headerText: 'Sub Department',
                minWidth: 180
            },
            {
                id: 'branchName',
                accessor: 'branchName',
                Header: 'Branch Name',
                headerText: 'Branch Name',
                minWidth: 180
            },
            {
                id: 'branchCode',
                accessor: 'branchCode',
                Header: 'Branch code',
                headerText: 'Branch code',
                minWidth: 180
            },
            {
                id: 'branchAddress',
                accessor: 'branchAddress',
                Header: 'Branch Address',
                headerText: 'Branch Address',
                minWidth: 180
            },
            {
                id: 'zone',
                accessor: 'zone',
                Header: 'Zone',
                headerText: 'Zone',
                minWidth: 160
            },
            {
                id: 'state',
                accessor: 'state',
                Header: 'State',
                headerText: 'State',
                minWidth: 160
            },
            {
                id: 'city',
                accessor: 'city',
                Header: 'City',
                headerText: 'City',
                minWidth: 160
            },
            {
                id: 'l1ManagerName',
                accessor: 'l1ManagerName',
                Header: 'L1 Manager Name',
                headerText: 'L1 Manager Name',
                minWidth: 220
            },
            {
                id: 'l1ManagerCode',
                accessor: 'l1ManagerCode',
                Header: 'L1 Manager Code',
                headerText: 'L1 Manager Code',
                minWidth: 220
            },
            {
                id: 'hrManagerName',
                accessor: 'hrManagerName',
                Header: 'HR Manager Name',
                headerText: 'HR Manager Name',
                minWidth: 220
            },
            {
                id: 'hrManagerCode',
                accessor: 'hrManagerCode',
                Header: 'HR Manager code',
                headerText: 'HR Manager code',
                minWidth: 220
            },
            {
                id: 'functionalDesignation',
                accessor: 'functionalDesignation',
                Header: 'Functional Designation',
                headerText: 'Functional Designation',
                minWidth: 265
            },
            {
                id: 'jobBandDesignation',
                accessor: 'jobBandDesignation',
                Header: 'Job Band Designation',
                headerText: 'Job Band Designation',
                minWidth: 265
            },
            {
                id: 'payrollType',
                accessor: 'payrollType',
                Header: 'Payroll Type',
                headerText: 'Payroll Type',
                minWidth: 180
            },
            ...dynamicColumns,
            {
                id: 'quizStatus',
                accessor: 'quizStatus',
                Header: 'Assessment Status',
                headerText: 'Assessment Status',
                minWidth: 180
            },
            {
                id: 'quizScore',
                accessor: 'quizScore',
                Header: 'Assessment Score',
                headerText: 'Assessment Score',
                minWidth: 160
            },
            {
                id: 'quizLink',
                accessor: 'quizLink',
                Header: 'Assessment Report',
                headerText: 'Assessment Report',
                minWidth: 180,
                Cell: ({ value }: Cell) => {
                    return value ? (
                        <LinkCell
                            value="Assessment Report"
                            target="_blank"
                            link={value}
                        />
                    ) : null;
                }
            }
        ],
        [dynamicColumns]
    );
    return columns;
};
