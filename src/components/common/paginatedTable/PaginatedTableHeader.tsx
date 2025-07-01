import { type ReactNode } from 'react';

import { Grid } from '@mui/material';

interface PageLayoutProps {
    height?: number | string;
    tableHeaderCTA?: ReactNode;
    pl?: number;
    pr?: number;
    pt?: number;
    pb?: number;
    minHeight?: number;
}

export const PaginatedTableHeader = ({
    minHeight,
    height = 48,
    tableHeaderCTA,
    pl = 1.5,
    pr = 2,
    pt,
    pb
}: PageLayoutProps) => {
    return (
        <Grid
            id="paginated-table-header"
            container
            height={minHeight ? undefined : height}
            pl={pl}
            pr={pr}
            pt={pt}
            pb={pb}
            bgcolor="white"
            justifyContent="space-between"
            alignItems="center"
            minHeight={minHeight}
        >
            {tableHeaderCTA}
        </Grid>
    );
};
