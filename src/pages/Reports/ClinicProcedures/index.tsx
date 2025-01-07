import React, { useState,useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
    SubPanel,
    PageLoader,
    Table,
    Snackbar,
    InfoField,
    FormInput,
} from 'src/components';
import {
    Select,
    MenuItem,
    FormControl,
    Divider,
    InputLabel,
    Typography,
    Button,
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { HiOutlineCash } from 'react-icons/hi';
import { MdBookOnline } from 'react-icons/md';
import { TbReportSearch } from 'react-icons/tb';
import { FaMobileAlt } from "react-icons/fa";
import { RiDiscountPercentLine } from "react-icons/ri";
import { viewProcedureReportBreadCrumbLinks, ProceduresReportTableColumns } from '../../Procedures/constants';
import { WHITE_SMOKE } from 'src/constants/colors';
import { useGetFilteredProcedures } from 'src/hooks/useProcedures';
import { usePagination } from 'src/hooks/usePagination';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { format } from 'date-fns';

const ClinicProcedures: React.FC = (): JSX.Element => {
    const { snackbarAlertState, setSnackbarAlertState, onDismiss } = useSnackbarAlert();
    const { pageNumber, changePageNumber } = usePagination();

    const [filters, setFilters] = useState({ session: 'Both' });
    const [shouldFetch, setShouldFetch] = useState(false);

    const methods = useForm({
        defaultValues: {
            fromDate: '',
            toDate: '',
        },
    });

    const { control, handleSubmit, watch, setValue, formState: { errors } } = methods;

    const formatDate = (date: string) => {
        return date ? format(new Date(date), 'dd-MM-yyyy') : '';
    };

    const { response, isFetching, isError, refetch } = useGetFilteredProcedures({
        fromDate: formatDate(watch('fromDate')),
        toDate: formatDate(watch('toDate')),
        session: filters.session,
    });

    const noData = !response?.length;

    const onApplyFilters = () => {
        setShouldFetch(true); // Mark as ready to fetch
        refetch(); // Trigger the query manually
    };

    const menuItems: string[] = ['Morning', 'Evening', 'Both'];

    const { cashTotal, onlineTotal, finalAmountTotal,discountTotal } = useMemo(() => {
        if (!response || response.length === 0) {
            return { cashTotal: 0, onlineTotal: 0, finalAmountTotal: 0, discountTotal: 0 };
        }
        return response.reduce(
            (totals, procedure) => {
                totals.cashTotal += procedure.cashPayment || 0;
                totals.onlineTotal += procedure.onlinePayment || 0;
                totals.discountTotal += procedure.discount || 0;
                totals.finalAmountTotal += procedure.finalAmount || 0;
                return totals;
            },
            { cashTotal: 0, onlineTotal: 0,discountTotal: 0, finalAmountTotal: 0 }
        );
    }, [response]);

    return (
        <>
            <Snackbar
                open={!!snackbarAlertState.message}
                severity={snackbarAlertState.severity}
                message={snackbarAlertState.message}
                onClose={onDismiss}
            />

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onApplyFilters)}>
                    <Stack spacing={2}>
                        <SubPanel
                            pageTitle="INCOME BY CLINIC PROCEDURES"
                            breadcrumbLinks={viewProcedureReportBreadCrumbLinks}
                        />

                        <Stack spacing={2}>
                            <Box display="flex" justifyContent="space-between" sx={{ width: '100%' }}>
                                <Box
                                    sx={{
                                        padding: '20px',
                                        borderRadius: '10px',
                                        width: '45%',
                                        marginRight: '20px',
                                        backgroundColor: WHITE_SMOKE,
                                    }}
                                >
                                    <Typography
                                        variant="appBlack"
                                        sx={{ fontSize: '15px', fontWeight: 700, marginBottom: '13px' }}
                                    >
                                        PERSONAL INFORMATION
                                    </Typography>
                                    <Divider sx={{ marginBottom: '13px' }} />
                                    <Stack spacing={2}>
                                        <FormInput
                                            name="fromDate"
                                            control={control}
                                            type="date"
                                            label="From Date"
                                            placeholder="Select a date"
                                            rules={{ required: "From Date is required" }}
                                            showNeverExpireSwitch={false}
                                            error={errors.fromDate?.message} // Display validation error
                                            helperText="Please choose a valid start date"
                                        />

                                        <FormInput
                                            name="toDate"
                                            control={control}
                                            type="date"
                                            label="To Date"
                                            placeholder="Select a date"
                                            rules={{ required: "To Date is required" }}
                                            showNeverExpireSwitch={false}
                                            error={errors.toDate?.message} // Display validation error
                                            helperText="Please choose a valid end date"
                                        />

                                        <FormControl fullWidth>
                                            <InputLabel>Session</InputLabel>
                                            <Select
                                                value={filters.session}
                                                onChange={(e) => setFilters({ ...filters, session: e.target.value })}
                                            >
                                                {menuItems.map((item) => (
                                                    <MenuItem key={item} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        
                                    </Stack>
                                    
                                </Box>

                                <Box
    sx={{
        rowGap: '20px',
        minHeight: '100px',
        width: '45%',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: WHITE_SMOKE,
    }}
>
    <Typography
        variant="appBlack"
        sx={{
            fontSize: '15px',
            fontWeight: 700,
            marginTop: '13px',
            paddingLeft: '20px',
        }}
    >
        Total Income
    </Typography>
    <Divider sx={{ marginTop: '13px' }} />
    <Stack spacing={6} sx={{ marginTop: '13px', paddingLeft: '20px' }}>
        {/* Cash and Online in one row */}
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '10px',
                alignItems: 'flex-start',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HiOutlineCash size="30px" />
                <InfoField
                    sx={{ marginLeft: '10px' }}
                    label="Cash"
                    value={`₹${cashTotal.toFixed(2)}`}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FaMobileAlt size="30px" />
                <InfoField
                    sx={{ marginLeft: '10px' }}
                    label="Online"
                    value={`₹${onlineTotal.toFixed(2)}`}
                />
            </Box>
        </Box>

        {/* Discount and Total in one row */}
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '10px',
                alignItems: 'flex-start',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <RiDiscountPercentLine size="30px" />
                <InfoField
                    sx={{ marginLeft: '10px' }}
                    label="Discount"
                    value={`₹${discountTotal.toFixed(2)}`}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TbReportSearch size="30px" />
                <InfoField
                    sx={{ marginLeft: '10px' }}
                    label="Total"
                    value={`₹${finalAmountTotal.toFixed(2)}`}
                />
            </Box>
        </Box>
    </Stack>
</Box>

                            </Box>
                        </Stack>

                        <Box>
                            <PageLoader
                                isLoading={isFetching}
                                isEmpty={(noData && !isError) || noData}
                                emptyMessage="No procedures found"
                                Components={{ Loading: 'table' }}
                            >
                                <Table
                                    columns={ProceduresReportTableColumns}
                                    data={response || []}
                                    totalRecords={response?.length}
                                    onPageChange={changePageNumber}
                                    pageNumber={pageNumber}
                                />
                            </PageLoader>
                        </Box>
                    </Stack>
                </form>
            </FormProvider>
        </>
    );
};

export default ClinicProcedures;
