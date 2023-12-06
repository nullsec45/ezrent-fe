import * as yup from 'yup';

export const storeSchema = yup
  .object({
    name: yup.string().required(),
    phoneNumber: yup.string().required().min(10).max(15),
    description: yup.string().required(),
    accountNumber: yup.string().required(),
    province: yup.string().required(),
    city: yup.string().required(),
    district: yup.string().required(),
    subDistrict: yup.string().required(),
    fullAddress: yup.string().required(),
    postalCode: yup.string().required(),
  })
  .required();
