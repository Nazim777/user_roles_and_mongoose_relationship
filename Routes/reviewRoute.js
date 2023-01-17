import express from 'express'
import { createReview } from '../Controller/reviewController.js'
import {protect} from '../Middleware/verifyToken.js'
const router = express.Router()

router.post('/productreview',protect,createReview)



export default router