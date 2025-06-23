import * as React from 'react';

import { Button } from '@mui/material';

interface PaginatedTableSelectAllButtonProps {
    onSelectAllClick: VoidFunction;
    onDeSelectAllClick: VoidFunction;
    isAllSelected: boolean;
    selectedRecordsCount: number;
    totalRecordsCount: number;
    excludedIdsCount?: number;
}

export const PaginatedTableSelectAllButton = ({
    onSelectAllClick,
    onDeSelectAllClick,
    isAllSelected,
    excludedIdsCount = 0
}: PaginatedTableSelectAllButtonProps) => {
    const [selectAllCTAText, setSelectAllCTAText] =
        React.useState('Select All');

    React.useEffect(() => {
        setSelectAllCTAText(isAllSelected ? 'Deselect All' : 'Select All');
    }, [isAllSelected, excludedIdsCount]);

    const handleToggleSelectAll = () => {
        if (isAllSelected) {
            onDeSelectAllClick();
        } else {
            onSelectAllClick();
        }
    };
    return (
        <Button
            variant="text"
            fullWidth
            onClick={handleToggleSelectAll}
            sx={{ width: 96 }}
        >
            {selectAllCTAText}
        </Button>
    );
};
