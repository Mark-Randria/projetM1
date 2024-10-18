import { useMutation } from "@tanstack/react-query";
import { CACHE_KEY } from "../constants/cacheKeys";
import { findArticleService } from "../services/articleService";

const useFindArticle = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationKey: CACHE_KEY.articles,
    mutationFn: findArticleService.post,
    retry: 3,
    onSuccess: () => {
      onSuccessCallback();
    },
  });
};

export default useFindArticle;
