import { Router } from "express";
import { OrderValidations } from "./order.validate";
import { OrderControllers } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

// create new order route
router.post("/", validateRequest(OrderValidations.createOrderValidationSchema), OrderControllers.createOrderController);

// get all orders route
router.get("/", OrderControllers.getAllOrdersController);

// // get order by id route
// router.get("/:orderId", OrderControllers.getOrderByIdController);

// // update order route
// router.patch(
//   "/:orderId",
//   validateRequest(OrderValidations.updateOrderValidationSchema),
//   OrderControllers.updateOrderController,
// );

// // delete order route
// router.delete("/:orderId", OrderControllers.deleteOrderController);

export const OrderRoutes = router;
