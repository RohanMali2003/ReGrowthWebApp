import React, { useEffect } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { FormInput } from 'src/components';
import { format } from 'date-fns';
import { patientGenderProps } from '../constants';
import { getAuthInfo } from 'src/util/auth';
import { Controller, useFormContext } from 'react-hook-form';

const PatientForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
    watch,
    setValue, // Used to programmatically set form field values
  } = useFormContext<CreatePatientPayload>();
  
  const { username } = getAuthInfo(); // Extract username from auth info
  const patientGender = watch('patientGender');

  // Set cashierName using useEffect
  useEffect(() => {
    if (username && typeof username === 'string') {
      setValue('cashierName', username.trim()); // Ensure no quotes or spaces
    }
  }, [username, setValue]);
  return (
    <Stack spacing={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormInput
            name="firstName"
            label="First Name"
            control={control}
            placeholder="Enter patient's first name"
            error={errors.firstName?.message}
            trim
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            name="middleName"
            label="Middle Name"
            control={control}
            placeholder="Enter patient's middle name"
            error={errors.middleName?.message}
            trim
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            name="lastName"
            label="Last Name"
            control={control}
            placeholder="Enter patient's last name"
            error={errors.lastName?.message}
            trim
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="patientAge"
            label="Age"
            control={control}
            placeholder="Enter patient's age"
            error={errors.patientAge?.message}
            trim
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="date"
            name="patientRegDate"
            inputProps={{ min: format(new Date(), 'yyyy-MM-dd') }}
            control={control}
            label="Registration Date"
            error={errors.patientRegDate?.message}
            sx={{ marginTop: '27px' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            name="patientMobile1"
            label="Contact Number"
            control={control}
            placeholder="Enter patient's contact number"
            error={errors.patientMobile1?.message}
            trim
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            name="patientMobile2"
            label="Alternate Contact Number"
            control={control}
            placeholder="Enter patient's alternate contact number"
            error={errors.patientMobile2?.message}
            trim
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="textarea"
            name="patientReports"
            label="Reports"
            control={control}
            placeholder="Enter patient's reports"
            error={errors.patientReports?.message}
            
          />
        </Grid>

        {/* Cashier Name Field */}
        <Grid item xs={12} sm={6} sx={{ visibility: 'hidden' }}>
          <Controller
            name="cashierName"
            defaultValue="" // Leave default value empty as it will be set in useEffect
            render={({ field }) => (
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

export default PatientForm;
