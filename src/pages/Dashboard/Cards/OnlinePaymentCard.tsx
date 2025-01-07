import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import moment from 'moment';
import { SUCCESS_GREEN, SKY_BLUE } from 'src/constants/colors';
import { useGetProceduresList } from 'src/hooks/useProcedures';

const OnlinePaymentCard: React.FC = () => {

    const [totalIncome, setTotalIncome] = useState<string>('₹0');
      const [percentage, setPercentage] = useState<string>('0%');
      const [isTrendingUp, setIsTrendingUp] = useState<boolean>(true);

      const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const { response, isLoading, isError } = useGetProceduresList({
      apiConfig: { params: {} },
      useQueryConfig: { staleTime: 5 * 60 * 1000 },
    });

    useEffect(() => {
        if (!response || isLoading || isError) return;
    
        const procedures = response.content || [];
        let currentMonthTotal = 0;
        let lastMonthTotal = 0;
    
        procedures.forEach((procedure: any) => {
          // Parse the date correctly using moment
          const procedureDate = moment(procedure.procedureDate, 'DD-MM-YYYY').toDate();
          const procedureMonth = procedureDate.getMonth();
          const procedureYear = procedureDate.getFullYear();
    
          const finalAmount = Number(procedure.onlinePayment) || 0; // Ensure finalAmount is a valid number
    
          if (procedureYear === currentYear && procedureMonth === currentMonth) {
            currentMonthTotal += finalAmount;
          } else if (procedureYear === lastMonthYear && procedureMonth === lastMonth) {
            lastMonthTotal += finalAmount;
          }
        });
    
        setTotalIncome(`₹${currentMonthTotal.toLocaleString()}`);
    
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
        return (
          <Card sx={{ borderRadius: 3, padding: 2 }}>
            <Typography variant="body2">Loading...</Typography>
          </Card>
        );
      }
    
      if (isError) {
        return (
          <Card sx={{ borderRadius: 3, padding: 2 }}>
            <Typography color="error" variant="body2">
              Failed to load data.
            </Typography>
          </Card>
        );
      }
  

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: SKY_BLUE, height: 56, width: 56 }}>
                        <CreditCardIcon fontSize="large" />
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Online
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {totalIncome}
                        </Typography>
                    </Box>
                </Stack>
                <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2} mt={2}>
                    {isTrendingUp ? (
                        <TrendingUpIcon color="success" />
                    ) : (
                        <TrendingDownIcon color="error" />
                    )}
                    <Typography color={isTrendingUp ? 'success.main' : 'error'} variant="body2">
                        {percentage}
                    </Typography>
                    <Typography color="text.secondary" variant="caption">
                        Since last month
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default OnlinePaymentCard;