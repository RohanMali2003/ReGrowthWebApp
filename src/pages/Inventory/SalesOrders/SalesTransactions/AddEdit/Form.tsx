import React, { useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { useGetMedicinesList } from 'src/hooks/useMedicines';
import { FormInput } from 'src/components';
import { getAvailableMedicinesListByMedicineId } from 'src/hooks/usePurchaseTransaction'; 

const SalesTransactionForm: React.FC = (): JSX.Element => {
  const location = useLocation();
  const { state } = location; // Retrieves the state passed via navigate
  const billNumber = state; // Assuming `billNumber` is passed in state

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateSaleTransactionPayload>();

  const { response, isFetching, error } = useGetMedicinesList({
    apiConfig: { params: {} }, // Ensure params exist
  });

  const [selectedMedicineId, setSelectedMedicineId] = useState<string | null>(
    null
  );
  const [availableMedicines, setAvailableMedicines] = useState<any[]>([]);


  const medicineOptions = useMemo(
    () => response?.content?.map((med) => med.medicineName) || [],
    [response]
  );


   // Watch values of medQuantity and medMrp
   const medQuantity = useWatch({ control, name: 'medQuantity'}) || 0;
   const medMrp = useWatch({ control, name: 'medMrp' }) || 0;
 
   // Recalculate totalAmount whenever medQuantity or medMrp changes
   useEffect(() => {
     const totalAmount = medQuantity * medMrp;
     setValue('totalAmount', totalAmount); // Update totalAmount field
   }, [medQuantity, medMrp, setValue]);
 

  // Fetch available medicines when `selectedMedicineId` changes
  useEffect(() => {
    if (selectedMedicineId) {
      getAvailableMedicinesListByMedicineId(selectedMedicineId)
        .then((res) => {
          console.log('API Response:', res); // Debugging API Response
          setAvailableMedicines(res.content || []);
        })
        .catch((err) => {
          console.error('Error fetching available medicines:', err);
          setAvailableMedicines([]); // Handle API errors gracefully
        });
    }
  }, [selectedMedicineId]);
  

  useEffect(() => {
    if (billNumber) {
      setValue('billNumber', billNumber); // Set `billNumber` in the form
    }
  }, [billNumber, setValue]);

  return (
    <Stack spacing={4}>
      <Grid container spacing={3}>
        {/* Bill Number */}
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="billNumber"
            label="Bill Number"
            control={control}
            placeholder="Enter bill number"
            error={errors.billNumber?.message}
            disabled // Make this field read-only
          />
        </Grid>

        {/* Medicine Name Autocomplete */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="medName"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={medicineOptions}
                loading={isFetching}
                onChange={(_, value) => {
                  setValue('medName', value || '');
                  const selectedMedicine = response?.content?.find(
                    (med) => med.medicineName === value
                  );
                  if (selectedMedicine) {
                    const medId = selectedMedicine.medicineId;
                    setValue('medicineNumber', Number(medId), { shouldDirty: true });
                    setSelectedMedicineId(medId); // Set selected medicine ID
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Medicine Name"
                    placeholder="Select medicine name"
                    error={!!errors.medName?.message}
                    helperText={
                      errors.medName?.message ||
                      (error && 'Failed to load medicines.')
                    }
                  />
                )}
              />
            )}
          />
        </Grid>

        {/* Medicine Number */}
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="medicineNumber"
            label="Medicine Number"
            control={control}
            placeholder="Enter medicine number"
            error={errors.medicineNumber?.message}
            disabled // Read-only, set from medicine selection
          />
        </Grid>

        {/* Available Medicines */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={availableMedicines}
            getOptionLabel={(option) =>
              `${option.medicineBatch} (${option.availableQuantity || 0})`
            }
            onChange={(_, value) => {
              if (value) {
                setValue('medicineBatch', value.medicineBatch); // Set batch number
                setValue('medtransactionId', value.medtransactionId); // Set transaction ID

                // Calculate and set MRP/MedicinePack
                if (value.mrp && value.medicinePack) {
                  const calculatedMrpPerPack = (
                    value.mrp / value.medicinePack
                  ).toFixed(2);
                  setValue('medMrp',Number(calculatedMrpPerPack)); // Set MRP per pack
                }
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Batch Number"
                placeholder="Select batch number"
                error={!!errors.medicineBatch?.message}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.medtransactionId}>
                {`${option.medicineBatch} (${option.availableQuantity || 0})`}
              </li>
            )}
          />
        </Grid>




        {/* Transaction ID */}
        <Grid item xs={12} sm={6}>
          <FormInput
            name="medtransactionId"
            label="Transaction Id Number"
            control={control}
            placeholder="Transaction Id"
            error={errors.medtransactionId?.message}
            disabled
          />
        </Grid>

        {/* Quantity */}
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="medQuantity"
            label="Quantity"
            control={control}
            placeholder="Enter quantity"
            error={errors.medQuantity?.message}
          />
        </Grid>

        {/* MRP */}
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="medMrp"
            label="MRP"
            control={control}
            placeholder="Enter MRP"
            error={errors.medMrp?.message}
          />
        </Grid>

        {/* Total Amount */}
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="totalAmount"
            label="Total Amount"
            control={control}
            placeholder="Enter total amount"
            error={errors.totalAmount?.message}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SalesTransactionForm;
