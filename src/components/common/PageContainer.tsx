import React from 'react';

import { Grid, type SxProps } from '@mui/material';

import { getPageContainerSx } from 'components/sidebar/SidebarStyles';

import { SettingsContext } from 'contexts';
import { useIsMobile } from 'hooks/useIsMobile';
import { useSidebarHelper } from 'hooks/useSidebarHelper';

interface PageContainerProps {
    children: JSX.Element;
    isFullSize: boolean;
}

export const PageContainer = ({ children, isFullSize }: PageContainerProps) => {
    const { menuDrawerOpen, showSidebar } = React.useContext(SettingsContext);

    const isMobile = useIsMobile();
    const { getSidebarWidth } = useSidebarHelper();

    const pageContainerSx: SxProps = React.useMemo(() => {
        const sidebarWidth = getSidebarWidth({
            showSidebar,
            isMenuDrawerOpen: menuDrawerOpen
        });
        return getPageContainerSx({
            isFullSize,
            isMobile,
            sidebarWidth
        });
    }, [getSidebarWidth, isFullSize, isMobile, menuDrawerOpen, showSidebar]);

    return (
        <Grid item md={12}>
            <Grid id="page-container" container sx={pageContainerSx}>
                {children}
            </Grid>
        </Grid>
    );
};
