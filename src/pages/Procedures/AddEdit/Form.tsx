import React, { useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns/format';
import { getAuthInfo } from 'src/util/auth';


const ProcedureForm: React.FC = (): JSX.Element => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateProcedurePayload>();
  const { username } = getAuthInfo();

  useEffect(() => {
    if (username && typeof username === 'string') {
      setValue('cashierName', username.trim());
    }
  }, [username, setValue]);


  const totalAmount = watch('totalAmount');
  const discount = watch('discount');

  const cashPayment = parseFloat(watch('cashPayment')) || 0; // Convert to number or default to 0
const onlinePayment = parseFloat(watch('onlinePayment')) || 0; // Convert to number or default to 0

useEffect(() => {
  const totalAmount = cashPayment + onlinePayment;
  setValue('totalAmount', isNaN(totalAmount) ? 0 : totalAmount); // Set totalAmount, default to 0 if NaN
}, [cashPayment, onlinePayment, setValue]); // Update when cashPayment or onlinePayment changes



  useEffect(() => {
    const finalAmount = totalAmount - (discount);
    setValue('finalAmount', isNaN(finalAmount) ? 0 : finalAmount);
  }, [totalAmount, discount, setValue]);

  return (
    <Stack spacing={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="date"
            name="procedureDate"
            inputProps={{ min: format(new Date(), 'yyyy-MM-dd') }}
            control={control}
            label="Registration Date"
            error={errors.procedureDate?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            name="procedureType"
            label="Procedure Type"
            control={control}
            placeholder="Enter patient's procedure type"
            error={errors.procedureType?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            name="procedureDetails"
            label="Procedure Details"
            control={control}
            placeholder="Enter patient's procedure details"
            error={errors.procedureDetail?.message}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            name="clinicName"
            label="Enter External Clinic Name"
            control={control}
            placeholder="Enter external clinic name"
            error={errors.clinicName?.message}
            
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormInput
            name="onlinePayment"
            label="Enter Online Payment"
            control={control}
            placeholder="Enter online payment"
            error={errors.onlinePayment?.message}
            
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormInput
            name="cashPayment"
            label="Enter Cash Payment"
            control={control}
            placeholder="Enter external clinic name"
            error={errors.cashPayment?.message}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="totalAmount"
            control={control}
            label="Total Amount (₹)"
            error={errors.totalAmount?.message}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="discount"
            control={control}
            label="Discount"
            error={errors.discount?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="finalAmount"
            control={control}
            label="Final Amount (₹)"
            error={errors.finalAmount?.message}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}  sx={{ visibility: 'hidden' }}>
          <FormInput
            name="cashierName"
            label="Cashier Name"
            control={control}
            placeholder="Enter cashier's name"
            error={errors.cashierName?.message}
            
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ProcedureForm;
