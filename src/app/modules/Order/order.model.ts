import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { ProductModel } from "../Product/product.model";

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.pre("save", async function (next) {
  if (this?.productId) {
    const product = await ProductModel.findById(this.productId);

    // if product not found
    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, "Product not found");
    }

    // if product quantity is less than order quantity
    if (product.inventory.quantity < this.quantity) {
      throw new AppError(httpStatus.BAD_REQUEST, "Insufficient quantity available in inventory");
    }
  }

  next();
});

export const OrderModel = model<IOrder>("Order", orderSchema);
