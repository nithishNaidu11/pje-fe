import React from 'react';

import { Grid, type SxProps, type Theme, Typography } from '@mui/material';

import { AppTooltip } from './AppTooltip';
import { getSidebarTransition } from 'components/sidebar/SidebarStyles';

import { SettingsContext } from 'contexts';

import { useIsMobile } from 'hooks/useIsMobile';
import { useSidebarHelper } from 'hooks/useSidebarHelper';

import { ReactElement } from 'interfaces';
import { DASHBOARD_PAGE_HEADER } from 'Constants';

interface PageHeaderProps {
    title: string | JSX.Element;
    headerCTA?: ReactElement;
    subtitle?: ReactElement;
    isFullSize: boolean;
    sx?: SxProps<Theme>;
}

export const PageHeader = ({
    title,
    headerCTA,
    subtitle,
    isFullSize,
    sx = {}
}: PageHeaderProps) => {
    const { menuDrawerOpen, showSidebar } = React.useContext(SettingsContext);

    const isMobile = useIsMobile();
    const { getSidebarWidth } = useSidebarHelper();

    const sidebarWidth = React.useMemo(() => {
        return getSidebarWidth({
            showSidebar,
            isMenuDrawerOpen: menuDrawerOpen
        });
    }, [getSidebarWidth, menuDrawerOpen, showSidebar]);

    return (
        <Grid item md={12}>
            <Grid
                id="page-header"
                container
                width={isFullSize ? '100vw' : `calc(100vw - ${sidebarWidth}px)`}
                alignItems="center"
                p={{ xs: 1, sm: 2 }}
                zIndex={3}
                bgcolor="white"
                height={DASHBOARD_PAGE_HEADER.Height}
                justifyContent="space-between"
                mt={isMobile ? 8 : 0}
                sx={{ ...sx, transition: getSidebarTransition('width') }}
            >
                <Grid
                    item
                    md={4}
                    sm={6}
                    xs={6}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid container justifyItems="center" alignItems="center">
                        <Grid item md={12} xs={headerCTA ? 12 : undefined}>
                            <AppTooltip title={title}>
                                <>
                                    <Typography
                                        noWrap
                                        variant={'h6'}
                                        fontWeight={700}
                                        component="div"
                                        gutterBottom={false}
                                        width="100%"
                                    >
                                        {title}
                                    </Typography>
                                </>
                            </AppTooltip>
                        </Grid>
                        <Grid item md={12}>
                            {subtitle}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    item
                    md={8}
                    sm={6}
                    xs={6}
                    alignItems="center"
                    justifyContent={isMobile ? 'start' : 'end'}
                >
                    {headerCTA}
                </Grid>
            </Grid>
        </Grid>
    );
};
