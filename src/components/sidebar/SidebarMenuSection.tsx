import React from 'react';

import { Divider, Grid, ListItemButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CaretDown, CaretUp } from '@phosphor-icons/react';

import { sectionButtonSx, sectionCollapseIconSx } from './SidebarStyles';

import { SettingsContext } from '@/contexts';

import { SIDEBAR_SECTION_COLLAPSE_ENABLED } from '@/Constants';

interface SidebarMenuSectionProps {
    menuId: string;
    menuTitle: string;
    isSubMenuOpen: boolean;
    onClick?: VoidFunction;
}

export const SidebarMenuSection = ({
    menuId,
    menuTitle,
    isSubMenuOpen,
    onClick = () => undefined
}: SidebarMenuSectionProps) => {
    const { menuDrawerOpen } = React.useContext(SettingsContext);

    return (
        <>
            {menuDrawerOpen ? (
                <ListItemButton
                    id={`${menuId}-sidebar-menu-section`}
                    disableRipple
                    sx={sectionButtonSx}
                    onClick={onClick}
                    tabIndex={SIDEBAR_SECTION_COLLAPSE_ENABLED ? undefined : -1}
                >
                    <Typography
                        variant="caption"
                        textTransform="uppercase"
                        fontSize={10}
                        fontWeight={700}
                        lineHeight={1.2}
                        letterSpacing={0.1}
                    >
                        {menuTitle}
                    </Typography>
                    {isSubMenuOpen ? (
                        <CaretUp weight="fill" style={sectionCollapseIconSx} />
                    ) : (
                        <CaretDown
                            weight="fill"
                            style={sectionCollapseIconSx}
                        />
                    )}
                </ListItemButton>
            ) : (
                <Grid
                    id={`${menuId}-sidebar-menu-section`}
                    height={36}
                    display="flex"
                    alignItems="center"
                >
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottomColor: grey[300]
                        }}
                    />
                </Grid>
            )}
        </>
    );
};
