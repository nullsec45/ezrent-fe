import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup
    .number()
    .positive('price cannot be less or equal to 0')
    .integer()
    .required(),
  stock: yup
    .number()
    .positive('stock cannot be less or equal to 0')
    .integer()
    .required(),
  maximumRental: yup
    .number()
    .positive('maximum rental cannot be less or equal to 0')
    .integer()
    .required(),
  categoryId: yup.string().required(),
});
