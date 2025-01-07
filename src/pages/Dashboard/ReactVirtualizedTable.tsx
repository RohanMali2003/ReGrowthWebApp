import React, { useEffect, useState } from 'react';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  Box,
  Typography,
} from '@mui/material';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import moment from 'moment'; // Import Moment.js
import { useGetProceduresList } from 'src/hooks/useProcedures'; // Use the custom hook

interface ProcedureData {
  procedureId: number;
  patientId: number;
  procedureDate: string;
  procedureType: string;
  procedureDetail: string;
  cashPayment: number;
  onlinePayment: number;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  clinicName: string;
  cashierName: string;
}

interface ColumnData {
  dataKey: keyof ProcedureData;
  label: string;
  numeric?: boolean;
  width?: number;
}

const columns: ColumnData[] = [
  { width: 100, label: 'Procedure ID', dataKey: 'procedureId', numeric: true },
  { width: 200, label: 'Procedure Date', dataKey: 'procedureDate' },
  { width: 150, label: 'Procedure Type', dataKey: 'procedureType' },
  { width: 150, label: 'Fees', dataKey: 'totalAmount' },
  { width: 150, label: 'Discount', dataKey: 'discount' },
  { width: 150, label: 'Final Amount', dataKey: 'finalAmount', numeric: true },
  { width: 150, label: 'CashierName', dataKey: 'cashierName' },
  
];

const VirtuosoTableComponents: TableComponents<ProcedureData> = {
  Scroller: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    (props, ref) => <TableContainer component={Paper} {...props} ref={ref} />
  ),
  Table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    (props, ref) => <TableHead {...props} ref={ref} />
  ),
  TableRow,
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(index: number, row: ProcedureData) {
  return (
    <>
      {columns.map((column) => (
        <TableCell key={`${row.procedureId}-${column.dataKey}`} align={column.numeric ? 'right' : 'left'}>
          {column.dataKey === 'procedureDate'
            ? moment(row[column.dataKey], 'DD-MM-YYYY').format('DD MMM YYYY')
            : row[column.dataKey]}
        </TableCell>
      ))}
    </>
  );
}

export default function ReactVirtualizedTable() {
  const [filteredData, setFilteredData] = useState<ProcedureData[]>([]);
  const [filter, setFilter] = useState<string>('thisMonth');

  const { response, isLoading, isError } = useGetProceduresList({
    apiConfig: { params: {} }, // Removed pagination temporarily for testing
  });

  useEffect(() => {
    if (response?.content?.length) {
      const data = response.content;
      const now = new Date();

      const startOfThisMonth = moment().startOf('month').toDate();
      const endOfThisMonth = moment().endOf('month').toDate();

      const filtered = data.filter((procedure) => {
        const procedureDate = moment(procedure.procedureDate, 'DD-MM-YYYY').toDate();
        if (filter === 'thisMonth') {
          return procedureDate >= startOfThisMonth && procedureDate <= endOfThisMonth;
        }
        if (filter === 'thisWeek') {
          const startOfThisWeek = moment().startOf('week').toDate();
          const endOfThisWeek = moment().endOf('week').toDate();
          return procedureDate >= startOfThisWeek && procedureDate <= endOfThisWeek;
        }
        return true;
      });

      setFilteredData(filtered);
      console.log('Filtered Data:', filtered); // Log filtered data for debugging
    }
  }, [filter, response]);

  if (isLoading) {
    return <Typography>Loading procedures...</Typography>;
  }

  if (isError) {
    return <Typography color="error">Failed to fetch procedures. Please try again later.</Typography>;
  }

  return (
    <Box>
      <Paper style={{ height: '100%', width: '100%' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography component="h2" variant="subtitle2" gutterBottom sx={{ ml: 2 }}>
            Procedures
          </Typography>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mr: 2 }}
            style={{ minWidth: 150 }}
          >
            <MenuItem value="thisMonth">This Month</MenuItem>
            <MenuItem value="thisWeek">This Week</MenuItem>
          </Select>
        </Box>

        {filteredData.length > 0 ? (
          <TableVirtuoso
            data={filteredData}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
            style={{ height: 400 }} // Ensure a fixed height for virtualization
          />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography>No procedures found for the selected filter.</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
