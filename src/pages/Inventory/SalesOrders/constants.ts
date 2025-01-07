import { ColumnDef } from '@tanstack/react-table';
import { SALES_ORDERS } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, string, ObjectSchema, date } from 'yup';
import { parse, isValid, format } from 'date-fns';


export const listSalesOrdersBreadcrumbLinks = [
    {
      label: 'Bill Orders',
      href: SALES_ORDERS,
    },
  ];
  
  export const getAddEditBreadCrumbLinks = (isEdit = false) => [
    {
      label: 'Bill Orders',
      href: SALES_ORDERS,
    },
    {
      label: isEdit ? 'Edit' : 'New',
      href: '#', 
    },
  ];
  
  export const viewSalesOrdersBreadCrumbLinks = [
    {
      label: 'Bill Orders',
      href: SALES_ORDERS,
    },
    {
      label: 'Bill Details',
      href: '#',
    },
  ];


  export const salesOrdersTableColumns: ColumnDef<SaleOrder, string>[] = [
    {
        header: 'Bill ID',
        accessorKey: 'billId',
      },
      
      {
        header: 'Bill Date',
        accessorKey: 'billDate',   
      },

      {
        header: 'Patient Name',
        accessorKey: 'patientName',
      },
      {
        header: 'Total Amount',
        accessorKey: 'totalAmount',
      },

      {
        header: 'Patient Id',
        accessorKey: 'patientId',
      },

];


export const salesOrderDefaultFormValues: CreateSalePayload = {        
    
    billDate: '',
    patientName: '',
    totalAmount: 0,
    patientId: 0,
    };
  
  
    export const salesFormValidationSchema: ObjectSchema<CreateSalePayload> =
    yupObject({
      billDate: string().required('Required'),
      patientName: string().required('Required'),   
      patientId: number().required('Required'),
      totalAmount: number()
        .optional(),
      
    });


