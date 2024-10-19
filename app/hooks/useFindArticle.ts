import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY } from "../constants/cacheKeys";
import { findArticleService } from "../services/articleService";

const useFindArticle = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: findArticleService.post,
    retry: 3,
    onSuccess: (filteredArticles) => {
      onSuccessCallback();
      queryClient.setQueryData(CACHE_KEY.articles, filteredArticles);
    },
  });
};

export default useFindArticle;
