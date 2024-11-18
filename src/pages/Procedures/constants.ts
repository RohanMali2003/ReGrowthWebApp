import { ColumnDef } from '@tanstack/react-table';
import { PROCEDURES } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, string, ObjectSchema, date } from 'yup';

export const listProceduresBreadcrumbLinks = [
  {
    label: 'Procedures',
    href: PROCEDURES,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Procedures',
    href: PROCEDURES,
  },
  {
    label: isEdit ? 'Edit Procedure' : 'New Procedure',
    href: '#',
  },
];


export const viewProceduresBreadCrumbLinks = [
  {
    label: 'Procedures',
    href: PROCEDURES,
  },
  {
    label: 'Procedure Details',
    href: '#',
  },
];

export const ProceduresTableColumns: ColumnDef<Procedure, string>[] = [
  {
    header: 'Patient Name',
    accessorKey: 'patientName',
  },
  {
    header: 'Procedure Name',
    accessorKey: 'procedureType',
  },
  {
    header: 'Clinic Name',
    accessorKey: 'clinicName',
  },
  {
    header: 'Final Amount',
    accessorKey: 'finalAmount',
  },
];

export const procedurePaymentProps = {
  options: [
    {
      label: 'Online',
      value: 'online',
    },
    {
      label: 'Cash',
      value: 'cash',
    },
  ],
  'aria-labelledby': 'procedure-payment',
  defaultValue: 'Cash',
};

export const procedureDefaultFormValues: CreateProcedurePayload = {
  patientName: '',
  procedureDate: new Date(),
  procedureType: '',
  procedureDetails: '',
  PaymentType: 'cash',
  procedureCashierName: '',
  clinicName: '',
  finalAmount: 0,
  discount: 0,
 // procedureTime: 
  totalAmount: 0,
  
};

export const procedureFormValidationSchema: ObjectSchema<CreateProcedurePayload> =
  yupObject({
    patientName: requiredField,
    procedureDate: date().required('Required'),
    procedureType: requiredField,
    procedureDetails: string().optional(),
    procedureCashierName: string().optional(),
    clinicName: string().optional(),
    PaymentType: requiredField,
    finalAmount: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid amount')
      .integer(),
    discount: number()
      .optional()
      .positive('Invalid amount')
      .integer(),
    totalAmount: number()
      .typeError('Required')
      .required('Required')
      .positive('Invalid amount')
      .integer(),
  });