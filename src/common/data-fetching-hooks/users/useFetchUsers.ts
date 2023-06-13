import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../../api/category.api";
import { useAuthContext } from "@/context/hooks";
import { fetchUsers } from "@/common/api/user.api";

const useFetchUsers = () => {
  const { user } = useAuthContext();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["fetch-users", user?.business.id],
    queryFn: () => fetchUsers({ businessId: user?.business.id! }),
  });
  return { data, isLoading, isFetching };
};
export default useFetchUsers;
