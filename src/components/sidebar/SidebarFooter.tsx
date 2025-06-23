import React from 'react';

import { List } from '@mui/material';
import { OfficeChair } from '@phosphor-icons/react';

import { SidebarMenu } from './SidebarMenu';
import { SidebarLogoutBtn } from './SidebarLogoutBtn';
import { getFooterSx } from './SidebarStyles';

// import { useBaseURL } from 'hooks/useBaseURL';
import { SettingsContext } from 'contexts';

import { PERSONNEL_TYPE } from 'Enum';

interface SidebarFooterProps {
    personnelType: PERSONNEL_TYPE;
    personnelEmail?: string;
    handleLogout: VoidFunction;
    onMenuClick: VoidFunction;
}

export const SidebarFooter = ({
    personnelType,
    personnelEmail = undefined,
    handleLogout,
    onMenuClick
}: SidebarFooterProps) => {
    const { menuDrawerOpen } = React.useContext(SettingsContext);

    // const baseURL = useBaseURL();

    const footerSx = React.useMemo(() => {
        return getFooterSx({ menuDrawerOpen });
    }, [menuDrawerOpen]);

    return (
        <List id="sidebar-footer" sx={footerSx}>
            {personnelType === PERSONNEL_TYPE.HUNAR_PERSONNEL && (
                <SidebarMenu
                    menuTitle={'Interviewers'}
                    menuId={'interviewers'}
                    menuIcon={<OfficeChair />}
                    // menuLink={`${baseURL}setup/interviewers`}
                    onClick={onMenuClick}
                />
            )}
            <SidebarLogoutBtn
                email={personnelEmail}
                handleLogout={handleLogout}
            />
        </List>
    );
};
