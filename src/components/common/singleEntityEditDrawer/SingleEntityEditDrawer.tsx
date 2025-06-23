import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';

import { AppLoader } from 'components/common';
import { ReactElement } from 'interfaces';
import { SingleEntityEditHeader } from 'components/common/singleEntityEditDrawer/SingleEntityEditHeader';

const drawerWidth = {
    sm: 574,
    md: 680,
    xs: window.innerWidth
};

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */

    window?: () => Window;
    isOpen: boolean;
    header: ReactElement | string;
    children: React.ReactNode;
    isLoading: boolean;
    footer?: ReactElement;
    description?: string;
    rowGap?: { xs: number; md: number };
    loaderZIndex?: number;
    drawerPaperSx?: React.CSSProperties;
    closeCta?: ReactElement;
    sx?: React.CSSProperties;
    onClose: VoidFunction;
    onPrevClick?: VoidFunction;
}
export const SingleEntityEditDrawer = ({
    isOpen,
    header,
    children,
    isLoading,
    footer,
    rowGap = { xs: 2, md: 3 },
    loaderZIndex = undefined,
    drawerPaperSx = {},
    closeCta = undefined,
    sx = {},
    onClose,
    onPrevClick
}: Props) => {
    const theme = useTheme();

    return (
        <Box
            id="single-entity-edit-box"
            component="nav"
            sx={{ width: drawerWidth, flexShrink: { sm: 0 } }}
        >
            <Drawer
                id="single-entity-edit-drawer"
                anchor="right"
                open={isOpen}
                sx={{
                    zIndex: theme.zIndex.drawer + 2,
                    display: { xs: 'block', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        ...drawerPaperSx
                    }
                }}
            >
                <Grid container>
                    {isLoading && (
                        <AppLoader isInsideDrawer zIndex={loaderZIndex} />
                    )}
                    <SingleEntityEditHeader
                        header={header}
                        closeCta={closeCta}
                        onClose={onClose}
                        onPrevClick={onPrevClick}
                        width={drawerWidth}
                    />

                    <Grid
                        id="single-entity-edit-drawer-container"
                        px={{ xs: 2, md: 5 }}
                        py={{ xs: 2 }}
                        width="100%"
                        mt="80px"
                        container
                        rowGap={rowGap}
                        maxHeight={'calc(100vh - 160px)'}
                        sx={{ overflowY: 'auto', ...sx }}
                    >
                        {children}
                    </Grid>

                    {footer && (
                        <Grid
                            item
                            md={12}
                            height={80}
                            width={drawerWidth}
                            px={{ xs: 2, md: 5 }}
                            sx={{
                                position: 'fixed',
                                bottom: 0,
                                zIndex: theme.zIndex.drawer + 1,
                                borderTopWidth: 1,
                                borderTopColor: grey[200],
                                borderTopStyle: 'solid',
                                backgroundColor: 'white'
                            }}
                        >
                            <Grid
                                container
                                justifyContent="end"
                                alignItems="center"
                                height="100%"
                                columnSpacing={2}
                            >
                                {footer}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Drawer>
        </Box>
    );
};
