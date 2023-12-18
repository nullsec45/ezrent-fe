import * as yup from 'yup';

export const addressSchema = yup
  .object({
    label: yup.string().required(),
    recipientName: yup.string().required(),
    phoneNumber: yup
      .string()
      .required()
      .min(10, 'Nomor Handphone must be at least 10 characters')
      .max(15, 'Nomor Handphone must be at most 15 characters'),
    province: yup.string().required(),
    city: yup.string().required(),
    district: yup.string().required(),
    subDistrict: yup.string().required(),
    fullAddress: yup.string().required(),
    postalCode: yup.string().required(),
  })
  .required();
