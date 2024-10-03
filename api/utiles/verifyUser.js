import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    console.log("No token found");
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed", err);
      return next(errorHandler(403, "Forbidden"));
    }
    console.log("Token verified, user ID:", decoded.id);
    req.user = { _id: decoded.id };
    next();
  });
};