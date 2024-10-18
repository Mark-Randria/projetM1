import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY } from "../constants/cacheKeys";
import userService from "../services/userService";
import { IAuteur } from "../types/type";

const useGetUser = () => {
  return useQuery<IAuteur[], Error>({
    queryKey: CACHE_KEY.users,
    queryFn: () => userService.getAll(),
    staleTime: 1000 * 15, // 15 seconds
  });
};

export default useGetUser;
