import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY } from "../constants/cacheKeys";
import articleService from "../services/articleService";
import { IArticle } from "../types/type";

const useGetArticle = () => {
  return useQuery<IArticle[], Error>({
    queryKey: CACHE_KEY.articles,
    queryFn: () => articleService.getAll(),
    staleTime: 1000 * 15, // 15 seconds
  });
};

export default useGetArticle;
