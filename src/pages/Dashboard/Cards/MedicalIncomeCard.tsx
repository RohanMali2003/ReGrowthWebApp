import React, { useEffect, useState } from 'react';
import { useGetSalesList } from 'src/hooks/useSalesOrder'; // Import the hook
import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { SUCCESS_GREEN } from 'src/constants/colors';
import moment from 'moment'; // Use moment to handle date parsing

const MedicalIncomeCard: React.FC<{
  income: string;
  percentage: string;
  percentageText: string;
}> = ({ income, percentage, percentageText }) => {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: SUCCESS_GREEN, height: 56, width: 56 }}>
            <CurrencyRupeeIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Medical Income (This Month)
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {income}
            </Typography>
          </Box>
        </Stack>
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2} mt={2}>
          <TrendingUpIcon color="success" />
          <Typography color="success.main" variant="body2">
            {percentage}
          </Typography>
          <Typography color="text.secondary" variant="caption">
            {percentageText}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const MedicalIncomeCardWrapper: React.FC = () => {
  const [income, setIncome] = useState<string>('₹0');
  const [percentage, setPercentage] = useState<string>('0%');
  const [percentageText, setPercentageText] = useState<string>('Since last month');
  const [isTrendingUp, setIsTrendingUp] = useState<boolean>(true);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const { response, isLoading, isError } = useGetSalesList({
    apiConfig: { params: { page: 0, size: 100 } }, // Adjust params as needed
  });

  useEffect(() => {
    if (!response || isLoading || isError) return;

    let currentMonthTotal = 0;
    let lastMonthTotal = 0;

    response.content.forEach((saleOrder: any) => {
      const billDate = moment(saleOrder.billDate, 'DD-MM-YYYY').toDate();
      const billMonth = billDate.getMonth();
      const billYear = billDate.getFullYear();

      const totalAmount = Number(saleOrder.totalAmount) || 0; // Ensure totalAmount is a valid number

      if (billYear === currentYear && billMonth === currentMonth) {
        currentMonthTotal += totalAmount;
      } else if (billYear === lastMonthYear && billMonth === lastMonth) {
        lastMonthTotal += totalAmount;
      }
    });

    setIncome(`₹${currentMonthTotal.toLocaleString()}`);

    if (lastMonthTotal > 0) {
      const percentChange = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
      setPercentage(`${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`);
      setIsTrendingUp(percentChange > 0);
    } else {
      setPercentage('N/A');
      setIsTrendingUp(true);
    }
  }, [response, isLoading, isError, currentMonth, currentYear, lastMonth, lastMonthYear]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching sales data</div>;
  }

  return (
    <MedicalIncomeCard
      income={income}
      percentage={percentage}
      percentageText={percentageText}
    />
  );
};

export default MedicalIncomeCardWrapper;
