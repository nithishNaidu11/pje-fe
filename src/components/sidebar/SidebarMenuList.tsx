import React from 'react';

import { List } from '@mui/material';

import { SidebarMenu } from './SidebarMenu';
import { SidebarMenuSection } from './SidebarMenuSection';
import { SidebarSubMenuList } from './SidebarSubMenuList';
import { getMenuListSx } from './SidebarStyles';

import { useSidebarMenuConfig } from 'hooks/useSidebarMenuConfig';
import { SettingsContext } from 'contexts';

interface SidebarMenuListProps {
    onMenuClick: VoidFunction;
}

export const SidebarMenuList = ({ onMenuClick }: SidebarMenuListProps) => {
    const { menuDrawerOpen } = React.useContext(SettingsContext);
    const menuConfig = useSidebarMenuConfig();

    const [isSubMenuOpen, setIsSubMenuOpen] = React.useState<{
        [key: string]: boolean;
    }>(
        menuConfig.reduce((acc, menu) => {
            return {
                ...acc,
                [menu.id]: true
            };
        }, {})
    );

    const menuListSx = React.useMemo(() => {
        return getMenuListSx({ menuDrawerOpen });
    }, [menuDrawerOpen]);

    const handleSectionMenuClick = React.useCallback((menuId: string) => {
        setIsSubMenuOpen(prevSubMenuState => ({
            ...prevSubMenuState,
            [menuId]: !prevSubMenuState[menuId]
        }));
    }, []);

    return (
        <List sx={menuListSx} id="sidebar-menu-list">
            {menuConfig.map(menu =>
                menu.subMenus ? (
                    <React.Fragment key={menu.id}>
                        <SidebarMenuSection
                            menuId={menu.id}
                            menuTitle={menu.title}
                            isSubMenuOpen={isSubMenuOpen[menu.id]}
                            onClick={() => {
                                handleSectionMenuClick(menu.id);
                            }}
                        />
                        <SidebarSubMenuList
                            menuId={menu.id}
                            isSubMenuOpen={isSubMenuOpen[menu.id]}
                            subMenus={menu.subMenus}
                            onSubMenuClick={onMenuClick}
                        />
                    </React.Fragment>
                ) : (
                    <SidebarMenu
                        key={menu.id}
                        menuId={menu.id}
                        menuIcon={menu.icon}
                        menuLink={menu.link}
                        menuTitle={menu.title}
                        onClick={onMenuClick}
                    />
                )
            )}
        </List>
    );
};
