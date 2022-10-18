import { object, number, string } from 'yup';

const payload = {
  body: object({
    title: string().required('Title is required'),
    description: string()
      .required('Description is required')
      .min(120, 'Description should be at least 120 characters long'),
    price: number().required('Price is required'),
    image: string().required('Image is required')
  })
};

const params = {
  params: object({
    productId: string().required('productId is required')
  })
};

export const createProductSchema = object({
  ...payload
});

export const updateProductSchema = object({
  ...params,
  body: object({
    title: string(),
    description: string().min(
      120,
      'Description should be at least 120 characters long'
    ),
    price: number(),
    image: string()
  })
});

export const deleteProductSchema = object({
  ...params
});

export const getProductSchema = object({
  ...params
});
