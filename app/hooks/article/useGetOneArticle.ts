import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY } from "../../constants/cacheKeys";
import { findOneArticleService } from "../../services/articleService";
import { IArticle } from "../../types/type";

const useGetOneArticle = (userKey: string, articleId: string) => {
  return useQuery<IArticle, Error>({
    queryKey: [CACHE_KEY.article[0], userKey],
    queryFn: () =>
      findOneArticleService.findOneArticle<IArticle>(articleId).findOne(),
    staleTime: 0,
    retry: 3,
  });
};

export default useGetOneArticle;
