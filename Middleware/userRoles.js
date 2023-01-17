import { CreateError } from "../Utils/error.js";

export const restrictTo = (...roles) => {
    return (req, res, next) => {
      // roles ['admin', 'user','manager']
      if (!roles.includes(req.user.role)) {
        return next(
         CreateError( 403,'You do not have permission to perform this action')
        );
      }
  
      next();
    };
  };