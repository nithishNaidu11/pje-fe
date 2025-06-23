import React from 'react';

import Button from '@mui/material/Button';
import TuneIcon from '@mui/icons-material/Tune';

import { AppTooltip } from './AppTooltip';

interface ColumnModifierButtonProps {
    isColumnModifierVisible: boolean;
    handleOpenColumnModifier: (event: React.MouseEvent<HTMLElement>) => void;
}

export const ColumnModifierButton = ({
    isColumnModifierVisible,
    handleOpenColumnModifier
}: ColumnModifierButtonProps) => {
    const onOpenColumnModifier = (event: React.MouseEvent<HTMLElement>) => {
        handleOpenColumnModifier(event);
    };

    return (
        <AppTooltip title="Customize columns">
            <Button
                aria-describedby="column-modifier"
                size="small"
                onClick={onOpenColumnModifier}
                variant={isColumnModifierVisible ? 'contained' : 'outlined'}
                color="primary"
                aria-label="Customize columns"
                component="span"
                startIcon={<TuneIcon />}
            >
                Customize
            </Button>
        </AppTooltip>
    );
};
