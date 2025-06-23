import React from 'react';

import { Avatar, Fade, Grid, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { SignOut } from '@phosphor-icons/react';

import { AppTooltip } from '@/components/common';
import { avatarSx } from './SidebarStyles';

import { SettingsContext } from '@/contexts';

interface SidebarLogoutBtnProps {
    email?: string;
    handleLogout: VoidFunction;
}

export const SidebarLogoutBtn = ({
    email = undefined,
    handleLogout
}: SidebarLogoutBtnProps) => {
    const { menuDrawerOpen } = React.useContext(SettingsContext);

    return (
        <Grid
            id="sidebar-logout-button"
            display="flex"
            alignItems="center"
            columnGap={1}
            mt={2}
        >
            {menuDrawerOpen && (
                <>
                    <Avatar sx={avatarSx}>{email?.[0].toUpperCase()}</Avatar>
                    <Typography
                        variant="body2"
                        lineHeight="18px"
                        letterSpacing={0}
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        maxWidth={{ xs: 180, sm: 100 }}
                        flexGrow={1}
                    >
                        {email}
                    </Typography>
                </>
            )}
            <AppTooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                leaveDelay={200}
                placement="right"
                title="Logout"
            >
                <IconButton
                    sx={{ borderRadius: 1, px: 1, py: 0.75, color: grey[600] }}
                    onClick={() => handleLogout()}
                >
                    <SignOut size={20} />
                </IconButton>
            </AppTooltip>
        </Grid>
    );
};
