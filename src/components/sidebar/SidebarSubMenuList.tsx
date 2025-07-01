import { Collapse } from '@mui/material';

import { SidebarMenu } from './SidebarMenu';
import { sectionCollapseSx } from './SidebarStyles';

import type { SidebarMenuProps } from 'interfaces';

interface SidebarSubMenuListProps {
    menuId: string;
    isSubMenuOpen: boolean;
    subMenus: SidebarMenuProps[];
    onSubMenuClick: VoidFunction;
}

export const SidebarSubMenuList = ({
    menuId,
    isSubMenuOpen,
    subMenus,
    onSubMenuClick
}: SidebarSubMenuListProps) => {
    return (
        <Collapse
            id={`${menuId}-sidebar-sub-menu-list`}
            in={isSubMenuOpen}
            timeout="auto"
            unmountOnExit
            sx={sectionCollapseSx}
        >
            {subMenus.map(subMenu => (
                <SidebarMenu
                    key={subMenu.id}
                    menuId={subMenu.id}
                    menuIcon={subMenu.icon}
                    menuLink={subMenu.link}
                    menuTitle={subMenu.title}
                    onClick={onSubMenuClick}
                />
            ))}
        </Collapse>
    );
};
