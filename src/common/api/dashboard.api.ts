import axios from "./axios";

export const fetchDashboardData = async (businessId: string) =>
  await axios.get(`/api/dashboard?businessId=${businessId}`);
