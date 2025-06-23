import { PJEMasterTable } from '@components/preJoiningEngagement';
import { ColumnModifier, PageLayout } from '@components/common';

// import { useCompanyId } from 'hooks/useCompanyId';
import { useGlobalActionsHook } from 'hooks/useGlobalActionsHook';
import { usePaginatedReactTable } from 'hooks/usePaginatedReactTable';
import { useGetPJE } from 'hooks/apiHooks/preJoiningEngagement/useGetPJE';
import { useGetPJEColumnStructure } from 'hooks/apiHooks/preJoiningEngagement/useGetPJEColumnStructure';
import { PJEColumns } from 'hooks/columns/PJEColumns';

export const PreJoiningEngagementContainer = () => {
    const companyId = 'abc-onboarding';
    const {
        anchorEl,
        isColumnModifierVisible,
        handleCloseColumnModifier,
        handleOpenColumnModifier
    } = useGlobalActionsHook();

    const { data: dynamicColumns } = useGetPJEColumnStructure({
        companyId: companyId
    });

    const columns = PJEColumns({
        templateFields: dynamicColumns?.templateDict ?? {}
    });

    const {
        tableDisplayColumns,
        displayColumns,
        minimalPaginationInfo,
        handleChangePage,
        handleChangeRowsPerPage,
        handleColumnModifierChange
    } = usePaginatedReactTable({
        tableId: 'pre-joining-engagement-table',
        columns,
        searchKey: ''
    });

    const {
        data: tableData,
        isLoading,
        refetch
    } = useGetPJE({
        companyId: companyId,
        body: {
            ...minimalPaginationInfo
        }
    });

    return (
        <PageLayout title="Pre Joining Engagement">
            <>
                <PJEMasterTable
                    companyId={companyId}
                    columns={tableDisplayColumns}
                    data={tableData?.data ?? []}
                    paginationInfo={tableData?.paginationInfo}
                    isLoading={isLoading}
                    isColumnModifierVisible={isColumnModifierVisible}
                    refetchData={refetch}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleOpenColumnModifier={handleOpenColumnModifier}
                />
                <ColumnModifier
                    anchorEl={anchorEl}
                    isOpen={isColumnModifierVisible}
                    columns={displayColumns}
                    handleCloseColumnModifier={handleCloseColumnModifier}
                    onColumnModifierChange={handleColumnModifierChange}
                />
            </>
        </PageLayout>
    );
};
