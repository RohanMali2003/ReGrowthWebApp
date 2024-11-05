import { ColumnDef } from '@tanstack/react-table';
import { PATIENTS } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, string, ObjectSchema, date } from 'yup';

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
  patientRegDate: new Date(),
  patientMobile1: '',
  patientMobile2: '',
  patientMedicalHistory: '',
  cashierName: '',
  patientReports: '',
};

export const patientGenderProps = {
  options: [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
  ],
  'aria-labelledby': 'patient-gender',
  defaultValue: 'Male',
};

export const patientFormValidationSchema: ObjectSchema<CreatePatientPayload> =
  yupObject({
    firstName: requiredField,
    lastName: requiredField,
    patientRegDate: date().required('Required'),
    patientMedicalHistory: string().optional(),
    patientReports: string().optional(),
    patientMobile2: string().optional(),
    middleName: string().optional(),
    patientAge: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid age')
      .integer(),
    patientGender: requiredField,
    patientMobile1: string().required('Required'),
    cashierName: requiredField,
  });
