import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import { AppTooltip } from 'components/common';

interface DownloadButtonProps {
    title?: string;
    isDisabled: boolean;
    onClick: VoidFunction;
}

export const DownloadButton = ({
    isDisabled,
    onClick,
    title = 'Download'
}: DownloadButtonProps) => {
    return (
        <AppTooltip title={title}>
            <Button
                size="small"
                variant="outlined"
                color="primary"
                aria-label="Download"
                component="span"
                disabled={isDisabled}
                onClick={onClick}
                startIcon={<DownloadIcon />}
            >
                {title}
            </Button>
        </AppTooltip>
    );
};
