import React from 'react';
import { Grid, Drawer, type SxProps } from '@mui/material';

import { SidebarHeader } from './SidebarHeader';
import { SidebarFooter } from './SidebarFooter';
import { SidebarMenuList } from './SidebarMenuList';
import { getSidebarDrawerSx } from './SidebarStyles';

import { useIsMobile } from 'hooks/useIsMobile';
import { useAuth } from 'hooks/useAuth';
import { SettingsContext } from 'contexts';

// import { PERSONNEL_ROLE, PERSONNEL_TYPE } from 'Enum';

export const Sidebar = () => {
    const { menuDrawerOpen, handleCloseMenu } =
        React.useContext(SettingsContext);

    const isMobile = useIsMobile();
    // const baseURL = useBaseURL();
    // const companyId = useCompanyId();
    // const navigate = useNavigate();
    // const { pathname } = useLocation();
    // const { supportedId } = useParams();
    // const logout = useLogout();
    const { loggedInPersonnel } = useAuth();

    const drawerSx: SxProps = React.useMemo(() => {
        return getSidebarDrawerSx({
            isMobile,
            menuDrawerOpen
        });
    }, [isMobile, menuDrawerOpen]);

    const handleLogout = React.useCallback(() => {
        // TODO: CODE TO LOGOUT
        // logout.mutate(
        //     { email: loggedInPersonnel?.email, companyId },
        //     {
        //         onSuccess: () => {
        //             signout();

        //             if (loggedInPersonnel?.role === PERSONNEL_ROLE.VENDOR) {
        //                 navigate(`${baseURL}vendor/${supportedId}/signin`);
        //             } else if (isInterviewerLoggedIn) {
        //                 navigate({
        //                     pathname: 'signin',
        //                     search: createSearchParams({
        //                         next: pathname
        //                     }).toString()
        //                 });
        //             } else {
        //                 navigate('signin');
        //             }
        //         }
        //     }
        // );
    }, []);

    const onMenuClick = React.useCallback(() => {
        if (isMobile) {
            handleCloseMenu();
        }
    }, [handleCloseMenu, isMobile]);

    return (
        <Drawer
            id="sidebar-drawer"
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile && menuDrawerOpen ? true : false}
            onClose={handleCloseMenu}
            sx={drawerSx}
        >
            <Grid
                height="100%"
                px={{ xs: 2.5, sm: 2 }}
                pb={{ xs: 1.75, sm: 3 }}
            >
                <SidebarHeader />
                <SidebarMenuList onMenuClick={onMenuClick} />
                {loggedInPersonnel && (
                    <SidebarFooter
                        personnelType={loggedInPersonnel.type}
                        personnelEmail={loggedInPersonnel.email}
                        handleLogout={handleLogout}
                        onMenuClick={onMenuClick}
                    />
                )}
            </Grid>
        </Drawer>
    );
};
