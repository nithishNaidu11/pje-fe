import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

import { useToken } from './useToken';

import { SelecterState, setAuth, setUser, signoutUser } from 'config/authSlice';
import { PERSONNEL_ROLE, PERSONNEL_TYPE } from 'Enum';

// import { useBaseURL } from '@/hooks/useBaseURL';
// import { useGetAccessToken } from 'hooks/apiHooks/use';

export const useAuth = () => {
    // const location = useLocation();
    const dispatch = useDispatch();
    const { getToken } = useToken();
    const {
        accessToken: userAccessToken,
        refreshToken: userRefreshToken,
        loggedInPersonnel
    } = useSelector((state: SelecterState) => {
        return state.auth;
    });
    // const accessToken = useGetAccessToken();
    // const navigate = useNavigate();

    const getRefreshToken = () => {
        return getToken('refreshToken');
    };

    getRefreshToken();

    // const saveRefreshToken = (refreshToken: string) => {
    //     if (refreshToken) {
    //         saveToken('refreshToken', refreshToken);
    //         setRefreshToken(refreshToken);
    //     }
    // };
    // const removeRefreshToken = () => {
    //     removeToken('refreshToken');
    // };

    const signout = () => {
        // dispatch(signoutUser());
        // if (
        //     loggedInPersonnel?.role === PERSONNEL_ROLE.VENDOR ||
        //     location.pathname.indexOf('/vendor/') > -1
        // ) {
        //     const vendorId =
        //         loggedInPersonnel?.personnelId ??
        //         location.pathname.substring(
        //             location.pathname.lastIndexOf('/vendor/') + 8,
        //             location.pathname.indexOf('/workspaces')
        //         );
        //     navigate(`${baseURL}vendor/${vendorId}/signin`);
        // } else {
        //     navigate({
        //         pathname: 'signin',
        //         search: createSearchParams({
        //             next: `${location.pathname}${location.search}`
        //         }).toString()
        //     });
        // }
    };

    const refreshAccessToken = async (userRole?: PERSONNEL_ROLE) => {
        // const response = await accessToken.mutateAsync(
        //     { userType: userRole },
        //     {
        //         onSuccess: data => {
        //             dispatch(
        //                 setAuth({
        //                     accessToken: data.access
        //                 })
        //             );
        //         },
        //         onError: () => {
        //             signout();
        //         }
        //     }
        // );
        // return response;
    };

    const isAuthorized = React.useMemo(() => {
        if (userAccessToken) {
            return true;
        }

        return false;
    }, [userAccessToken]);

    const isAuthenticated = React.useMemo(
        () => !!userAccessToken || !!userRefreshToken,
        [userAccessToken, userRefreshToken]
    );

    const onSignin = ({
        accessToken,
        refreshToken
    }: {
        accessToken: string;
        refreshToken: string;
    }) => {
        dispatch(
            setAuth({
                accessToken,
                refreshToken
            })
        );

        // TODO: Whatever it ii
        // if (accessToken) {
        //     if (userTypeFromURL === PERSONNEL_ROLE.VENDOR) {
        //         dispatch(
        //             setUser({
        //                 role: userTypeFromURL
        //             })
        //         );
        //     } else
        //         dispatch(
        //             setUser({
        //                 role: PERSONNEL_TYPE.HUNAR_PERSONNEL
        //             })
        //         );
        // } else {
        //     dispatch(
        //         setUser({
        //             role: undefined
        //         })
        //     );
        // }
    };

    return {
        loggedInPersonnel,
        accessToken: userAccessToken,
        isAuthorized,
        isAuthenticated,
        signout,
        // removeRefreshToken,
        getRefreshToken,
        // saveRefreshToken,
        refreshAccessToken,
        onSignin
    };
};
