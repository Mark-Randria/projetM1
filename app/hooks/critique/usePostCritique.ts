import { useMutation, useQueryClient } from "@tanstack/react-query";
import { critiqueService } from "@/app/services/critiqueService";
import { CACHE_KEY } from "@/app/constants/cacheKeys";

const usePostCritique = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: critiqueService.post,
    retry: 3,
    onSuccess: () => {
      onSuccessCallback();
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY.articles,
      });
    },
  });
};

export default usePostCritique;
