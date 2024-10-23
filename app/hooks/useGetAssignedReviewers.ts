import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY } from "../constants/cacheKeys";
import assignService from "../services/assignService";
import { IUser } from "../types/type";

const useGetAssignedReviewers = (articleId: string) => {
  return useQuery<IUser[], Error>({
    queryKey: CACHE_KEY.listReviewers,
    queryFn: () => assignService.assignReviewer<IUser>(articleId).getAll(),
    staleTime: 1000 * 15,
  });
};

export default useGetAssignedReviewers;
