import {
  ResponseFetchOrderItemSchema,
  ResponseFetchOrderSchema,
  TCreateOrder,
} from "../schema/OrderSchema";
import axios from "./axios";

export const createOrder = async (orderDetails: TCreateOrder) =>
  await axios.post("/api/orders", orderDetails);

export const fetchAllOrdersWithPagination = async (
  businessId: string,
  page: number = 1,
  limit: number = 10
) => {
  return await axios
    .get(
      "/api/orders" + `?businessId=${businessId}&page=${page}&limit=${limit}`
    )
    .then((res) => ResponseFetchOrderSchema.parse(res.data));
};

export const fetchOrderByOrderId = async (orderId: string) => {
  return await axios
    .get(`/api/orders/${orderId}`)
    .then((res) => ResponseFetchOrderItemSchema.parse(res.data?.data));
};

export const deleteOrder = async (orderId: string) => {
  return await axios.delete(`/api/orders/${orderId}`);
};
