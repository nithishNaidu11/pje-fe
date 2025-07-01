import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Box, Grid, type SxProps } from '@mui/material';

import { PreJoiningEngagementContainer } from 'containers';
import { ProtectedRoute } from 'components/common';
import { Sidebar } from 'components/sidebar';
import { getAppContainerSx } from 'components/sidebar/SidebarStyles';

import { SettingsContext } from 'contexts';
import { useSettings } from 'hooks/useSettings';
import { useSidebarHelper } from 'hooks/useSidebarHelper';

import { Company } from 'interfaces';

export const AppContainer = () => {
    const { menuDrawerOpen, handleCloseMenu, handleOpenMenu } = useSettings();
    // const { loggedInPersonnel, accessToken, refreshAccessToken } = useAuth();
    const { getSidebarWidth } = useSidebarHelper();
    // const dispatch = useDispatch();

    // const { data: personnel, isLoading: isPersonnelResponseLoading } =
    //     useGetLoggedInPersonnel({
    //         enabled: !!accessToken
    //     });

    const personnelResponse = { data: [] };

    const [company] = React.useState<Company>();

    const [showSidebar] = React.useState(true);

    const appContainerSx: SxProps = React.useMemo(() => {
        const sidebarWidth = getSidebarWidth({
            showSidebar,
            isMenuDrawerOpen: menuDrawerOpen
        });
        return getAppContainerSx({ sidebarWidth });
    }, [getSidebarWidth, menuDrawerOpen, showSidebar]);

    return (
        <SettingsContext.Provider
            value={{
                showSidebar,
                menuDrawerOpen,
                handleCloseMenu,
                handleOpenMenu,
                personnelData: personnelResponse?.data ?? [],
                company: {
                    name: company?.name,
                    logoUrl: company?.logoUrl
                }
            }}
        >
            <ProtectedRoute>
                <>
                    {showSidebar && <Sidebar />}

                    <Box component="main" sx={appContainerSx}>
                        <Grid container id="app-container">
                            <Routes>
                                <Route
                                    path="*"
                                    element={<PreJoiningEngagementContainer />}
                                />
                            </Routes>
                        </Grid>
                    </Box>
                </>
            </ProtectedRoute>
        </SettingsContext.Provider>
    );
};
