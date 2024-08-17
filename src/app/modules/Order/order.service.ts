import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ProductModel } from "../Product/product.model";
import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";

// create new order service
const createOrderService = async (order: IOrder) => {
  // start mongoose transaction and rollback
  const session = await OrderModel.startSession();

  try {
    // start mongoose transaction
    session.startTransaction();

    // update product quantity
    let updatedProduct = await ProductModel.findByIdAndUpdate(
      order.productId,
      { $inc: { "inventory.quantity": -order.quantity } },
      { session, new: true },
    );
    // if product quantity not updated successfully throw error
    if (!updatedProduct) {
      throw new Error("Product quantity not updated successfully");
    }

    // if product quantity is 0, set inStock to false
    if (updatedProduct?.inventory?.quantity === 0) {
      updatedProduct = await ProductModel.findByIdAndUpdate(
        updatedProduct._id,
        { "inventory.inStock": false },
        { session, new: true },
      );
    }

    // if product quantity is 0 and inStock is not false, throw error
    if (updatedProduct?.inventory?.quantity === 0 && updatedProduct?.inventory?.inStock === true) {
      throw new AppError(httpStatus.BAD_REQUEST, "in stock not updated successfully");
    }

    // create a new order
    const newOrder = await OrderModel.create([order], { session });

    // commit mongoose transaction
    await session.commitTransaction();
    session.endSession();

    return newOrder;
  } catch (err) {
    // rollback mongoose transaction
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

// get all orders service
const getAllOrdersService = async (query: Record<string, unknown>) => {
  const orders = await OrderModel.find(query); // api/orders?email=test@example.com
  return orders;
};

// get order by id service
const getOrderByIdService = async (id: string) => {
  const order = await OrderModel.findById(id);
  return order;
};

// update order service
const updateOrderService = async (id: string, order: IOrder) => {
  const updatedOrder = await OrderModel.findByIdAndUpdate(id, order, {
    new: true,
  });
  return updatedOrder;
};

// delete order service
const deleteOrderService = async (id: string) => {
  const deletedOrder = await OrderModel.findByIdAndDelete(id);
  return deletedOrder;
};

export const OrderServices = {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderService,
  deleteOrderService,
};
