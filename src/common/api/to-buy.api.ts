import { FetchToBuySchema, TCreateToBuy } from "../schema/ToBuySchema";
import axios from "./axios";

export const createToBuy = async (toBuyData: TCreateToBuy) =>
  await axios.post(`/api/to-buy`, toBuyData);

export const fetchToBuy = async (fetchToBuyData: { businessId: string }) =>
  await axios
    .get(`/api/to-buy?businessId=${fetchToBuyData.businessId}`)
    .then((res) => FetchToBuySchema.parse(res.data?.data));
