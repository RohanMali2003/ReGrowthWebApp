import { ExtendedColumnDef } from 'src/components/Table';
import { USERS } from 'src/constants/paths';
import { object as yupObject, number, ObjectSchema, string } from 'yup';

export const listUsersBreadcrumbLinks = [
  {
    label: 'Users',
    href: USERS,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Users',
    href: USERS,
  },
  {
    label: isEdit ? 'Edit User' : 'New User',
    href: '#',
  },
];

export const userRoleProps = [
  { 
    menuItemLabel: 'ADMIN', 
    menuItemValue: 'ADMIN', 
    menuItemId: 'ADMIN' 
  },
  { 
    menuItemLabel: 'RECEP', 
    menuItemValue: 'RECEP', 
    menuItemId: 'RECEP' 
  },
  { 
    menuItemLabel: 'MEDICO', 
    menuItemValue: 'MEDICO', 
    menuItemId: 'MEDICO' 
  },
];

export const usersTableColumns: ExtendedColumnDef<User, string>[] = [
  {
    header: 'User Name',
    accessorKey: 'username',
  },
  {
    header: 'Password',
    accessorKey: 'password',
    mask: true,
  },
  {
    header: 'Role',
    accessorKey: 'role',
  },
  {
    header: 'Mobile Number',
    accessorKey: 'mobileNumber',
  },
];

export const userDefaultFormValues: CreateUserPayload = {
  username: '',
  password: '',
  role: '',
  mobileNumber: 0,
};

export const userFormValidationSchema: ObjectSchema<CreateUserPayload> =
  yupObject({
    username: string()
    .required('User name is required')
    .max(50, 'User name cannot exceed 50 characters')
    .matches(/^[A-Za-z\s]*$/, 'User name can only contain alphabets and spaces'),
    
    password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password cannot exceed 50 characters'),    
    
    role: string()
    .required('Role is required'),
    
    mobileNumber: number()
    .optional()
    .required('Mobile number is required')
    .positive('Mobile number must be positive')
    .integer('Mobile number must be an integer')
    .test('len', 'Patient Mobile Number must be exactly 10 digits', val => val?.toString().length === 10),
  });
