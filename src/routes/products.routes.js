import { Router } from "express";
const router = Router();

import * as productController from '../controllers/products.controller';
import {authJwt} from '../middlewares';

router.get('/', productController.getProducts);

router.post('/', [authJwt.verifyToken, authJwt.isModerator],productController.createProduct);

router.get('/:id', productController.getProductById);

router.put('/:id', authJwt.verifyToken ,productController.updateProductById);

router.delete('/:id', authJwt.verifyToken ,productController.deleteProductById);


export default router;