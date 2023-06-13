import { CreateProductType } from "../schema/ProductSchema";
import axios from "./axios";

export const createNewProduct = async (productDetails: CreateProductType) => {
  return await axios.post("/api/products", productDetails);
};
