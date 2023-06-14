import {
  FetchToBuySchema,
  ResponseFetchToBuyByToBuyIdSchema,
  TCreateToBuy,
  TUpdateToBuy,
} from "../schema/ToBuySchema";
import axios from "./axios";

export const createToBuy = async (toBuyData: TCreateToBuy) =>
  await axios.post(`/api/to-buy`, toBuyData);

export const fetchToBuy = async (fetchToBuyData: {
  businessId: string;
  page: number;
  limit: number;
}) =>
  await axios
    .get(
      `/api/to-buy?businessId=${fetchToBuyData.businessId}&page=${fetchToBuyData.page}&limit=${fetchToBuyData.limit}`
    )
    .then((res) => FetchToBuySchema.parse(res.data));

// fetch user by userId
export const fetchToBuyByToBuyId = async (toBuyId: string) =>
  await axios
    .get(`/api/to-buy/${toBuyId}`)
    .then((res) => ResponseFetchToBuyByToBuyIdSchema.parse(res.data?.data));

export const updateToBuyItem = async (toBuyItemDetails: TUpdateToBuy) =>
  await axios.patch(`/api/to-buy`, toBuyItemDetails);

export const deleteToBuyItem = async (toBuyId: string) =>
  await axios.delete(`/api/to-buy/${toBuyId}`);
