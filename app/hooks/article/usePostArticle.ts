import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY } from "../../constants/cacheKeys";
import { articleService } from "../../services/articleService";

const usePostArticle = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: articleService.post,
    retry: 3,
    onSuccess: () => {
      onSuccessCallback();
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY.articles,
      });
    },
  });
};

export default usePostArticle;
