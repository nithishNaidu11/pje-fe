import React from 'react';

import { Grid, type SxProps, useTheme } from '@mui/material';

import { getSingleEntityEditFooterSx } from 'components/common/AppStyles';

interface SingleEntityEditFooterProps {
    children: React.ReactNode;
}

export const SingleEntityEditFooter = ({
    children
}: SingleEntityEditFooterProps) => {
    const theme = useTheme();

    const singleEntityEditFooterSx: SxProps = React.useMemo(() => {
        return getSingleEntityEditFooterSx(theme.zIndex.drawer);
    }, [theme.zIndex.drawer]);

    return (
        <Grid
            id="single-entity-edit-footer"
            item
            xs={12}
            height={80}
            width="100%"
            px={{ xs: 2, md: 5 }}
            sx={singleEntityEditFooterSx}
        >
            <Grid
                container
                justifyContent="end"
                alignItems="center"
                height="100%"
                columnSpacing={2}
            >
                {children}
            </Grid>
        </Grid>
    );
};
