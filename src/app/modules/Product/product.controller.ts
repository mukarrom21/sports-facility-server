import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.service";
import sendResponse from "../../utils/sendResponse";
import { IProduct } from "./product.interface";

// create new product controller
const createProductController = catchAsync(async (req, res) => {
  const productData = req.body;
  const result = await ProductServices.createProductService(productData);

  // send response
  sendResponse<IProduct>(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully!",
    data: result,
  });
});

// get all products controller
const getAllProductsController = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ProductServices.getAllProductsService(query);

  // send response
  sendResponse<IProduct[]>(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully!",
    data: result,
  });
});

// get product by id controller
const getProductByIdController = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getProductByIdService(productId);

  // send response
  sendResponse<IProduct | null>(res, {
    statusCode: 200,
    success: true,
    message: "Product fetched successfully!",
    data: result,
  });
});

// update product controller
const updateProductController = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const productData = req.body;
  const result = await ProductServices.updateProductService(productId, productData);

  // send response
  sendResponse<IProduct | null>(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
});

// delete product controller
const deleteProductController = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await ProductServices.deleteProductService(productId);

  // send response
  sendResponse<IProduct | null>(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully!",
    data: null,
  });
});

export const ProductControllers = {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};
