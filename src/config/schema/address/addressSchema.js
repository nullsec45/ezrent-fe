import * as yup from 'yup';

export const addressSchema = yup
  .object({
    province: yup.string().required(),
    city: yup.string().required(),
    district: yup.string().required(),
    fullAddress: yup.string().required(),
    postalCode: yup.string().required(),
  })
  .required();
