import React from 'react';

import { ExtractionCell, type Column, type Cell } from 'components/common';

import { type OrderedInputFields } from 'interfaces';
import { DataUtils } from 'utils';

interface PJEDynamicColumnsProps {
    templateFields: OrderedInputFields;
}

export const PJEDynamicColumns = ({
    templateFields
}: PJEDynamicColumnsProps): Column[] => {
    const sortedFieldKeys = React.useMemo(
        () =>
            Object.entries(templateFields)
                .sort(
                    ([, firstField], [, secondField]) =>
                        firstField?.order - secondField?.order
                )
                .map(([key]) => key),
        [templateFields]
    );

    const columns: Array<Column> = React.useMemo(
        () =>
            sortedFieldKeys?.map((i: string) => {
                const field = templateFields[i];
                return {
                    id: field.name,
                    accessor: `templateDict.${field.name}`,
                    Header: field.label,
                    headerText: field.label,
                    isVisible: true,
                    minWidth: 265,
                    Cell: ({ row }: Cell) => {
                        const {
                            original: { templateDict }
                        } = row;

                        return (
                            <ExtractionCell
                                value={
                                    templateDict[
                                        DataUtils.toCamel(field.name)
                                    ] ?? ''
                                }
                                maxWidth={265}
                            />
                        );
                    }
                };
            }),
        [sortedFieldKeys, templateFields]
    );

    return columns;
};
