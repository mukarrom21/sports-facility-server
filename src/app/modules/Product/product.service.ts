import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";

// create new product service
const createProductService = async (product: IProduct) => {
  // create a new product
  const newProduct = await ProductModel.create(product);
  return newProduct;
};

// get all products service
const getAllProductsService = async (query: Record<string, unknown>) => {
  const searchableFields = ["name", "description", "category", "tags"]; // Searchable fields

  let searchQuery = {};
  if (query.searchTerm) {
    searchQuery = { $or: searchableFields.map((field) => ({ [field]: { $regex: query.searchTerm, $options: "i" } })) };
  }

  const result = await ProductModel.find(searchQuery);

  return result;
};

// get product by id service
const getProductByIdService = async (id: string) => {
  const product = await ProductModel.findById(id);
  return product;
};

// update product service
const updateProductService = async (id: string, product: IProduct) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, {
    new: true,
  });
  return updatedProduct;
};

// delete product service
const deleteProductService = async (id: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  return deletedProduct;
};

export const ProductServices = {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};
