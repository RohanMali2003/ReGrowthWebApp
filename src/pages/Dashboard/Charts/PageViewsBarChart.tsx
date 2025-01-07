import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import {Stack,IconButton} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import { useGetProceduresList } from 'src/hooks/useProcedures'; // Import the hook
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PROCEDURES } from 'src/constants/paths'; 

export default function PageViewsBarChart() {
  const theme = useTheme();
  const navigate = useNavigate();
  const colorPalette = ['#1E88E5', '#1976D2', '#90CAF9'];
  const days = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const [monthlySessions, setMonthlySessions] = useState<number[]>(Array(12).fill(0));
  const [totalSessions, setTotalSessions] = useState<number>(0);

  // Fetch procedure data using the custom hook
  const { response, isLoading, isError } = useGetProceduresList({
    apiConfig: { params: {} },
    useQueryConfig: { staleTime: 5 * 60 * 1000 },
  });

  useEffect(() => {
    if (!response || isLoading || isError) return;
  
    const procedures = response.content || [];
    const currentYear = new Date().getFullYear();
  
    const monthlyCounts = Array(12).fill(0);
  
    procedures.forEach((procedure: any) => {
      const [day, month, year] = procedure.procedureDate.split('-').map(Number); // Parse DD-MM-YYYY
      const procedureDate = new Date(year, month - 1, day); // Create a valid Date object
      const procedureMonth = procedureDate.getMonth();
      const procedureYear = procedureDate.getFullYear();
  
      // Only count sessions from the current year
      if (procedureYear === currentYear) {
        monthlyCounts[procedureMonth]++;
      }
    });
  
    const total = monthlyCounts.reduce((sum, count) => sum + count, 0);
  
    setMonthlySessions(monthlyCounts);
    setTotalSessions(total);
  
    console.log('Monthly Sessions:', monthlyCounts); // Debugging output
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
                    Total Sessions
                    <IconButton
                        aria-label="View Procedures"
                        onClick={() => navigate(PROCEDURES)}
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
              {totalSessions}
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Total sessions for the current year
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: days,
            },
          ] as any}
          series={[
            {
              id: 'sessions',
              label: 'Sessions',
              data: monthlySessions,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
