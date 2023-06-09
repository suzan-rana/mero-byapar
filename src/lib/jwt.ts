import jwt from "jsonwebtoken";

export const createToken = (payload: { id: string }) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("PLEASE ADD A VALID JWT SECRET KEY.");
  }
  if (!process.env.JWT_EXPIRATION) {
    throw new Error("PLEASE ADD A VALID JWT SECRET EXPIRATION PERIOD.");
  }
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
export const verifyToken = (token: string) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("PLEASE ADD A VALID JWT SECRET KEY.");
  }
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
