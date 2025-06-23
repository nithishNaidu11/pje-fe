import { Grid } from '@mui/material';

import {
    BulkUploadButton,
    ColumnModifierButton,
    ExportButton
} from 'components/common';

interface PJETableHeaderProps {
    companyId: string;
    onExportClickHandler: VoidFunction;
    onBulkUploadClickHandler: VoidFunction;
    isColumnModifierVisible: boolean;
    isExportInProgress: boolean;
    handleOpenColumnModifier: (event: React.MouseEvent<HTMLElement>) => void;
}

export const PJETableHeader = ({
    onExportClickHandler,
    onBulkUploadClickHandler,
    isColumnModifierVisible,
    isExportInProgress,
    handleOpenColumnModifier
}: PJETableHeaderProps) => {
    return (
        <>
            <Grid item display="flex" sx={{ width: '100%' }}>
                <Grid container columnSpacing={2} justifyContent="end">
                    <Grid item>
                        <BulkUploadButton
                            isDisabled={false}
                            isLoading={false}
                            onClick={onBulkUploadClickHandler}
                        />
                    </Grid>
                    <Grid item>
                        <ExportButton
                            isDisabled={false}
                            isLoading={isExportInProgress}
                            onClick={onExportClickHandler}
                        />
                    </Grid>
                    <Grid item>
                        <ColumnModifierButton
                            isColumnModifierVisible={isColumnModifierVisible}
                            handleOpenColumnModifier={handleOpenColumnModifier}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
