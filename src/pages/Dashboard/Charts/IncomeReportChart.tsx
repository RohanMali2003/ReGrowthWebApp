import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import {Stack,IconButton} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useGetProceduresList } from 'src/hooks/useProcedures';
import { CLINIC_PROCEDURE_REPORT } from 'src/constants/paths'; 
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

export default function IncomeReportChart() {
  const theme = useTheme();
    const navigate = useNavigate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const colorPalette = ['#1E88E5', '#1976D2', '#90CAF9'];

  // States for dynamic data
  const [onlineIncome, setOnlineIncome] = useState<number[]>(Array(12).fill(0));
  const [cashIncome, setCashIncome] = useState<number[]>(Array(12).fill(0));
  const [discounts, setDiscounts] = useState<number[]>(Array(12).fill(0));
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number>(0);

  // Fetch procedure data using the custom hook
  const { response, isLoading, isError } = useGetProceduresList({
    apiConfig: { params: {} },
    useQueryConfig: { staleTime: 5 * 60 * 1000 },
  });

  useEffect(() => {
    if (!response || isLoading || isError) return;

    const procedures = response.content || [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const monthlyOnlineIncome = Array(12).fill(0);
    const monthlyCashIncome = Array(12).fill(0);
    const monthlyDiscounts = Array(12).fill(0);

    procedures.forEach((procedure: any) => {
      const [day, month, year] = procedure.procedureDate.split('-').map(Number); // Parse DD-MM-YYYY format
      const procedureDate = new Date(year, month - 1, day); // Create Date object
      const procedureMonth = procedureDate.getMonth();
      const procedureYear = procedureDate.getFullYear();

      if (procedureYear === currentYear) {
        monthlyOnlineIncome[procedureMonth] += procedure.onlinePayment || 0;
        monthlyCashIncome[procedureMonth] += procedure.cashPayment || 0;
        monthlyDiscounts[procedureMonth] += procedure.discount || 0;
      }
    });

    // Calculate totals and percentage change
    const currentMonthTotal =
      monthlyOnlineIncome[currentMonth] +
      monthlyCashIncome[currentMonth] -
      monthlyDiscounts[currentMonth];
    const lastMonthTotal =
      monthlyOnlineIncome[lastMonth] +
      monthlyCashIncome[lastMonth] -
      monthlyDiscounts[lastMonth];

    const percentChange =
      lastMonthTotal > 0 ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0;

    setOnlineIncome(monthlyOnlineIncome);
    setCashIncome(monthlyCashIncome);
    setDiscounts(monthlyDiscounts);
    setTotalIncome(currentMonthTotal);
    setPercentageChange(percentChange);
  }, [response, isLoading, isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
       
        <Typography component="h2" variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Income Report (Online vs Cash with Discounts)
                    <IconButton
                        aria-label="View Procedures"
                        onClick={() => navigate(CLINIC_PROCEDURE_REPORT)}
                        size="small"
                        sx={{ ml: 1 }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              ₹{totalIncome.toLocaleString()}
            </Typography>
            <Chip
              size="small"
              color={percentageChange < 0 ? 'error' : 'success'}
              label={`${percentageChange.toFixed(1)}%`}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Income for the last 12 months (Online, Cash, Discounts)
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data: months,
            },
          ]}
          series={[
            {
              id: 'online',
              label: 'Online',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              data: onlineIncome,
            },
            {
              id: 'cash',
              label: 'Cash',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              data: cashIncome,
            },
            {
              id: 'discount',
              label: 'Discount',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              data: discounts,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-online': {
              fill: "url('#online')",
            },
            '& .MuiAreaElement-series-cash': {
              fill: "url('#cash')",
            },
            '& .MuiAreaElement-series-discount': {
              fill: "url('#discount')",
            },
          }}
        >
          <AreaGradient color={colorPalette[0]} id="online" />
          <AreaGradient color={colorPalette[1]} id="cash" />
          <AreaGradient color={colorPalette[2]} id="discount" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
