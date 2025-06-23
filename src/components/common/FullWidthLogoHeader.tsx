import * as React from 'react';

import { Grid, Box, IconButton, AppBar, Toolbar } from '@mui/material';
import { ListIcon } from '@phosphor-icons/react';

// import Logo from 'components/common/LogoFull.svg?react';
import {
    logoHeaderAppBarSx,
    logoHeaderButtonSx
} from 'components/sidebar/SidebarStyles';

import { SettingsContext } from 'contexts';
import { useIsMobile } from 'hooks/useIsMobile';

import { SIDEBAR_DIMENSION } from 'Constants';

export const FullWidthLogoHeader = () => {
    const isMobile = useIsMobile();
    const { handleOpenMenu } = React.useContext(SettingsContext);

    if (!isMobile) {
        return <></>;
    }

    return (
        <Grid item md={12}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={logoHeaderAppBarSx}>
                    <Toolbar
                        sx={{ minHeight: SIDEBAR_DIMENSION.logoHeaderHeight }}
                    >
                        <IconButton
                            size="small"
                            aria-label="open drawer"
                            onClick={handleOpenMenu}
                            sx={logoHeaderButtonSx}
                        >
                            <ListIcon size={24} />
                        </IconButton>
                        {/* <Logo height={20} /> */}
                    </Toolbar>
                </AppBar>
            </Box>
        </Grid>
    );
};
