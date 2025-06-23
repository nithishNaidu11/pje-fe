import React from 'react';

export const useGlobalActionsHook = () => {
    const [searchKey, setSearchKey] = React.useState('');
    const [isColumnModifierVisible, setShowColumnModifier] =
        React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenColumnModifier = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            setShowColumnModifier(true);
            setAnchorEl(anchorEl ? null : event.currentTarget);
        },
        [anchorEl]
    );

    const handleCloseColumnModifier = React.useCallback(() => {
        setShowColumnModifier(false);
        setAnchorEl(null);
    }, [setShowColumnModifier]);

    return {
        anchorEl,
        searchKey,
        setSearchKey,
        handleOpenColumnModifier,
        isColumnModifierVisible,
        setShowColumnModifier,
        handleCloseColumnModifier
    };
};
