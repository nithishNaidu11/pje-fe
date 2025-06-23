import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import LoadingButton from '@mui/lab/LoadingButton';

import { AppTooltip, AppLoader } from 'components/common';

interface ExportButtonProps {
    isDisabled: boolean;
    isLoading: boolean;
    onClick: VoidFunction;
}

export const ExportButton = ({
    isDisabled,
    isLoading,
    onClick
}: ExportButtonProps) => {
    const handleOnClick = () => {
        onClick();
    };

    return (
        <>
            {isLoading && <AppLoader />}
            <AppTooltip title="Export">
                <LoadingButton
                    size="small"
                    variant="outlined"
                    color="primary"
                    aria-label="Export"
                    component="span"
                    disabled={isDisabled}
                    loading={isLoading}
                    loadingPosition="start"
                    onClick={handleOnClick}
                    startIcon={<SystemUpdateAltIcon />}
                >
                    Export
                </LoadingButton>
            </AppTooltip>
        </>
    );
};
