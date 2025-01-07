import { ColumnDef } from '@tanstack/react-table';
import { PATIENTS } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, string, ObjectSchema } from 'yup';

export const listPatientsBreadcrumbLinks = [
  {
    label: 'Patients',
    href: PATIENTS,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Patients',
    href: PATIENTS,
  },
  {
    label: isEdit ? 'Edit Patient' : 'New Patient',
    href: '#',
  },
];

export const viewPatientBreadCrumbLinks = [
  {
    label: 'Patients',
    href: PATIENTS,
  },
  {
    label: 'Patient Details',
    href: '#',
  },
];

export const patientsTableColumns: ColumnDef<Patient, string>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Age',
    accessorKey: 'patientAge',
  },
  {
    header: 'Gender',
    accessorKey: 'patientGender',
  },
  {
    header: 'Contact Number',
    accessorKey: 'patientMobile1',
  },
];

export const patientDefaultFormValues: CreatePatientPayload = {
  firstName: '',
  middleName: '',
  lastName: '',
  patientAge: 0,
  patientGender: 'male',
  patientRegDate: '',
  patientMobile1: 0,
  patientMobile2: 0,
  patientMedicalHistory: '',
  cashierName: '',
  patientReports: '',
};

export const patientGenderProps = {
  options: [
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Female',
      value: 'Female',
    },
  ],
  'aria-labelledby': 'patient-gender',
  defaultValue: 'Male',
};

export const patientFormValidationSchema: ObjectSchema<CreatePatientPayload> =
  yupObject({
    firstName: string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters')
      .matches(/^[A-Za-z]+$/, 'First name can only contain alphabets'),

    middleName: string()
      .optional()
      .max(50, 'Middle name cannot exceed 50 characters')
      .matches(/^[A-Za-z]*$/, 'Middle name can only contain alphabets'),

    lastName: string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name cannot exceed 50 characters')
      .matches(/^[A-Za-z]+$/, 'Last name can only contain alphabets'),

    patientRegDate: string()
      .required('Registration Date is required'),
    
    patientMedicalHistory: string()
      .optional(),
    
    patientReports: string()
      .optional(),    
   
    patientAge: number()
      .typeError('Age must be a number')
      .required('Required')
      .positive('Invalid age')
      .integer(),
    
    patientGender: requiredField,

    patientMobile1: number()
      .required('Patient Mobile Number is required')
      .positive()
      .integer()
      .test('len', 'Patient Mobile Number must be exactly 10 digits', val => val?.toString().length === 10),

    patientMobile2: number()
      .optional(),
    
    cashierName: string()
      .required("Cashier name is required")
      .max(50, 'Cashier name cannot exceed 50 characters'),
  });
