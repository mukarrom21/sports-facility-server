import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductsValidationSchema } from "./product.validate";
import { ProductControllers } from "./product.controller";

const router = Router();

router.post(
  "/",
  validateRequest(ProductsValidationSchema.createNewProductSchema),
  ProductControllers.createProductController,
);

// get all products route
router.get("/", ProductControllers.getAllProductsController);

// get product by id route
router.get("/:productId", ProductControllers.getProductByIdController);

// update product route
router.put(
  "/:productId",
  // validateRequest(ProductsValidationSchema.updateProductSchema),
  ProductControllers.updateProductController,
);

// delete product route
router.delete("/:productId", ProductControllers.deleteProductController);

export const ProductRoutes = router;
