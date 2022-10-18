import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery
} from 'mongoose';
import Product, { ProductDocument } from '../model/product.model';

export async function createProduct(
  input: DocumentDefinition<Omit<ProductDocument, 'createdAt' | 'updatedAt'>>
) {
  return await Product.create(input);
}

export async function findProduct(query: FilterQuery<ProductDocument>) {
  return await Product.findById(query);
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return await Product.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return await Product.findByIdAndDelete(query);
}
