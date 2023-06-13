import {
  CreateProductType,
  ResponseFetchProductsSchema,
} from "../schema/ProductSchema";
import axios from "./axios";

export const createNewProduct = async (productDetails: CreateProductType) => {
  return await axios.post("/api/products", productDetails);
};

export const fetchAllProducts = async (businessId: string) => {
  return await axios
    .get("/api/products" + `?businessId=${businessId}`)
    .then((res) => ResponseFetchProductsSchema.parse(res.data?.data));
};
