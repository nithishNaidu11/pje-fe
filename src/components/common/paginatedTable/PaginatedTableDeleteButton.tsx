import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Button } from '@mui/material';

import { AppTooltip } from 'components/common/AppTooltip';

interface PaginatedTableDeleteButtonProps {
    handleDelete: VoidFunction;
    disabled?: boolean;
}

export const PaginatedTableDeleteButton = ({
    handleDelete,
    disabled
}: PaginatedTableDeleteButtonProps) => {
    return (
        <AppTooltip title="Delete">
            <Button
                size="small"
                variant="outlined"
                onClick={handleDelete}
                color="primary"
                aria-label="Edit"
                component="span"
                disabled={disabled}
                startIcon={<DeleteOutlinedIcon />}
            >
                Delete
            </Button>
        </AppTooltip>
    );
};
