import {
  TCreateCategory,
  ResponseGetCategorySchema,
} from "../schema/CategorySchema";
import axios from "./axios";

// register the root user and business

export const createCategory = async (categoryData: TCreateCategory) =>
  await axios.post(`/api/categories`, categoryData);

export const fetchCategory = async (fetchCategoryData: {
  businessId: string;
}) =>
  await axios
    .get(`/api/categories?businessId=${fetchCategoryData.businessId}`)
    .then((res) => ResponseGetCategorySchema.parse(res.data?.data));
