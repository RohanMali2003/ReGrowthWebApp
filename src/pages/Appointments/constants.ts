import { ColumnDef } from "@tanstack/react-table";
import { APPOINTMENTS } from "src/constants/paths";
import { object as yupObject, ObjectSchema, number, string } from "yup";

export const listAppointmentsBreadcrumbLinks = [
  {
    label: 'Appointments',
    href: APPOINTMENTS,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Appointments',
    href: APPOINTMENTS,
  },
  {
    label: isEdit ? 'Edit Appointment' : 'New Appointment',
    href: '#',
  },
];

export const viewAppointmentBreadCrumbLinks = [
  {
    label: 'Appointment',
    href: APPOINTMENTS,
  },
  {
    label: 'Appointment Details',
    href: '#',
  },
];

export const viewAppointmentByDateBreadCrumbLinks = [
  {
    label: 'Appointment',
    href: APPOINTMENTS,
  },
  {
    label: 'Appointment List',
    href: '#',
  },
];

export const appointmentsTableColumns: ColumnDef<Appointments, string>[] = [
  {
    header: 'Appointment Id',
    accessorKey: 'appointmentId',
  },
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Appointment Date',
    accessorKey: 'appointmentDate',
  },
  {
    header: 'Appointment Time',
    accessorKey: 'startTime',
  }
];

export const appointmentDefaultFormValues: CreateAppointmentPayload = {
  firstName: '',
  middleName: '',
  lastName: '',
  treatment: '',
  
  appointmentDate: '',
  startTime: '',
  patientmobile1: 0,
  cashiername: '',
};

export const appointmentDefaultFormValidateSchema: ObjectSchema<CreateAppointmentPayload> =
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
    
    treatment: string()
      .required('Treatment is required')
      .min(2, 'Treatment must be at least 2 characters')
      .max(100, 'Treatment cannot exceed 100 characters'),

    appointmentDate: string()
      .optional(),

    startTime: string()
      .optional(),
    patientmobile1: number()
      .required('Patient Mobile Number is required')
      .positive()
      .integer()
      .test('len', 'Patient Mobile Number must be exactly 10 digits', val => val?.toString().length === 10),

    cashiername: string()
      .optional()
      .max(50, 'Cashier name cannot exceed 50 characters')
      .matches(/^[A-Za-z\s]*$/, 'Cashier name can only contain alphabets and spaces'),
  });