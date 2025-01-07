import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import moment from 'moment';
import { SUCCESS_GREEN } from 'src/constants/colors';
import { useGetProceduresList } from 'src/hooks/useProcedures';

const ProcedureCountCard: React.FC = () => {
  const [total, setTotal] = useState<number>(0); // Current month total
  const [percentage, setPercentage] = useState<string>('0%'); // Percentage change
  const [isTrendingUp, setIsTrendingUp] = useState<boolean>(true); // Icon indicator

  const { response, isLoading, isError } = useGetProceduresList({
    apiConfig: { params: {} },
    useQueryConfig: { staleTime: 5 * 60 * 1000 },
  });

  useEffect(() => {
    if (!response || isLoading || isError) return;

    const procedures = response.content || [];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let currentMonthCount = 0;
    let lastMonthCount = 0;

    procedures.forEach((procedure: any) => {
      if (!procedure.procedureDate) return; // Skip if procedureDate is missing

      const procedureDate = moment(procedure.procedureDate, 'DD-MM-YYYY').toDate();
      const procedureMonth = procedureDate.getMonth();
      const procedureYear = procedureDate.getFullYear();

      if (procedureYear === currentYear && procedureMonth === currentMonth) {
        currentMonthCount += 1;
      } else if (procedureYear === lastMonthYear && procedureMonth === lastMonth) {
        lastMonthCount += 1;
      }
    });

    setTotal(currentMonthCount);

    if (lastMonthCount > 0) {
      const percentChange = ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100;
      setPercentage(`${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`);
      setIsTrendingUp(percentChange > 0);
    } else {
      setPercentage('N/A');
      setIsTrendingUp(true);
    }
  }, [response, isLoading, isError]);

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: SUCCESS_GREEN, height: 56, width: 56 }}>
            <MedicalServicesOutlinedIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Total Procedures
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {total}
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

export default ProcedureCountCard;
