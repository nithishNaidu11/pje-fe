import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';

interface PJEBulkUploadFormFooterProps {
    isLoading: boolean;
    onSubmit: VoidFunction;
    hasError: boolean;
    isDisabled: boolean;
}

export const PJEBulkUploadFormFooter = ({
    isLoading,
    onSubmit,
    hasError,
    isDisabled
}: PJEBulkUploadFormFooterProps) => (
    <>
        {isLoading ? (
            <LoadingButton loading variant="contained" size="large">
                SAVE
            </LoadingButton>
        ) : (
            <Button
                variant="contained"
                onClick={onSubmit}
                disabled={hasError || isDisabled}
                size="large"
            >
                SAVE
            </Button>
        )}
    </>
);
