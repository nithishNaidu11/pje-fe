import React from 'react';

import { type UseQueryResult } from '@tanstack/react-query';

import { Grid } from '@mui/material';

import { AppLoader, type Column, Table } from 'components/common';
import {
    PJETableHeader,
    PJEBulkUploadForm
} from 'components/preJoiningEngagement';
import { type Data } from 'components/common/paginatedTable/PaginatedReactTable';

import { useExportWrapper } from 'hooks/useExportWrapper';

import { PaginationInfo } from 'interfaces';

interface PJEMasterTableProps {
    isLoading: boolean;
    columns: Column[];
    data: Data[];
    paginationInfo?: PaginationInfo;
    refetchData: UseQueryResult['refetch'];
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (_: React.ChangeEvent<HTMLInputElement>) => void;
    isColumnModifierVisible: boolean;
    handleOpenColumnModifier: (event: React.MouseEvent<HTMLElement>) => void;
}

const paginationInfoInitialState: PaginationInfo = {
    currentPage: 1,
    numberOfPages: 1,
    total: 0,
    itemsPerPage: 100,
    page: 1
};

export const PJEMasterTable = ({
    isLoading,
    columns,
    data,
    paginationInfo = paginationInfoInitialState,
    refetchData,
    handleChangePage,
    handleChangeRowsPerPage,
    isColumnModifierVisible,
    handleOpenColumnModifier
}: PJEMasterTableProps) => {
    const [showBulkUploadModal, setShowBulkUploadModal] =
        React.useState<boolean>(false);

    const toggleBulkUploadModal = React.useCallback(
        () => setShowBulkUploadModal(prev => !prev),
        []
    );

    const { exportMutation, handleExportMutation } = useExportWrapper({
        exportTableId: 'preJoiningEngagement',
        params: {},
        body: {}
    });

    const onExportClickHandler = React.useCallback(() => {
        handleExportMutation({
            columns: [columns[0], ...columns],
            fileName: `shortlisted_workers_${new Date().getTime()}.xlsx`,
            onSuccess: () => {
                refetchData();
            }
        });
    }, [columns, handleExportMutation, refetchData]);

    if (isLoading) return <AppLoader />;

    return (
        <Grid item md={12} p={2} sx={{ height: 'calc(100vh - 96px)' }}>
            <Table
                title="Pre Joining Engagement Dashboard"
                columns={columns}
                data={data}
                paginationInfo={paginationInfo}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                isLoading={isLoading}
                tableHeight="calc(100vh - 216px)"
                tableHeaderCTA={
                    <PJETableHeader
                        onExportClickHandler={onExportClickHandler}
                        onBulkUploadClickHandler={toggleBulkUploadModal}
                        isColumnModifierVisible={isColumnModifierVisible}
                        isExportInProgress={exportMutation.isLoading}
                        handleOpenColumnModifier={handleOpenColumnModifier}
                    />
                }
            />

            <PJEBulkUploadForm
                isOpen={showBulkUploadModal}
                onCloseHandler={toggleBulkUploadModal}
                refetchData={refetchData}
            />
        </Grid>
    );
};
