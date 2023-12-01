import * as yup from 'yup';

export const updateProfileSchema = yup
  .object({
    fullname: yup.string(),
    gender: yup.string(),
    dateOfbirth: yup.string(),
    phoneNumber: yup.string(),
  })
  .required();
