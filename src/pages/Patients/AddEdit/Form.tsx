import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns/format';
import { patientGenderProps } from '../constants';

const PatientForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<CreatePatientPayload>();

  const patientGender = watch('patientGender');

  return (
    <Stack spacing={4.5}>
      <FormInput
        name="firstName"
        label="First Name"
        control={control}
        placeholder="Enter patient's first name"
        error={errors.firstName?.message}
        trim
      />
      <FormInput
        name="middleName"
        label="Middle Name"
        control={control}
        placeholder="Enter patient's middle name"
        error={errors.middleName?.message}
        trim
      />
      <FormInput
        name="lastName"
        label="Last Name"
        control={control}
        placeholder="Enter patient's last name"
        error={errors.lastName?.message}
        trim
      />
      <FormInput
        type="number"
        name="patientAge"
        label="Age"
        control={control}
        placeholder="Enter patient's age"
        error={errors.patientAge?.message}
        trim
      />
      <FormInput
        type="radio"
        radioButtonProps={{
          ...patientGenderProps,
          value: patientGender,
        }}
        name="patientGender"
        control={control}
        label="Gender"
        sx={{
          maxWidth: '556px',
          marginTop: '7px',
          paddingRight: '21px',
        }}
      />
      <FormInput
        type="date"
        name="patientRegDate"
        inputProps={{ min: format(new Date(), 'dd-mm-yyyy') }}
        control={control}
        label="Registration Date"
        error={errors.patientRegDate?.message}
        sx={{ marginTop: '27px' }}
      />
      <FormInput
        name="patientMobile1"
        label="Contact Number"
        control={control}
        placeholder="Enter patient's contact number"
        error={errors.patientMobile1?.message}
        trim
      />
      <FormInput
        name="patientMobile2"
        label="Alternate Contact Number"
        control={control}
        placeholder="Enter patient's alternate contact number"
        error={errors.patientMobile2?.message}
        trim
      />
      <FormInput
        name="cashierName"
        label="Cashier Name"
        control={control}
        placeholder="Enter cashier's name"
        error={errors.cashierName?.message}
        trim
      />
      <FormInput
        name="patientMedicalHistory"
        label="Medical History"
        control={control}
        placeholder="Enter patient's medical history"
        error={errors.patientMedicalHistory?.message}
        trim
        multiline
        rows={6}
      />
      <FormInput
        type="textarea"
        name="patientReports"
        label="Reports"
        control={control}
        placeholder="Enter patient's reports"
        error={errors.patientReports?.message}
        trim
        multiline
        rows={6}
      />
    </Stack>
  );
};

export default PatientForm;
