import { ColumnDef } from "@tanstack/react-table";
import { MEDICINES } from "src/constants/paths";

export const listMedicinesBreadcrumbLinks = [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
];


export const medicinesTableColumns: ColumnDef<User, string>[] = [
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
    header: 'medicine Price',
    accessorKey: 'medicinePrice',
  },
];
