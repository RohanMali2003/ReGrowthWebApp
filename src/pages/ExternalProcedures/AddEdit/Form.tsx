import React, { useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { FormInput } from 'src/components';
import { Controller, useFormContext } from 'react-hook-form';
import { format } from 'date-fns/format';
import { getAuthInfo } from 'src/util/auth';


const ExternalProcedureForm: React.FC = (): JSX.Element => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateExternalProcedurePayload>();

  const feesCharged = watch('feesCharged') || 0;
  const discount = watch('discount') || 0;


  const { username } = getAuthInfo(); // Extract username from auth info


  // Set cashierName using useEffect
  useEffect(() => {
    if (username && typeof username === 'string') {
      setValue('cashierName', username.trim()); // Ensure no quotes or spaces
    }
  }, [username, setValue]);

  useEffect(() => {
    const finalAmount = feesCharged - (discount);
    setValue('finalAmount', finalAmount);
  }, [feesCharged, discount, setValue]);

  return (
    <Stack spacing={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormInput
            name="doctorName"
            label="External Doctor Name"
            control={control}
            error={errors.doctorName?.message}
            trim
          />
        </Grid>
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
            trim
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            name="procedureDetail"
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
            type="number"
            name="feesCharged"
            control={control}
            label="Fees Charged (₹)"
            error={errors.feesCharged?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="discount"
            control={control}
            label="Discount "
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
        <Grid item xs={12} sm={6} >
          <Controller
            name="cashierName"
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
              <FormInput
                {...field}
                control={control}
                label="Cashier Name"
                placeholder="Enter cashier's name"
                error={errors.cashierName?.message}
              />
            )}
          />

        </Grid>

      </Grid>
    </Stack>
  );
};

export default ExternalProcedureForm;
