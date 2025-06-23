import * as React from 'react';
// import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Box, Grid, type SxProps } from '@mui/material';

import { PreJoiningEngagementContainer } from 'containers';
import { ProtectedRoute } from 'components/common';
import { Sidebar } from 'components/sidebar';
import { getAppContainerSx } from 'components/sidebar/SidebarStyles';

import { SettingsContext, settingsInitialState } from 'contexts';
import { useAuth } from 'hooks/useAuth';
// import { useIsMobile } from 'hooks/useIsMobile';
import { useSettings } from 'hooks/useSettings';
import { useGetLoggedInPersonnel } from 'hooks/apiHooks/useGetLoggedInPersonnel';
import { useSidebarHelper } from 'hooks/useSidebarHelper';
// import { setUser } from 'config/authSlice';

// import { PERSONNEL_ROLE, PERSONNEL_TYPE, SORT_ORDER } from 'Enum';
import { Company } from 'interfaces';

export const AppContainer = () => {
    // const isMobile = useIsMobile();
    // const { getPageViewGaEvent, captureGaPageView } = useGaHelper();
    const { menuDrawerOpen, handleCloseMenu, handleOpenMenu } = useSettings();
    // const companyId = useCompanyId();
    // const { data } = useGetFormFields({ companyId });
    const { loggedInPersonnel, accessToken, refreshAccessToken } = useAuth();
    const { getSidebarWidth } = useSidebarHelper();

    console.log('In Here')

    // const dispatch = useDispatch();

    // const { data: personnelResponse } = useSearchPersonnels({
    //     companyId,
    //     ...{
    //         currentPage: 1,
    //         numberOfPages: 100,
    //         total: 100,
    //         itemsPerPage: 200,
    //         page: 1
    //     },
    //     searchKey: '',
    //     filters: { role: [PERSONNEL_ROLE.SUPERVISOR] },
    //     sort: { key: 'createdOn', order: SORT_ORDER.DESC },
    //     enabled: !!accessToken
    // });

    const { data: personnel, isLoading: isPersonnelResponseLoading } =
        useGetLoggedInPersonnel({
            enabled: !!accessToken
        });
    // const { data: companyForLoggedInUser } = useGetCompany({
    //     companyId,
    //     enabled: !!companyId && !!accessToken
    // });

    const data = [];
    const personnelResponse = {};
    // const { data: companyWithoutToken } = useGetCompanyDetails({
    //     params: {
    //         companyId
    //     },
    //     enabled: loggedInPersonnel?.type !== PERSONNEL_TYPE.HUNAR_PERSONNEL
    // });

    const [company, setCompany] = React.useState<Company>();

    const [showSidebar, setShowSidebar] = React.useState(true);

    // React.useEffect(() => {
    //     if (isMobile) {
    //         // if page changes or reloads, close the menu drawer on mobile
    //         if (menuDrawerOpen) {
    //             handleCloseMenu();
    //         }
    //     }

    //     if (
    //         loggedInPersonnel?.role === PERSONNEL_ROLE.VENDOR
    //         // loggedInPersonnel?.role === PERSONNEL_ROLE.EMPLOYER
    //     ) {
    //         setShowSidebar(false);
    //     }
    // }, [loggedInPersonnel?.role]); // eslint-disable-line react-hooks/exhaustive-deps

    // React.useEffect(() => {
    //     if (companyForLoggedInUser) {
    //         setCompany(companyForLoggedInUser);
    //     } else {
    //         setCompany(companyWithoutToken);
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [companyForLoggedInUser, companyForLoggedInUser]);

    // React.useEffect(() => {
    //     if (personnel) {
    //         dispatch(
    //             setUser({
    //                 ...personnel
    //             })
    //         );
    //     }
    // }, [personnel]);

    // TODO: Handle Token Refresh
    // React.useEffect(() => {
    //     if (!accessToken) {
    //         refreshAccessToken();
    //     }
    // }, [accessToken, refreshAccessToken]);

    const appContainerSx: SxProps = React.useMemo(() => {
        const sidebarWidth = getSidebarWidth({
            showSidebar,
            isMenuDrawerOpen: menuDrawerOpen
        });
        return getAppContainerSx({ sidebarWidth });
    }, [getSidebarWidth, menuDrawerOpen, showSidebar]);

    // if (!accessToken && isPersonnelResponseLoading) {
    //     return <></>;
    // }

    return (
        <SettingsContext.Provider
            value={{
                showSidebar,
                menuDrawerOpen,
                handleCloseMenu,
                handleOpenMenu,
                formFields: data || settingsInitialState.formFields,
                personnelData: personnelResponse?.data ?? [],
                company: {
                    name: company?.name,
                    logoUrl: company?.logoUrl
                }
            }}
        >
          TERS
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
