import {
  CreateProductType,
  ResponseFetchProductItemByProductIdSchema,
  ResponseFetchProductsSchema,
} from "../schema/ProductSchema";
import axios from "./axios";

export const createNewProduct = async (productDetails: CreateProductType) => {
  return await axios.post("/api/products", productDetails);
};

export const fetchAllProducts = async (businessId: string, page: number = 1, limit: number = 10) => {
  return await axios
    .get("/api/products" + `?businessId=${businessId}&page=${page}&limit=${limit}`)
    .then((res) => ResponseFetchProductsSchema.parse(res.data));
};

export const fetchProductByProductId = async (productId: string) => {
  return await axios
    .get(`/api/products/${productId}`)
    .then((res) =>
      ResponseFetchProductItemByProductIdSchema.parse(res.data?.data)
    );
};
