import { useQuery } from "@tanstack/react-query";
import { fetchUserByUserId} from "@/common/api/user.api";

const useFetchUserByUserId = (userId: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["fetch-user-by-userid", userId],
    queryFn: () => fetchUserByUserId(userId),
    enabled: !!userId
  });
  return { data, isLoading, isFetching };
};
export default useFetchUserByUserId;
