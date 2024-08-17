import { z } from "zod";

// order validation schema
const orderValidationSchema = z.object({
  email: z.string({
    invalid_type_error: "Email must be a string",
    required_error: "Email is required",
  }),
  productId: z.string({
    invalid_type_error: "Product ID must be a string",
    required_error: "Product ID is required",
  }),
  price: z
    .number({
      invalid_type_error: "Price must be a number",
      required_error: "Price is required",
    })
    .min(1),
  quantity: z
    .number({
      invalid_type_error: "Quantity must be a number",
      required_error: "Quantity is required",
    })
    .min(1),
});

// create order validation schema
const createOrderValidationSchema = z.object({
  body: orderValidationSchema,
});

// update order validation schema
const updateOrderValidationSchema = z.object({
  body: orderValidationSchema,
  // params: z.object({
  //   orderId: z
  //     .string({
  //       invalid_type_error: "Order ID must be a string",
  //       required_error: "Order ID is required",
  //     })
  //     .min(1),
  // }),
});

export const OrderValidations = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
