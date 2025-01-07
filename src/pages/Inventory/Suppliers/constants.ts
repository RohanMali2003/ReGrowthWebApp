import { ColumnDef } from "@tanstack/react-table";
import { SUPPLIERS } from "src/constants/paths";
import { object as yupObject, ObjectSchema, string, number } from 'yup';

export const listSuppliersBreadcrumbLinks = [
  {
    label: 'Suppliers',
    href: SUPPLIERS,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Suppliers',
    href: SUPPLIERS,
  },
  {
    label: isEdit ? 'Edit Supplier' : 'New Supplier',
    href: '#',
  },
];

export const suppliersTableColumns: ColumnDef<Supplier, string>[] = [
  {
    header: 'Supplier Id',
    accessorKey: 'supplierId',
  },
  {
    header: 'Supplier Name',
    accessorKey: 'supplierName',
  },
  {
    header: 'Supplier Address',
    accessorKey: 'supplierAddress',
  },
  {
    header: 'Supplier Phone',
    accessorKey: 'supplierMobile',
  },
];

export const supplierDefaultFormValues: CreateSupplierPayload = {
  supplierName: '',
  supplierAddress: '',
  supplierMobile: 0,
};

export const supplierFormValidationSchema: ObjectSchema<CreateSupplierPayload> = yupObject({
  supplierName: string()
  .required("Supplier Name is required")
  .max(50, 'Supplier Name cannot exceed 50 characters')
  .matches(/^[A-Za-z\s]*$/, 'Supplier Name can only contain alphabets and spaces'),

  supplierAddress: string()
  .required("Supplier Address is required")
  .max(100, 'Supplier Address cannot exceed 100 characters')
  .matches(/^[A-Za-z\s]*$/, 'Supplier Address can only contain alphabets and spaces'),

  supplierMobile: number()
      .required('Supplier Mobile Number is required')
      .positive()
      .integer()
      .test('len', 'Supplier Mobile Number must be exactly 10 digits', val => val?.toString().length === 10),
});