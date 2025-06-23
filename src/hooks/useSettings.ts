import React from 'react';

import { useLocalStorage } from 'hooks/useLocalStorage';

export const useSettings = () => {
    const { setItem, getItem } = useLocalStorage();
    const [menuDrawerOpen, setMenuDrawerOpen] = React.useState<boolean>(
        !!getItem('settings.menu.open')
    );

    const handleOpenMenu = React.useCallback(() => {
        setMenuDrawerOpen(true);
        setItem('settings.menu.open', true);
    }, [setItem]);

    const handleCloseMenu = React.useCallback(() => {
        setMenuDrawerOpen(false);
        setItem('settings.menu.open', false);
    }, [setItem]);

    return {
        menuDrawerOpen,
        handleOpenMenu,
        handleCloseMenu
    };
};
