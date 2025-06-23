import React from 'react';

import { useIsMobile } from './useIsMobile';

import { SIDEBAR_DIMENSION } from 'Constants';

interface SidebarWidthProps {
    showSidebar: boolean;
    isMenuDrawerOpen: boolean;
}

export const useSidebarHelper = () => {
    const isMobile = useIsMobile();

    const getSidebarWidth = React.useCallback(
        ({ showSidebar, isMenuDrawerOpen }: SidebarWidthProps) => {
            return isMobile || !showSidebar
                ? 0
                : isMenuDrawerOpen
                ? SIDEBAR_DIMENSION.openDrawerWidth
                : SIDEBAR_DIMENSION.closedDrawerWidth;
        },
        [isMobile]
    );

    return { getSidebarWidth };
};
