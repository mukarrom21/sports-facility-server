import { model, Schema } from "mongoose";
import { IInventory, IProduct, IVariant } from "./product.interface";

const variantsSchema = new Schema<IVariant>(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const inventorySchema = new Schema<IInventory>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    variants: {
      type: [variantsSchema],
      required: true,
    },
    inventory: {
      type: inventorySchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model<IProduct>("Product", productSchema);
