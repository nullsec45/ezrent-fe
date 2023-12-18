import * as yup from 'yup';

export const registerSchema = yup
  .object({
    username: yup.string().max(50).required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  })
  .required();
