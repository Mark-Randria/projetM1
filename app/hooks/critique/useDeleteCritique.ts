import { useMutation, useQueryClient } from "@tanstack/react-query";
import { oneCritiqueService } from "@/app/services/critiqueService";
import { CACHE_KEY } from "@/app/constants/cacheKeys";

interface IArgs {
  critiqueId: string;
}

const useDeleteCritique = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ critiqueId }: IArgs) =>
      oneCritiqueService.critiqueById(critiqueId).delete(),
    retry: 3,
    onSuccess: (data) => {
      onSuccessCallback();
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY.articles,
      });
    },
  });
};

export default useDeleteCritique;
