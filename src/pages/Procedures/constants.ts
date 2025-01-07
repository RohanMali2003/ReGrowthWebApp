import { ColumnDef } from '@tanstack/react-table';
import { PROCEDURES } from 'src/constants/paths';
import { object as yupObject, number, string, ObjectSchema } from 'yup';

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


export const viewProcedureReportBreadCrumbLinks = [
  {
    label: 'Reports',
    href: PROCEDURES,
  },
  {
    label: 'Clinic Procedures',
    href: '#',
  },
];

export const ProceduresTableColumns: ColumnDef<Procedure, string>[] = [
  {
    header: 'Procedure Id',
    accessorKey: 'procedureId',
  },
  {
    header: 'Procedure Date',
    accessorKey: 'procedureDate',
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



export const ProceduresReportTableColumns: ColumnDef<Procedure, string>[] = [
  {
    header: 'Procedure Id',
    accessorKey: 'procedureId',

  },

  {
    header: 'Patient Id',
    accessorKey: 'patientId',
  },
  {
    header: 'Date',
    accessorKey: 'procedureDate',
  },
  {
    header: 'Procedure Name',
    accessorKey: 'procedureType',
  },
  {
    header: 'Online Payment',
    accessorKey: 'onlinePayment',
  },
  {
    header: 'Cash Payment',
    accessorKey: 'cashPayment',
  },
  {
    header: 'Discount',
    accessorKey: 'discount',
  },
 
  {
    header: 'Total',
    accessorKey: 'finalAmount',
  },
  {
    header: 'Cashier Name',
    accessorKey: 'cashierName',
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
  cashPayment: 0,
  clinicName: '',
  discount: 0,
  finalAmount: 0,
  procedureDate: '',
  onlinePayment: 0,
  procedureDetail: '',
  procedureType: '',
  totalAmount: 0,
  cashierName: ''
};

export const procedureFormValidationSchema: ObjectSchema<CreateProcedurePayload> =
  yupObject({
   
    

    procedureDate: string()
    .required('Procedure Date is Required'),
    
    procedureType: string()
    .required('Procedure Type is required')
    .min(2, 'Procedure Type must be at least 2 characters')
    .max(100, 'Procedure Type cannot exceed 100 characters'),

    procedureDetails: string()
    .optional()
    .min(2, 'Procedure Details must be at least 2 characters')
    .max(300, 'Procedure Details cannot exceed 100 characters'),

    cashierName: string()
    .required("Cashier name is required")
    .max(50, 'Cashier name cannot exceed 50 characters'),

    clinicName: string()
    .optional()
    .max(50, 'Clinic Name cannot exceed 50 characters')
    .matches(/^[A-Za-z\s]*$/, 'Clinic Name can only contain alphabets and spaces'),
    
    cashPayment: number().optional().min(0, 'Amount must be greater than or equal to zero').integer(),
    onlinePayment: number().optional().min(0, 'Amount must be greater than or equal to zero').integer(),

    finalAmount: number()
      .typeError('Required')
      .required('Required')
      .integer(),
    discount: number().optional().min(0, 'Amount must be greater than or equal to zero'),
    totalAmount: number().typeError('Required').required('Required')
    .min(0, 'Amount must be greater than or equal to zero').integer(),
  });