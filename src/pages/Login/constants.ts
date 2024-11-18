import * as yup from 'yup';

export const loginDefaultFormValues: CreateLoginPayload = {
  username : '',
  password : '',
};

export const loginFormValidationSchema = yup.object().shape({
  username: yup.string().required('User Name is required'),
  password: yup.string().required('Password is required'),
});