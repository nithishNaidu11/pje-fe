import React from 'react';

import { List } from '@mui/material';

import { SidebarLogoutBtn } from './SidebarLogoutBtn';
import { getFooterSx } from './SidebarStyles';

// import { useBaseURL } from 'hooks/useBaseURL';
import { SettingsContext } from 'contexts';

interface SidebarFooterProps {
    personnelEmail?: string;
    handleLogout: VoidFunction;
}

export const SidebarFooter = ({
    personnelEmail = undefined,
    handleLogout
}: SidebarFooterProps) => {
    const { menuDrawerOpen } = React.useContext(SettingsContext);

    // const baseURL = useBaseURL();

    const footerSx = React.useMemo(() => {
        return getFooterSx({ menuDrawerOpen });
    }, [menuDrawerOpen]);

    return (
        <List id="sidebar-footer" sx={footerSx}>
            REMOVE ME AFTER CHECKING
            <SidebarLogoutBtn
                email={personnelEmail}
                handleLogout={handleLogout}
            />
        </List>
    );
};
