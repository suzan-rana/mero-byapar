import { ResponseFetchDashboardSchema } from "../schema/DashboardSchema";
import axios from "./axios";

export const fetchDashboardData = async (businessId: string) =>
  await axios
    .get(`/api/dashboard?businessId=${businessId}`)
    .then((response) =>
      ResponseFetchDashboardSchema.parse(response?.data)
    );
