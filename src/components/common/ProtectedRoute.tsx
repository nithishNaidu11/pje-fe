import React from 'react';
import { createSearchParams, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

interface ProtectedProps {
    children: React.ReactNode;
}

const unauthorizedRedirectionPathMap = {
    ['/vendor/']: 'vendor/'
};

export const ProtectedRoute = ({ children }: ProtectedProps) => {
    const location = useLocation();
    const { isAuthorized, isAuthenticated } = useAuth();

    const unauthorizedRedirectionPath = React.useMemo(() => {
        // const matchedPath = Object.keys(unauthorizedRedirectionPathMap).find(
        //     path => location.pathname.indexOf(path) > -1
        // ) as keyof typeof unauthorizedRedirectionPathMap | undefined;

        // if (matchedPath) {
        //     return `${unauthorizedRedirectionPathMap[matchedPath]}${
        //         location.pathname.split('/').slice(-2)[0]
        //     }/signin`;
        // }

        return 'signin';
    }, [location.pathname]);

    // if (!isAuthorized || !isAuthenticated)
    //     return (
    //         <Navigate
    //             to={{
    //                 pathname: unauthorizedRedirectionPath,
    //                 search: createSearchParams({
    //                     next: `${location.pathname}${location.search}`
    //                 }).toString()
    //             }}
    //             replace
    //         />
    //     );
    return <>{children}</>;
};
