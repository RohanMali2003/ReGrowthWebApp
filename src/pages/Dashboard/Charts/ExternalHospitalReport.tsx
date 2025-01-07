import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Stack,IconButton} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useGetExternalProcedureList } from 'src/hooks/useExternalProcedures';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { VIEW_EXTERNAL_PROCEDURE_PATH,EXTERNAL_PROCEDURE } from 'src/constants/paths'; 

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

export default function MonthlyIncomeDiscountReport() {
  const theme = useTheme();
  const navigate = useNavigate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const colorPalette = [theme.palette.primary.main, theme.palette.secondary.main];

  const [monthlyIncome, setMonthlyIncome] = useState<number[]>(Array(12).fill(0));
  const [monthlyDiscount, setMonthlyDiscount] = useState<number[]>(Array(12).fill(0));

  const { response, isLoading, isError } = useGetExternalProcedureList({
    apiConfig: { params: {} },
    useQueryConfig: { staleTime: 5 * 60 * 1000 },
  });

  useEffect(() => {
    if (!response || isLoading || isError) return;

    const procedures = response.content || [];
    const currentYear = new Date().getFullYear();
    const incomeData = Array(12).fill(0);
    const discountData = Array(12).fill(0);

    procedures.forEach((procedure) => {
      const procedureDate = procedure.procedureDate;
      
      // Ensure valid procedureDate before proceeding
      if (!procedureDate) return;

      const [day, month, year] = procedureDate.split('-').map(Number); // Parse DD-MM-YYYY format
      if (year === currentYear) {
        incomeData[month - 1] += procedure.finalAmount || 0; // finalAmount represents the income
        discountData[month - 1] += procedure.discount || 0; // discount is tracked separately
      }
    });

    setMonthlyIncome(incomeData);
    setMonthlyDiscount(discountData);
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
                    External Procedures Report
                    <IconButton
                        aria-label="View External Procedures"
                        onClick={() => navigate(EXTERNAL_PROCEDURE)}
                        size="small"
                        sx={{ ml: 1 }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Trends for income and discount over the last 12 months
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
              id: 'income',
              label: 'Total Income',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              data: monthlyIncome,
            },
            {
              id: 'discount',
              label: 'Discount',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              data: monthlyDiscount,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-income': {
              fill: "url('#income')",
            },
            '& .MuiAreaElement-series-discount': {
              fill: "url('#discount')",
            },
          }}
        >
          <AreaGradient color={colorPalette[0]} id="income" />
          <AreaGradient color={colorPalette[1]} id="discount" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
