import { ColumnDef } from '@tanstack/react-table';
import { EXTERNAL_PROCEDURE } from 'src/constants/paths';
import { object as yupObject, number, string, ObjectSchema } from 'yup';

export const listExternalProceduresBreadcrumbLinks = [
  {
    label: 'External Procedures',
    href: EXTERNAL_PROCEDURE,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'External Procedures',
    href: EXTERNAL_PROCEDURE,
  },
  {
    label: isEdit ? 'Edit Procedure' : 'New Procedure',
    href: '#',
  },
];


export const viewProceduresBreadCrumbLinks = [
  {
    label: 'External Procedures',
    href: EXTERNAL_PROCEDURE,
  },
  {
    label: 'External Procedure Details',
    href: '#',
  },
];

export const viewProcedureReportBreadCrumbLinks = [
  {
    label: 'Reports',
    href: EXTERNAL_PROCEDURE,
  },
  {
    label: 'External Procedures',
    href: '#',
  },
];

export const ExternalProceduresTableColumns: ColumnDef<ExternalProcedure, string>[] = [
  {
    header: 'Doctor Name',
    accessorKey: 'doctorName',
  },
  {
    header: 'Procedure Type',
    accessorKey: 'procedureType',
  },
  {
    header: 'Cashier Name',
    accessorKey: 'cashierName',
  },
  {
    header: 'Procedure Date',
    accessorKey: 'procedureDate',
  },
];


export const ExternalProceduresReportTableColumns: ColumnDef<ExternalProcedure, string>[] = [
  {
    header: 'ID',
    accessorKey: 'doctorId',
  },
  
  {
    header: 'Procedure Date',
    accessorKey: 'procedureDate',
  },
  {
    header: 'Doctor Name',
    accessorKey: 'doctorName',
  },
  {
    header: 'Procedure Type',
    accessorKey: 'procedureType',
  },
  
  {
    header: 'Fees',
    accessorKey: 'feesCharged',
  },

  {
    header: 'Discount',
    accessorKey: 'discount',
  },

  {
    header: 'Final Amount',
    accessorKey: 'finalAmount',
  },

  {
    header: 'Cashier',
    accessorKey: 'cashierName',
  },

  
];

export const externalProcedureDefaultFormValues: CreateExternalProcedurePayload = {
  doctorName: '',
  feesCharged: 0,
  discount: 0,
  finalAmount: 0,
  procedureDate: '',
  procedureDetail: '',
  procedureType: '',
  cashierName: ''
};

export const externalProcedureFormValidationSchema: ObjectSchema<CreateExternalProcedurePayload> =
  yupObject({
    procedureDate: string()
    .default('')
    .optional(),
    
    procedureType: string()
    .required('Procedure Type is required')
    .min(2, 'Procedure Type must be at least 2 characters')
    .max(100, 'Procedure Type cannot exceed 100 characters'),

    procedureDetail: string()
    .required('Procedure Details is required')
    .min(2, 'Procedure Details must be at least 2 characters')
    .max(100, 'Procedure Details cannot exceed 100 characters'),

    cashierName: string()
    .optional()
    .required("Cashier name is required")
    .max(50, 'Cashier name cannot exceed 50 characters')
    ,

    finalAmount: number()
      .typeError('Required')
      .required('Required')
      .integer(),

    discount: number()
      .optional()
      .min(0, 'Invalid amount')
      .integer(),
      
    feesCharged: number()
      .typeError('Required')
      .required('Required')
      .integer(),
    
    doctorName: string()
    .required("Doctor name is required")
    .max(50, 'Doctor name cannot exceed 50 characters')
    .matches(/^[A-Za-z\s]*$/, 'Doctor name can only contain alphabets and spaces'),
  });

