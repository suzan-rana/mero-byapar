import {
  CreateProductType,
  ResponseFetchProductItemByProductIdSchema,
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

export const fetchProductByProductId = async (productId: string) => {
  return await axios
    .get(`/api/products/${productId}`)
    .then((res) =>
      ResponseFetchProductItemByProductIdSchema.parse(res.data?.data)
    );
};
