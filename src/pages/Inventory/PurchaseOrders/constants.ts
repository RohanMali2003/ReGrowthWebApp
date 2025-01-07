import { ColumnDef } from '@tanstack/react-table';
import { PURCHASE_ORDERS } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, string, ObjectSchema, date } from 'yup';
import { parse, isValid, format } from 'date-fns';




export const listPurchaseOrdersBreadcrumbLinks = [
  {
    label: 'Purchase Orders',
    href: PURCHASE_ORDERS,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Purchase Orders',
    href: PURCHASE_ORDERS,
  },
  {
    label: isEdit ? 'Edit Order' : 'New Purchase',
    href: '#', 
  },
];

export const viewPurchaseOrdersBreadCrumbLinks = [
  {
    label: 'Purchase Orders',
    href: PURCHASE_ORDERS,
  },
  {
    label: 'Purchase Details',
    href: '#',
  },
];


export const purchaseordersTableColumns: ColumnDef<PurchaseOrder, string>[] = [
    {
        header: 'Invoice ID',
        accessorKey: 'invoiceId',
      },
      {
        header: 'Invoice No.',
        accessorKey: 'inoviceNumber',
      },

      {
        header: 'Purchase Date',
        accessorKey: 'purchaseDate',
        
        
      },

      {
        header: 'Vendor',
        accessorKey: 'vendorName',
      },
      {
        header: 'Total Amount',
        accessorKey: 'totalAmount',
      },
];

export const purchaseOrderDefaultFormValues: CreatePurchasePayload = {        
  inoviceNumber: '',
  purchaseDate: '',
  vendorName: '',
  totalAmount: 0,
  };


  export const purchaseFormValidationSchema: ObjectSchema<CreatePurchasePayload> =
  yupObject({
    
    inoviceNumber: string().optional(),
    purchaseDate: string().required('Required'),
    vendorName: string().optional(),    
    totalAmount: number()
      .typeError('Required')
      .required('Required')
      ,
    
  });