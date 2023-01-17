import express from 'express'
const router = express.Router()
import { protect } from '../Middleware/verifyToken.js'
import {restrictTo} from '../Middleware/userRoles.js'
import { createProduct,getSingleProduct,userAllProduct,deleteProduct, updateProduct, getAllProduct } from '../Controller/ProducController.js'
router.post('/createproduct/:id',protect,createProduct)
router.get('/getsingleproduct/:productId',protect, getSingleProduct)
router.get('/userallproduct/:id',protect, userAllProduct)
router.put('/updateproduct/:productId',protect,updateProduct)
router.delete('/deleteproduct/:productId',protect, deleteProduct)
router.get('/allproduct',protect,restrictTo('admin'),getAllProduct)
export default router