import { TextOverFlow, DateCell } from 'components/common';

import { RegExUtil } from 'utils';

interface ExtractionCellProps {
    value: string;
    maxWidth?: number;
}

export const ExtractionCell = ({
    value = '',
    maxWidth = 175
}: ExtractionCellProps) => {
    if (RegExUtil.isDate(value)) {
        return <DateCell value={value} />;
    }

    return (
        <TextOverFlow
            value={`${value}`}
            maxWidth={maxWidth}
            sx={{ textAlign: 'left' }}
        />
    );
};
