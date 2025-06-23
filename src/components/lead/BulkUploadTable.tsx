import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import { red } from '@mui/material/colors';

export interface ColumnFieldProps {
    field: string;
    headerName: string;
    width: number;
}

export interface RowProps {
    [key: string]: { value: string };
}

type Props = {
    columns: any;
    rows: any;
};
export const BulkUploadTable = ({ columns, rows }: Props) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        {columns.map((column: any) => (
                            <TableCell key={column.field}>
                                {column.headerName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any, index: number) => (
                        <TableRow key={index}>
                            {Object.keys(row).map(
                                (cell: any, index: number) => (
                                    <TableCell
                                        key={index}
                                        sx={{
                                            backgroundColor: row[cell].error
                                                ? red[400]
                                                : 'inherit'
                                        }}
                                    >
                                        {row[cell].value}
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
