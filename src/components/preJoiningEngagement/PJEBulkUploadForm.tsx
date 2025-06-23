import React, { SyntheticEvent } from 'react';

import Papa, { ParseResult } from 'papaparse';
import { UseQueryResult } from '@tanstack/react-query';

import {
    Alert,
    Button,
    Box,
    Grid,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import { Dropzone, DROPZONE_FILETYPE } from '@hunar.ai/hunar-design-system';

import { SingleEntityEditDrawer } from 'components/common/singleEntityEditDrawer';
import { BulkUploadTable } from 'components/lead/BulkUploadTable';
import { PJEBulkUploadFormFooter } from './PJEBulkUploadFormFooter';
import { usePJEUploadHelper } from './usePJEUploadHelper';

import { useToast } from 'hooks/useToast';
import { useBulkUploadPJE } from 'hooks/apiHooks/preJoiningEngagement/useBulkUploadPJE';

import { AB_PAYROLL_TYPE } from 'Enum';
import { ApiError } from 'interfaces';

interface PJEBulkUploadFormProps {
    isOpen: boolean;
    onCloseHandler: () => void;
    refetchData: UseQueryResult['refetch'];
}

export const PJEBulkUploadForm = ({
    isOpen,
    onCloseHandler,
    refetchData
}: PJEBulkUploadFormProps) => {
    const companyId = 'abc-onboarding';
    const {
        error,
        columns,
        rows,
        setBulkUploadData,
        setError,
        setColumns,
        setRows
    } = usePJEUploadHelper();
    const bulkUploadPreJoiningLeads = useBulkUploadPJE();
    const { showSuccess, showError } = useToast();

    const [payrollType, setPayrollType] = React.useState<AB_PAYROLL_TYPE>(
        AB_PAYROLL_TYPE.NON_POORNATA
    );
    const [files, setFiles] = React.useState([]);
    const [csv, setCsv] = React.useState<File>();

    const resetToInitialState = React.useCallback(() => {
        setError('');
        setRows([]);
        setColumns([]);
        setFiles([]);
        setCsv(undefined);
    }, [setColumns, setError, setRows]);

    const onHandlePayrollTypeChange = React.useCallback(
        (event: SyntheticEvent<Element, Event>, checked: boolean) => {
            setPayrollType(
                checked
                    ? AB_PAYROLL_TYPE.POORNATA
                    : AB_PAYROLL_TYPE.NON_POORNATA
            );
        },
        []
    );

    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            setRows([]);
            setColumns([]);
            setError('');
            setFiles([]);
            acceptedFiles.forEach((file: File) => {
                setError('');
                setFiles([...files]);
                Papa.parse(file, {
                    complete: (
                        parsedData: ParseResult<{ data: string[][] }>
                    ) => {
                        setCsv(file);
                        setBulkUploadData(
                            parsedData as unknown as { data: string[][] }
                        );
                    },
                    error: (error: Error) => {
                        showError({ message: JSON.stringify(error) });
                    }
                });
            });
        },
        [files, setBulkUploadData, setColumns, setError, setRows, showError]
    );

    const onSubmit = () => {
        bulkUploadPreJoiningLeads.mutate(
            {
                candidateFile: csv,
                companyId,
                payrollType
            },
            {
                onSuccess: () => {
                    showSuccess({ message: 'Uploaded successfully!' });
                    refetchData();
                    resetToInitialState();
                    onCloseHandler();
                },
                onError: (error: ApiError) => {
                    setError(error.errors.displayError);
                    showError({ message: error.errors.displayError });
                }
            }
        );
    };

    return (
        <SingleEntityEditDrawer
            isOpen={isOpen}
            header="Bulk Upload"
            isLoading={false}
            onClose={onCloseHandler}
            footer={
                <PJEBulkUploadFormFooter
                    onSubmit={onSubmit}
                    isLoading={bulkUploadPreJoiningLeads.isLoading}
                    hasError={!!error}
                    isDisabled={!csv}
                />
            }
        >
            <Grid
                container
                rowSpacing={2}
                columnSpacing={1}
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight={600}>
                        Download the CSV file, add your worker data, save it,
                        and upload it below.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel
                            label="Payroll is for Poornata"
                            onChange={onHandlePayrollTypeChange}
                            control={
                                <Checkbox
                                    checked={
                                        payrollType === AB_PAYROLL_TYPE.POORNATA
                                    }
                                />
                            }
                        />
                    </FormGroup>
                </Grid>
                {columns?.length > 1 ? (
                    <>
                        <>
                            <Grid item md={10}>
                                {error ? (
                                    <Alert severity="error">{error}</Alert>
                                ) : (
                                    <Alert severity="success">
                                        Passed intitial validations. Finish to
                                        upload in the system.
                                    </Alert>
                                )}
                            </Grid>
                            <Grid item md={2} justifyContent="right">
                                <Button
                                    sx={{ py: 1 }}
                                    variant="text"
                                    size="small"
                                    onClick={resetToInitialState}
                                >
                                    Re-upload
                                </Button>
                            </Grid>
                        </>
                        <Grid item xs={12}>
                            <BulkUploadTable rows={rows} columns={columns} />
                        </Grid>
                    </>
                ) : (
                    <>
                        {error && (
                            <>
                                <Grid item xs={12}>
                                    <Alert severity="error">{error}</Alert>
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <Box
                                height={230}
                                sx={{
                                    '#dropzone-box': {
                                        height: 230
                                    }
                                }}
                            >
                                <Dropzone
                                    onDrop={onDrop}
                                    type={DROPZONE_FILETYPE.CSV}
                                />
                            </Box>
                        </Grid>
                    </>
                )}
            </Grid>
        </SingleEntityEditDrawer>
    );
};
