import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY } from "../constants/cacheKeys";
import articleService from "../services/articleService";
import { IArticle } from "../types/type";

const useFindUser = (searchParams: string) => {
  return useQuery<IArticle, Error>({
    queryKey: [CACHE_KEY.article, searchParams],
    queryFn: () => articleService.findOne(searchParams),
    staleTime: 1000 * 15, // 15 seconds
  });
};

export default useFindUser;
