import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';
import { format,parse } from 'date-fns';



const PurchaseOrderForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreatePurchasePayload>();

 

  return (
    <Stack spacing={4.5}>
      <FormInput
        name="inoviceNumber"
        label="Invoice Number"
        control={control}
        placeholder="Enter invoice number"
        error={errors.inoviceNumber?.message}
        trim
      />
      <FormInput
        type="date"
        name="purchaseDate"
        label=" "
        control={control}
        
        error={errors.purchaseDate?.message}
      />
      <FormInput
        name="vendorName"
        label="Vendor Name"
        control={control}
        placeholder="Enter vendor name"
        error={errors.vendorName?.message}
        
      />
      <FormInput
        type="number"
        name="totalAmount"
        label="Total Amount"
        control={control}
        placeholder="Enter total amount"
        error={errors.totalAmount?.message}
        trim
      />
    </Stack>
  );
};

export default PurchaseOrderForm;
