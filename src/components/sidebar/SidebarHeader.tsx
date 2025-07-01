import React from 'react';

import { Fade, Grid, IconButton, Typography } from '@mui/material';
import {
    CaretDoubleLeftIcon as CaretDoubleLeft,
    CaretDoubleRightIcon as CaretDoubleRight
} from '@phosphor-icons/react';

// import LogoFull from 'components/common/LogoFull.svg?react';
import { AppTooltip } from 'components/common';
import { drawerCloseButtonSx, drawerOpenButtonSx } from './SidebarStyles';

import { SettingsContext } from 'contexts';
import { useIsMobile } from 'hooks/useIsMobile';

import { SIDEBAR_DIMENSION } from 'Constants';

export const SidebarHeader = () => {
    const { menuDrawerOpen, handleOpenMenu, handleCloseMenu } =
        React.useContext(SettingsContext);

    const isMobile = useIsMobile();

    return (
        <Grid
            id="sidebar-header"
            display="flex"
            alignItems="center"
            flexDirection={{ xs: 'row-reverse', sm: 'row' }}
            justifyContent={{ xs: 'start', sm: 'space-between' }}
            mb={{ xs: 1, sm: 1.5 }}
            pb={{ xs: 1, sm: 1.5 }}
            pt={{ xs: 1.75, sm: 3 }}
            pl={{ sm: menuDrawerOpen ? 0.75 : undefined }}
            columnGap={2}
            position="sticky"
            top={0}
            bgcolor="white"
            minWidth={
                menuDrawerOpen
                    ? SIDEBAR_DIMENSION.openMenuWidth
                    : SIDEBAR_DIMENSION.closedMenuWidth
            }
            zIndex={2}
        >
            {menuDrawerOpen ? (
                <>
                    <Typography variant="h6">Succeedo Bot</Typography>
                    <IconButton
                        sx={drawerCloseButtonSx}
                        size="small"
                        onClick={handleCloseMenu}
                    >
                        <CaretDoubleLeft size={isMobile ? 24 : 20} />
                    </IconButton>
                </>
            ) : (
                <AppTooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    leaveDelay={200}
                    placement="right"
                    title="Expand"
                >
                    <IconButton
                        size="small"
                        sx={drawerOpenButtonSx}
                        onClick={handleOpenMenu}
                    >
                        <CaretDoubleRight size={20} />
                    </IconButton>
                </AppTooltip>
            )}
        </Grid>
    );
};
