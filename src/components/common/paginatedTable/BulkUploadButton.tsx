import { UploadOutlined } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

import { AppTooltip, AppLoader } from 'components/common';

interface BulkUploadButtonProps {
    isDisabled: boolean;
    isLoading: boolean;
    onClick: VoidFunction;
}

export const BulkUploadButton = ({
    isDisabled,
    isLoading,
    onClick
}: BulkUploadButtonProps) => {
    const handleOnClick = () => {
        onClick();
    };

    return (
        <>
            {isLoading && <AppLoader />}
            <AppTooltip title="Bulk Upload">
                <LoadingButton
                    size="small"
                    variant="outlined"
                    color="primary"
                    aria-label="Upload"
                    component="span"
                    disabled={isDisabled}
                    loading={isLoading}
                    loadingPosition="start"
                    onClick={handleOnClick}
                    startIcon={<UploadOutlined />}
                >
                    Bulk Upload
                </LoadingButton>
            </AppTooltip>
        </>
    );
};
