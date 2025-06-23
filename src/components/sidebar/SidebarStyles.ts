import { alpha, duration, easing, type SxProps } from '@mui/material';
import { blue, blueGrey, grey } from '@mui/material/colors';

import {
    DASHBOARD_PAGE_HEADER,
    PRIMARY_COLOR,
    SIDEBAR_DIMENSION,
    SIDEBAR_SECTION_COLLAPSE_ENABLED
} from 'Constants';

interface FooterSxProps {
    menuDrawerOpen: boolean;
}

interface MenuListSxProps {
    menuDrawerOpen: boolean;
}

interface MenuButtonSxProps {
    menuDrawerOpen: boolean;
}

interface MenuIconSxProps {
    menuDrawerOpen: boolean;
    isSelected: boolean;
}

interface SidebarDrawerSxProps {
    isMobile: boolean;
    menuDrawerOpen: boolean;
}

interface PageContainerSxProps {
    isFullSize: boolean;
    isMobile: boolean;
    sidebarWidth: number;
}

interface AppContainerSxProps {
    sidebarWidth: number;
}

const selectedMenuBGColor = alpha(blue['A100'], 0.38);

export const getSidebarTransition = (property: string) => {
    return `${property} ${duration.complex}ms ${easing.easeInOut} 0ms`;
};

export const drawerCloseButtonSx: SxProps = {
    borderRadius: 1,
    p: { xs: 0.75, sm: 0.5 },
    bgcolor: { xs: grey[100], sm: 'inherit' }
};

export const drawerOpenButtonSx: SxProps = { borderRadius: 1, px: 1, py: 0.5 };

export const avatarSx: SxProps = {
    bgcolor: PRIMARY_COLOR,
    width: 24,
    height: 24,
    fontSize: 16
};

export const sectionButtonSx: SxProps = {
    flexGrow: 0,
    borderRadius: 1,
    justifyContent: 'space-between',
    p: 0.75,
    height: 36,
    color: blueGrey[700],
    ':hover': {
        bgcolor: 'inherit'
    },
    pointerEvents: SIDEBAR_SECTION_COLLAPSE_ENABLED ? undefined : 'none',
    cursor: SIDEBAR_SECTION_COLLAPSE_ENABLED ? undefined : 'default'
};

export const sectionCollapseIconSx: React.CSSProperties = {
    display: SIDEBAR_SECTION_COLLAPSE_ENABLED ? undefined : 'none',
    margin: '7px',
    height: 10,
    width: 10
};

export const sectionCollapseSx: SxProps = {
    '.MuiCollapse-wrapperInner': {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 0.5
    }
};

export const logoHeaderAppBarSx: SxProps = {
    bgcolor: 'white',
    width: '100vw',
    boxShadow: 'unset',
    borderBottom: `1px solid ${grey[300]}`
};

export const logoHeaderButtonSx: SxProps = {
    p: 0.75,
    mr: 2,
    borderRadius: 1,
    bgcolor: grey[100]
};

export const getFooterSx = ({ menuDrawerOpen }: FooterSxProps): SxProps => {
    return {
        pb: { xs: 1.75, sm: 3 },
        minWidth: menuDrawerOpen
            ? SIDEBAR_DIMENSION.openMenuWidth
            : SIDEBAR_DIMENSION.closedMenuWidth,
        bgcolor: 'white',
        position: 'sticky',
        bottom: 0
    };
};

export const getMenuListSx = ({ menuDrawerOpen }: MenuListSxProps): SxProps => {
    return {
        width: '100%',
        minWidth: menuDrawerOpen
            ? SIDEBAR_DIMENSION.openMenuWidth
            : SIDEBAR_DIMENSION.closedMenuWidth,
        minHeight: 'calc(100% - 168px)',
        py: 0,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 0.5
    };
};

export const getMenuButtonSx = ({
    menuDrawerOpen
}: MenuButtonSxProps): SxProps => {
    return {
        borderRadius: 1,
        p: 1,
        justifyContent: menuDrawerOpen ? 'start' : 'center',
        color: blueGrey[700],
        '&.Mui-selected': {
            backgroundColor: selectedMenuBGColor,
            color: 'black'
        },
        '&.Mui-selected:hover': {
            backgroundColor: selectedMenuBGColor
        }
    };
};

export const getMenuIconSx = ({
    menuDrawerOpen,
    isSelected
}: MenuIconSxProps): SxProps => {
    return {
        minWidth: 'fit-content',
        mr: menuDrawerOpen ? 1 : 'auto',
        color: isSelected ? 'black' : grey[600]
    };
};

export const getSidebarDrawerSx = ({
    isMobile,
    menuDrawerOpen
}: SidebarDrawerSxProps): SxProps => {
    const drawerWidth = isMobile
        ? SIDEBAR_DIMENSION.mobileDrawerWidth
        : SIDEBAR_DIMENSION.openDrawerWidth;
    return {
        width: drawerWidth,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
            overflowX: 'hidden',
            borderRight: `1px solid ${grey[300]}`,
            transition: getSidebarTransition('width'),
            scrollbarWidth: 'none',
            ':hover': {
                scrollbarWidth: 'auto'
            },
            width: menuDrawerOpen
                ? drawerWidth + 1
                : SIDEBAR_DIMENSION.closedDrawerWidth + 1
        }
    };
};

export const getPageContainerSx = ({
    isFullSize,
    isMobile,
    sidebarWidth
}: PageContainerSxProps) => {
    const headerHeight = isMobile
        ? DASHBOARD_PAGE_HEADER.Height + SIDEBAR_DIMENSION.logoHeaderHeight
        : DASHBOARD_PAGE_HEADER.Height;
    return {
        bgcolor: grey[100],
        overflow: { xs: 'auto', md: 'hidden' },
        transition: getSidebarTransition('width'),
        width: isFullSize ? '100vw' : `calc(100vw - ${sidebarWidth}px)`,
        height: `calc(100vh - ${headerHeight}px)`
    };
};

export const getAppContainerSx = ({
    sidebarWidth
}: AppContainerSxProps): SxProps => {
    return {
        backgroundColor: grey[100],
        flexGrow: 1,
        ml: `${sidebarWidth}px`,
        width: `calc(100vw - ${sidebarWidth}px)`,
        height: '100vh',
        position: 'relative',
        transition: `${getSidebarTransition('width')}, ${getSidebarTransition(
            'margin-left'
        )}`
    };
};
