import styled from '@emotion/styled';

import { Box, Grid, Typography, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SxProps, useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';


import { ALLOWED_EXTENSION } from 'Enum';

interface UploadButtonProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading?: boolean;
    color?: string;
    title?: string;
    name: string;
    value?: string;
    required?: boolean;
    onRemove?: (_: string) => void;
    disabled?: boolean;
    acceptFileType?: Array<ALLOWED_EXTENSION>;
    sx?: SxProps;
}

export const UploadButton = ({
    onChange,
    isLoading = false,
    title = 'UPLOAD',
    color,
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
    color = color ?? theme.palette.primary.main;

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
                                        borderRadius: '15px',
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        width: '100%'
                                    },
                                    borderRadius: '15px'
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
                                        borderRadius={15}
                                        container
                                        alignItems="center"
                                        justifyContent="start"
                                        sx={{
                                            py: 1,
                                            borderRadius: '15px'
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
                                borderRadius={15}
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
                                            : color,
                                        textTransform: 'uppercase',
                                        py: 1,
                                        px: 2,
                                        borderRadius: 15,
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
                                        color={disabled ? grey[500] : color}
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
