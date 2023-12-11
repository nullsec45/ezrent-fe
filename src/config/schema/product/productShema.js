import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  stock: yup.string().required(),
  maximumRental: yup.string().required(),
  categoryId: yup.string().required(),
});

export const editProductSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  stock: yup.string().required(),
  availableStock: yup.string().required(),
  maximumRental: yup.string().required(),
  categoryId: yup.string().required(),
});
