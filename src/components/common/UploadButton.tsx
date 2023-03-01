import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import { ALLOWED_EXTENSION } from 'Enum';

interface UploadButtonProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading?: boolean;
    title?: string;
    name: string;
    value?: string;
    required?: boolean;
    onRemove?: (_: string) => void;
    disabled?: boolean;
    acceptFileType?: Array<ALLOWED_EXTENSION>;
}

export const UploadButton = ({
    onChange,
    isLoading = false,
    title = 'UPLOAD',
    name,
    value,
    required = false,
    onRemove,
    disabled = false,
    acceptFileType
}: UploadButtonProps) => {
    const Input = styled('input')({
        display: 'none'
    });
    const theme = useTheme();

    const getFormattedValue = (value: string, requiredLength: number) => {
        const firstPart = value?.slice(
            value?.lastIndexOf('/') + 1,
            value?.lastIndexOf('/') + requiredLength
        );
        const shortOfFirstPart = firstPart?.length || 0;
        let formattedFirstPart =
            shortOfFirstPart < requiredLength - 1 && shortOfFirstPart > 0
                ? `${requiredLength - 1 - shortOfFirstPart}`
                : firstPart;
        if (shortOfFirstPart < requiredLength - 1 && shortOfFirstPart > 0) {
            for (let i = 0; i < requiredLength - 1 - shortOfFirstPart; i++) {
                formattedFirstPart += '.';
            }
        }
        const extension = value?.slice(value?.lastIndexOf('.'), value?.length);
        const formattedValue = `${formattedFirstPart}...${extension}`;
        return formattedValue;
    };

    return (
        <>
            {isLoading ? (
                <LoadingButton variant="contained" loading>
                    Uploading...
                </LoadingButton>
            ) : (
                <>
                    {value ? (
                        required ? (
                            <Box
                                sx={{
                                    ' > label': {
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        width: '100%'
                                    }
                                }}
                            >
                                <label htmlFor={`${name}-button-file`}>
                                    <Input
                                        name={`${name}`}
                                        id={`${name}-button-file`}
                                        type="file"
                                        onChange={onChange}
                                        accept={acceptFileType?.join(',')}
                                    />
                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="start"
                                        sx={{
                                            py: 1,

                                            borderRadius: 1
                                        }}
                                    >
                                        <>
                                            <Typography
                                                variant="body2"
                                                noWrap
                                                component="div"
                                                color={'primary'}
                                            >
                                                {getFormattedValue(value, 15)}
                                            </Typography>
                                        </>
                                    </Grid>
                                </label>
                            </Box>
                        ) : (
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid
                                    item
                                    md={11}
                                    display="flex"
                                    justifyContent="end"
                                >
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        component="div"
                                    >
                                        {getFormattedValue(value, 9)}
                                    </Typography>
                                </Grid>
                                <Grid item md={1}>
                                    <IconButton
                                        onClick={() => onRemove?.(name)}
                                        size="small"
                                    >
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        )
                    ) : (
                        <Box
                            sx={{
                                ' > label': {
                                    display: 'inline-block',
                                    cursor: disabled ? '' : 'pointer',
                                    width: '100%'
                                }
                            }}
                        >
                            <label htmlFor={`${name}-button-file`}>
                                <Input
                                    name={`${name}`}
                                    id={`${name}-button-file`}
                                    type="file"
                                    onChange={onChange}
                                    disabled={disabled}
                                    accept={acceptFileType?.join(',')}
                                />
                                <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{
                                        border: disabled ? 'none' : '1px solid',
                                        borderColor: disabled
                                            ? 'disabled'
                                            : theme.palette.primary.main,
                                        textTransform: 'uppercase',
                                        py: 1,
                                        px: 2,
                                        borderRadius: 1,
                                        backgroundColor: disabled
                                            ? grey[300]
                                            : 'inherit'
                                    }}
                                >
                                    <Typography
                                        fontWeight={500}
                                        variant="body2"
                                        noWrap
                                        component="div"
                                        color={disabled ? grey[500] : 'primary'}
                                    >
                                        {title}
                                    </Typography>
                                </Grid>
                            </label>
                        </Box>
                    )}
                </>
            )}
        </>
    );
};
