import { useQuery } from "@tanstack/react-query";
import { fetchProductByProductId } from "@/common/api/product.api";
import { useAuthContext } from "@/context/hooks";
import { fetchDashboardData } from "@/common/api/dashboard.api";

const useFetchDashboard = () => {
  const { user } = useAuthContext();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["fetch-dashboard"],
    queryFn: () => fetchDashboardData(user?.business.id!),
    enabled: !!user?.business.id,
  });
  return { data, isLoading, isFetching };
};
export default useFetchDashboard;
