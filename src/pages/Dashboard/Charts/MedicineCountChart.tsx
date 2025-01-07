import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { Typography, Card, Divider, styled, IconButton, CardContent, Box, Stack } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useGetLowStockMedicines } from 'src/hooks/useMedicines';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MEDICINES } from 'src/constants/paths'; // Import the view path


// Styled text for center labels in the pie chart
interface StyledTextProps {
    variant: 'primary' | 'secondary';
}

// Styled text for center labels in the pie chart
const StyledText = styled('text', { shouldForwardProp: (prop) => prop !== 'variant' })<StyledTextProps>(
    ({ theme }) => ({
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fill: theme.palette.text.secondary,
        variants: [
            {
                props: { variant: 'primary' },
                style: { fontSize: theme.typography.h5.fontSize, fontWeight: theme.typography.h5.fontWeight },
            },
            {
                props: { variant: 'secondary' },
                style: { fontSize: theme.typography.body2.fontSize, fontWeight: theme.typography.body2.fontWeight },
            },
        ],
    })
);


// Center label for the pie chart
interface PieCenterLabelProps {
    primaryText: string;
    secondaryText: string;
}

function PieCenterLabel({ primaryText, secondaryText }: PieCenterLabelProps) {
    const { width, height, left, top } = useDrawingArea();
    const primaryY = top + height / 2 - 10;
    const secondaryY = primaryY + 24;

    return (
        <>
            <StyledText variant="primary" x={left + width / 2} y={primaryY}>
                {primaryText}
            </StyledText>
            <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
                {secondaryText}
            </StyledText>
        </>
    );
}

export default function MedicineCountChart() {
    const { response: medicines = [], isLoading, isError } = useGetLowStockMedicines();
    const [totalQuantity, setTotalQuantity] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        if (Array.isArray(medicines)) {
            const total = medicines.reduce((sum, medicine) => sum + medicine.quantity, 0);
            setTotalQuantity(total);
        }
    }, [medicines]);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (isError) {
        return <Typography color="error">Failed to fetch medicines. Please try again later.</Typography>;
    }

    const colors = medicines.map((_, index) => `hsl(${210 - index * 20}, 60%, ${70 - index * 5}%)`);

    return (
        <Card
            variant="outlined"
            sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: 500 }}
        >
            <CardContent>
                <Typography component="h2" variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Low Stock Medicines
                    <IconButton
                        aria-label="View Medicine"
                        onClick={() => navigate(MEDICINES)}
                        size="small"
                        sx={{ ml: 1 }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PieChart
                        colors={colors}
                        margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
                        series={[
                            {
                                data: medicines.map((medicine) => ({
                                    label: medicine.medicineName,
                                    value: medicine.quantity,
                                })),
                                innerRadius: 75,
                                outerRadius: 100,
                                paddingAngle: 0,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                            },
                        ]}
                        height={260}
                        width={260}
                        slotProps={{ legend: { hidden: true } }}
                    >
                        <PieCenterLabel primaryText={medicines.length.toString()} secondaryText="Total Medicines" />
                    </PieChart>
                </Box>
                <Box sx={{ maxHeight: 120, overflowY: 'auto', mt: 2, pr: 1 }}>
                    {medicines.map((medicine, index) => (
                        <Stack key={medicine.medicineId} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    backgroundColor: colors[index],
                                }}
                            />
                            <Stack sx={{ gap: 1, flexGrow: 1 }}>
                                <Stack
                                    direction="row"
                                    sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: '500' }}>
                                        {medicine.medicineName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {((medicine.quantity / totalQuantity) * 100).toFixed(1)}%
                                    </Typography>
                                </Stack>
                                <LinearProgress
                                    variant="determinate"
                                    aria-label="Count of medicine"
                                    value={(medicine.quantity / totalQuantity) * 100}
                                    sx={{
                                        [`& .${linearProgressClasses.bar}`]: {
                                            backgroundColor: colors[index],
                                        },
                                    }}
                                />
                            </Stack>
                        </Stack>
                    ))}
                </Box>
                <Divider sx={{ mt: 2 }} />
            </CardContent>
        </Card>
    );
}
