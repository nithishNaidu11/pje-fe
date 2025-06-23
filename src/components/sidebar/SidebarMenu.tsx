import React from 'react';

import { useLocation, Link as RouterLink } from 'react-router-dom';

import {
    Fade,
    Link,
    ListItemButton,
    ListItemIcon,
    type SxProps,
    Typography
} from '@mui/material';
import { IconContext } from '@phosphor-icons/react';

import { AppTooltip } from '@/components/common';
import { getMenuButtonSx, getMenuIconSx } from './SidebarStyles';

import { SettingsContext } from '@/contexts';

interface SidebarMenuProps {
    menuId: string;
    menuLink: string;
    menuIcon: React.ReactNode;
    menuTitle: string;
    onClick: VoidFunction;
}

export const SidebarMenu = ({
    menuId,
    menuIcon,
    menuLink,
    menuTitle,
    onClick
}: SidebarMenuProps) => {
    const { menuDrawerOpen } = React.useContext(SettingsContext);

    const { pathname } = useLocation();

    const isSelected = React.useMemo(() => {
        return pathname.indexOf(menuId) > -1;
    }, [menuId, pathname]);

    const buttonSx: SxProps = React.useMemo(() => {
        return getMenuButtonSx({ menuDrawerOpen });
    }, [menuDrawerOpen]);

    const iconSx: SxProps = React.useMemo(() => {
        return getMenuIconSx({ menuDrawerOpen, isSelected });
    }, [menuDrawerOpen, isSelected]);

    return (
        <Link
            key={menuId}
            to={menuLink}
            component={RouterLink}
            underline="none"
            id={`${menuId}-sidebar-menu`}
        >
            <ListItemButton
                tabIndex={-1}
                dense
                selected={isSelected}
                sx={buttonSx}
                onClick={onClick}
            >
                <AppTooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    leaveDelay={200}
                    placement="right"
                    title={menuTitle}
                >
                    <ListItemIcon sx={iconSx}>
                        <IconContext.Provider
                            value={{
                                size: 20,
                                weight: isSelected ? 'fill' : 'regular'
                            }}
                        >
                            {menuIcon}
                        </IconContext.Provider>
                    </ListItemIcon>
                </AppTooltip>
                {menuDrawerOpen && (
                    <Typography
                        noWrap
                        variant="body2"
                        lineHeight="18px"
                        letterSpacing={0}
                    >
                        {menuTitle}
                    </Typography>
                )}
            </ListItemButton>
        </Link>
    );
};
