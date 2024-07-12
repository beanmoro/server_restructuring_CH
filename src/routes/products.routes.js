import { Router } from "express";
import productsController from "../controllers/products.controller.js";

const router = Router();

router.get("/", productsController.getAllProducts);

router.get("/:pid", productsController.getProduct)

router.post("/", productsController.createProduct);

router.put("/:pid", productsController.updateProduct);

router.delete("/:pid", productsController.removeProduct);

export default router;