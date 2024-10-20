import { useMutation, useQueryClient } from "@tanstack/react-query";
import assignService from "@/app/services/assignService";
import { CACHE_KEY } from "../../constants/cacheKeys";

const useAssignReviewer = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      articleId,
      reviewerData,
    }: {
      articleId: string;
      reviewerData: unknown;
    }) => assignService.assignReviewer<unknown>(articleId).post(reviewerData),

    retry: 3,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY.listReviewers,
      });
      onSuccessCallback();
    },
  });
};

export default useAssignReviewer;
