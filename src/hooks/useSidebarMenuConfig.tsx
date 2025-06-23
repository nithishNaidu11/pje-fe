import React from 'react';

import { HandshakeIcon } from '@phosphor-icons/react';

import type { SidebarMenuConfigProps } from 'interfaces';

export const useSidebarMenuConfig = () => {
    const menuConfig: SidebarMenuConfigProps[] = React.useMemo(() => {
        const routes = [
            {
                id: 'pre-joining-enagement',
                title: 'Pre Joining Engagement',
                icon: <HandshakeIcon />,
                link: 'pre-joining-enagement'
            }
        ];

        return routes;
    }, []);

    return menuConfig;
};
