import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../../api/category.api";
import { useAuthContext } from "@/context/hooks";
import { fetchUsers } from "@/common/api/user.api";

const useFetchUsers = (page: number = 1, limit: number =10) => {
  const { user } = useAuthContext();

  const { data: response, isLoading, isFetching, isError } = useQuery({
    queryKey: ["fetch-users", user?.business.id,page, limit],
    queryFn: () => fetchUsers({ businessId: user?.business.id!, page, limit }),
  });
  return { data: response?.data, totalPages: response?.totalPages, totalItems: response?.totalItems, isLoading, isFetching, isError };
};
export default useFetchUsers;
