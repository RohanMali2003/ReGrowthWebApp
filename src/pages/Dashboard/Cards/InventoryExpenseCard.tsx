import React, { useEffect, useState } from 'react';
import { useGetPurchaseOrderList } from 'src/hooks/usePurchaseOrder'; // Import the hook
import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { ERROR_RED } from 'src/constants/colors';
import moment from 'moment'; // Use moment to handle date parsing

const InventoryExpenseCard: React.FC<{
  expense: string;
  percentage: string;
  percentageText: string;
}> = ({ expense, percentage, percentageText }) => {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: ERROR_RED, height: 56, width: 56 }}>
            <MedicalServicesOutlinedIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Inventory Expense (This Month)
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {expense}
            </Typography>
          </Box>
        </Stack>
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2} mt={2}>
          <TrendingDownIcon color="error" />
          <Typography color="error" variant="body2">
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

const InventoryExpenseCardWrapper: React.FC = () => {
  const [expense, setExpense] = useState<string>('₹0');
  const [percentage, setPercentage] = useState<string>('0%');
  const [percentageText, setPercentageText] = useState<string>('Since last month');

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const { response, isLoading, isError } = useGetPurchaseOrderList({
    apiConfig: { params: { page: 0, size: 100 } }, // Adjust params as needed
  });

  useEffect(() => {
    if (!response || isLoading || isError) return;

    let currentMonthTotal = 0;
    let lastMonthTotal = 0;

    response.content.forEach((order: any) => {
      const purchaseDate = moment(order.purchaseDate, 'DD-MM-YYYY').toDate();
      const purchaseMonth = purchaseDate.getMonth();
      const purchaseYear = purchaseDate.getFullYear();

      const totalAmount = Number(order.totalAmount) || 0; // Ensure totalAmount is a valid number

      if (purchaseYear === currentYear && purchaseMonth === currentMonth) {
        currentMonthTotal += totalAmount;
      } else if (purchaseYear === lastMonthYear && purchaseMonth === lastMonth) {
        lastMonthTotal += totalAmount;
      }
    });
    console.log('Last Month Total:', lastMonthTotal);
    console.log('Current Month Total:', currentMonthTotal);
    setExpense(`₹${currentMonthTotal.toLocaleString()}`);

    if (lastMonthTotal > 0) {
      const percentChange = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
      setPercentage(`${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`);
    } else {
      setPercentage('N/A');
    }
  }, [response, isLoading, isError, currentMonth, currentYear, lastMonth, lastMonthYear]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching purchase order data</div>;
  }

  return (
    <InventoryExpenseCard
      expense={expense}
      percentage={percentage}
      percentageText="Since last month"
    />
  );
};

export default InventoryExpenseCardWrapper;
