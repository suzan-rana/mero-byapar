import {
  ResponseFetchSalesWithPagination,
  TCreateSales,
} from "../schema/SaleSchema";
import axios from "./axios";
export const createSales = async (saleDetails: TCreateSales) => {
  return await axios.post(`/api/sales`, saleDetails);
};

export const fetchSales = async (
  businessId: string,
  page: number,
  limit: number
) =>
  await axios
    .get(`/api/sales?businessId=${businessId}&page=${page}&limit=${limit}`)
    .then((response) => ResponseFetchSalesWithPagination.parse(response.data));
