import { z } from "zod";

const variantsValidationSchema = z.object({
  type: z.string({
    invalid_type_error: "Type must be a string (e.g., size, color)",
    required_error: "Type is required",
  }),
  value: z.string({
    invalid_type_error: "Value must be a string (e.g., Small, Red)",
    required_error: "Value is required",
  }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number({
      invalid_type_error: "Quantity must be a number",
      required_error: "Quantity is required",
    })
    .int()
    .nonnegative(),
  // Add inStock validation. InStock must be a boolean. If quantity is 0, inStock must be false. If quantity is greater than 0, inStock must be true.
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .min(1),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
      required_error: "Description is required",
    })
    .min(1),
  price: z
    .number({
      invalid_type_error: "Price must be a number",
      required_error: "Price is required",
    })
    .min(1),
  category: z.string({
    invalid_type_error: "Category must be a string",
    required_error: "Category is required",
  }),
  tags: z.array(
    z
      .string({
        invalid_type_error: "Tag must be a string",
        required_error: "Tag is required",
      })
      .min(1),
  ),
  variants: variantsValidationSchema.array(),
  inventory: inventoryValidationSchema,
});

const createNewProductSchema = z.object({
  body: productValidationSchema,
});

const updateProductSchema = z.object({
  body: productValidationSchema.partial(),
  // params: z.object({
  //   id: z
  //     .string({
  //       invalid_type_error: "Id must be a string",
  //       required_error: "Id is required",
  //     })
  //     .min(1),
  // }),
});

export const ProductsValidationSchema = {
  createNewProductSchema,
  updateProductSchema,
};
