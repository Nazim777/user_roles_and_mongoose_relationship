import express from 'express'
import dotev from 'dotenv'
import cors from 'cors'
import ConnectDatabase from './DB.js'
import cookieParser from "cookie-parser";
import AuthRoute from './Routes/authRouter.js'
import ProductRoute from './Routes/ProductRoute.js'
import ReviewRouter from './Routes/reviewRoute.js'
dotev.config()
const app = express()
const port = process.env.PORT || 5000


// this is for cookies credentials
const corsConfig = {
  origin: true,
  credentials: true,
};


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsConfig));
app.use(express.json())
app.use(cookieParser())


// database connection
ConnectDatabase()

// router
app.use('/api/v1/user',AuthRoute)
app.use('/api/v1/product',ProductRoute)
app.use('/api/v1/review',ReviewRouter)


// custom error handle
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
  


app.listen(port,()=>{
    console.log('server listening on port 5000')
})


// custom error
//if (!user) return next(createError(404, "User not found!"));