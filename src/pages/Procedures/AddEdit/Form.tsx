import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns/format';
import { procedurePaymentProps } from '../constants';

const ProcedureForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<CreateProcedurePayload>();

  const procedurePayment = watch('procedurePayment');

  return (
    <Stack spacing={4.5}>
      <FormInput
        name="patientName"
        label="Patient Name"
        control={control}
        error={errors.patientName?.message}
        trim
      />
      <FormInput
        type="date"
        name="procedureDate"
        inputProps={{ min: format(new Date(), 'dd-mm-yyyy') }}
        control={control}
        label="Registration Date"
        error={errors.procedureDate?.message}
      />
      <FormInput
        name="procedureType"
        label="Procedure Type"
        control={control}
        placeholder="Enter patient's procedure type"
        error={errors.procedureType?.message}
        trim
      />
       <FormInput
        name="procedureDetails"
        label="Procedure Details"
        control={control}
        placeholder="Enter patient's procedure details"
        error={errors.procedureDetails?.message}
        trim
        multiline
        rows={4}
      />
      <FormInput
        type="radio"
        radioButtonProps={{
          ...procedurePaymentProps,
          value: procedurePayment,
        }}
        name="procedurePayment"
        control={control}
        label="Procedure Payment"
        sx={{
          maxWidth: '556px',
          paddingRight: '21px',
        }}
      />
      <FormInput
        type="number"
        name="totalAmount"
        control={control}
        label="Total Amount"
        error={errors.totalAmount?.message}
      />
     <FormInput
        name="clinicName"
        label="Enter External Clinic Name"
        control={control}
        placeholder="Enter external clinic name"
        error={errors.clinicName?.message}
        trim
      />
      <FormInput
        type="number"
        name="discount"
        control={control}
        label="Discount"
        error={errors.discount?.message}
      />
      <FormInput
        type="number"
        name="FinalAmount"
        control={control}
        label="Final Amount"
        error={errors.finalAmount?.message}
      />
    </Stack>
  );
};

export default ProcedureForm;
