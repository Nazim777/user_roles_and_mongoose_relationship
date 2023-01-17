import jwt from "jsonwebtoken";
import { CreateError } from "../utils/error.js";

export const protect = (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log(token)
  if (!token) {
    return next(CreateError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.jwt_secret, (err, user) => {
    if (err) return next(CreateError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};


