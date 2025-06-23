import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import { AppTooltip } from 'components/common/AppTooltip';

interface PaginatedTableEditButtonProps {
    handleEdit: VoidFunction;
    isDisabled?: boolean;
}

export const PaginatedTableEditButton = ({
    handleEdit,
    isDisabled
}: PaginatedTableEditButtonProps) => {
    return (
        <AppTooltip title="Edit">
            <Button
                size="small"
                variant="outlined"
                onClick={handleEdit}
                color="primary"
                aria-label="Edit"
                component="span"
                disabled={isDisabled}
                startIcon={<EditIcon />}
            >
                Edit
            </Button>
        </AppTooltip>
    );
};
