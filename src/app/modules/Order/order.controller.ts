import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IOrder } from "./order.interface";
import { OrderServices } from "./order.service";

// create new order controller
const createOrderController = catchAsync(async (req, res) => {
  const orderData = req.body;
  const result = await OrderServices.createOrderService(orderData);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order created successfully!",
    data: result,
  });
});

// get all orders controller
const getAllOrdersController = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await OrderServices.getAllOrdersService(query);

  // send response
  sendResponse<IOrder[]>(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetched successfully!",
    data: result,
  });
});

// get order by id controller
const getOrderByIdController = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await OrderServices.getOrderByIdService(orderId);

  // send response
  sendResponse<IOrder | null>(res, {
    statusCode: 200,
    success: true,
    message: "Order fetched successfully!",
    data: result,
  });
});

// update order controller
const updateOrderController = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const orderData = req.body;
  const result = await OrderServices.updateOrderService(orderId, orderData);

  // send response
  sendResponse<IOrder | null>(res, {
    statusCode: 200,
    success: true,
    message: "Order updated successfully!",
    data: result,
  });
});

// delete order controller
const deleteOrderController = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  await OrderServices.deleteOrderService(orderId);

  // send response
  sendResponse<IOrder | null>(res, {
    statusCode: 200,
    success: true,
    message: "Order deleted successfully!",
    data: null,
  });
});

export const OrderControllers = {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController,
};
