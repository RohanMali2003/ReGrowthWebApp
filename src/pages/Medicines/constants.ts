import { ColumnDef } from "@tanstack/react-table";
import { MEDICINES } from "src/constants/paths";
import { object as yupObject, ObjectSchema, number, string } from "yup";

export const listMedicinesBreadcrumbLinks = [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
  {
    label: isEdit ? 'Edit Medicine' : 'New Medicine',
    href: '#',
  },
];


export const medicinesTableColumns: ColumnDef<Medicine, string>[] = [
  {
    header: 'Medicine Name',
    accessorKey: 'medicineName',
  },
  {
    header: 'Medicine Pack',
    accessorKey: 'medicinePack',
  },
  {
    header: 'Medicine Type',
    accessorKey: 'medicineType',
  },
  {
    header: 'medicine Quantity',
    accessorKey: 'quantity',
  },
];

export const medicineDefaultFormValues: CreateMedicinePayload = {
  medicineName: '',
  medicineType: '',
  medicinePack: 0,
  quantity: 0,
};

export const medicineFormValidationSchema: ObjectSchema<CreateMedicinePayload> =
  yupObject({
    medicineName: string()
    .required('Medicine name is required'),

    medicineType: string()
    .required('Medicine Type is required'),

    medicinePack: number()
    .required('Medicine Pack is required')
    .positive()
    .integer()
    .min(1, 'Medicine Pack should be greater than 0'),

    quantity: number()
    .required('Medicine Quantity is required')
    .positive()
    .integer()
    .min(1, 'Medicine Quantity should be greater than 0'),

  });

