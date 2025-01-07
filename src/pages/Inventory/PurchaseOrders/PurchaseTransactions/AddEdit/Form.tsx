import React, { useEffect, useMemo } from 'react';
import Grid from '@mui/material/Grid';import { useLocation } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { useFormContext, Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { useGetMedicinesList } from 'src/hooks/useMedicines';
import { FormInput } from 'src/components';


const PurchaseTransactionForm: React.FC = (): JSX.Element => {
  const location = useLocation();
  const { state } = location; // This retrieves the state passed via navigate
  console.log('State from FORM location:', state);
  const invoiceId = state;

  const {
    control,
    setValue,
    watch, 
    formState: { errors },
  } = useFormContext<CreatePuchaseTransactionPayload>();

  const { response, isFetching, error } = useGetMedicinesList({
    apiConfig: { params: {} }, // Ensure params exist
  });

  const medicineOptions = useMemo(
    () => response?.content?.map((med) => med.medicineName) || [],
    [response]
  );

  // Watch fields to trigger auto-calculation
  const medicinePack = watch('medicinePack') || 0;
  const quantity = watch('quantity') || 0;
  const rate = watch('rate') || 0;

  useEffect(() => {
    // Automatically calculate availableQuantity
    const calculatedAvailableQuantity = medicinePack * quantity;
    setValue('availableQuantity', calculatedAvailableQuantity);
  }, [medicinePack, quantity, setValue]);

  useEffect(() => {
    // Automatically calculate availableQuantity
    const calculatedAmount = rate * quantity;
    setValue('amount', calculatedAmount);
  }, [rate, quantity, setValue]);

  useEffect(() => {
    if (invoiceId) {
      setValue('invoiceId', invoiceId); // Set the invoiceId in the form
    }
  }, [invoiceId, setValue]);

  return (
    <Stack spacing={4}>
      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="medicineName"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={medicineOptions}
                loading={isFetching}
                onChange={(_, value) => {
                  setValue('medicineName', value || '');

                  const selectedMedicine = response?.content?.find(
                    (med) => med.medicineName === value
                  );
                  if (selectedMedicine) {
                    setValue('medicineId', Number(selectedMedicine.medicineId));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Medicine Name"
                    placeholder="Select medicine name"
                    error={!!errors.medicineName?.message}
                    helperText={
                      errors.medicineName?.message ||
                      (error && 'Failed to load medicines.')
                    }
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            name="medicineBatch"
            label="Batch Number"
            control={control}
            placeholder="Enter batch number"
            error={errors.medicineBatch?.message}
            trim
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="date"
            name="expiry"
            label="Expiry Date"
            control={control}
            error={errors.expiry?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="medicinePack"
            label="Medicine Pack"
            control={control}
            placeholder="Enter number of packs"
            error={errors.medicinePack?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="quantity"
            label="Quantity"
            control={control}
            placeholder="Enter quantity"
            error={errors.quantity?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="availableQuantity"
            label="Available Quantity"
            control={control}
            placeholder="available quantity"
            error={errors.availableQuantity?.message}
            disabled // Make this field read-only
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="mrp"
            label="MRP"
            control={control}
            placeholder="Enter MRP"
            error={errors.mrp?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="rate"
            label="Rate"
            control={control}
            placeholder="Enter rate per unit"
            error={errors.rate?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="amount"
            label="Amount"
            control={control}
            placeholder="Enter total amount"
            error={errors.amount?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ visibility: 'hidden' }}>
          <FormInput
            type="number"
            name="invoiceId"
            label="Invoice ID"
            control={control}
            placeholder="Enter invoice ID"
            error={errors.invoiceId?.message}
            disabled 
          />
        </Grid>
        <Grid item xs={12} sm={6}  sx={{ visibility: 'hidden' }}>
          <FormInput
            type="number"
            name="medicineId"
            label="Medicine ID"
            control={control}
            placeholder="Enter medicine ID"
            error={errors.medicineId?.message}
            disabled 
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PurchaseTransactionForm;
