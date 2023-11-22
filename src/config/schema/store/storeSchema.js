import * as yup from 'yup';

export const storeSchema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    city: yup.string().required(),
    province: yup.string().required(),
    district: yup.string().required(),
    accountNumber: yup.string().required(),
    fullAddress: yup.string().required(),
    postalCode: yup.string().required(),
    latitude: yup.string().required(),
    longitude: yup.string().required(),
  })
  .required();
