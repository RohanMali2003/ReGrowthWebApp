import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { Grid } from '@mui/material';

const AppointmentForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateAppointmentPayload>();

  return (
    <Stack spacing={4.5}>
      {/* First Row: First Name, Middle Name, Last Name */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormInput
            name="firstName"
            label="First Name"
            control={control}
            placeholder="Enter patient's first name"
            error={errors.firstName?.message}
            trim
            
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            name="middleName"
            label="Middle Name"
            control={control}
            placeholder="Enter patient's middle name"
            error={errors.middleName?.message}
            trim
           
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            name="lastName"
            label="Last Name"
            control={control}
            placeholder="Enter patient's last name"
            error={errors.lastName?.message}
            trim
            
          />
        </Grid>
      </Grid>

      {/* Second Row: Patient Treatment */}
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormInput
          name="treatment"
          label="Patient Treatment"
          control={control}
          placeholder="Enter patient's treatment"
          error={errors.treatment?.message}
          multiline
          rows={3}
          
        />
      </Grid>
      </Grid>

      {/* Third Row: Appointment Date and Start Time */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormInput
            type="date"
            name="appointmentDate"
            inputProps={{ min: format(new Date(), 'yyyy-MM-dd') }}
            control={control}
            label="Appointment Date"
            error={errors.appointmentDate?.message}
           
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            type="time"
            name="startTime"
            control={control}
            label="Start Time"
            error={errors.startTime?.message}
            
          />
        </Grid>
      </Grid>

      {/* Fourth Row: Patient Contact Number and Cashier Name */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormInput
            name="patientmobile1"
            label="Patient's Contact Number"
            control={control}
            placeholder="Enter patient's contact number"
            error={errors.patientmobile1?.message}
            trim
           
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            name="cashiername"
            label="Cashier Name"
            control={control}
            placeholder="Enter cashier's name"
            error={errors.cashiername?.message}
            
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AppointmentForm;
