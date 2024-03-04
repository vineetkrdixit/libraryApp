import {number, object, ref, string} from 'yup';

export const loginValidation = object({
  password: string()
    .min(8, ({min}) => `Password should be atleast ${min} length character`)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  email: string()
    .email('Please enter valid email')
    .required('Email is required'),
});

export const signUpValidation = object({
  password: string()
    .min(8, ({min}) => `Password should be atleast ${min} length character`)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  confirmPassword: string().oneOf(
    [ref('password'), null],
    'Passwords must match',
  ),
  email: string()
    .email('Please enter valid email')
    .required('Email is required'),
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required '),
  mobile: number()
    .required('Phone is required')
    .min(10, ({min}) => 'Invalid length of number'),
});
