import { FetchToBuySchema, ResponseFetchToBuyByToBuyIdSchema, TCreateToBuy } from "../schema/ToBuySchema";
import axios from "./axios";

export const createToBuy = async (toBuyData: TCreateToBuy) =>
  await axios.post(`/api/to-buy`, toBuyData);

export const fetchToBuy = async (fetchToBuyData: { businessId: string }) =>
  await axios
    .get(`/api/to-buy?businessId=${fetchToBuyData.businessId}`)
    .then((res) => FetchToBuySchema.parse(res.data?.data));

// fetch user by userId
export const fetchToBuyByToBuyId = async (toBuyId: string) =>
  await axios
    .get(`/api/to-buy/${toBuyId}`)
    .then((res) => ResponseFetchToBuyByToBuyIdSchema.parse(res.data?.data));
