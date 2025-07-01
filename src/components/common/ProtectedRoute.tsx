import React from 'react';

interface ProtectedProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedProps) => {
    // const location = useLocation();
    // const { isAuthorized, isAuthenticated } = useAuth();

    // const unauthorizedRedirectionPath = React.useMemo(() => {
    //     return 'signin';
    // }, []);

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
