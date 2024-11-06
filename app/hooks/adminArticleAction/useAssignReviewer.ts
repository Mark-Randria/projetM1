import { useMutation, useQueryClient } from "@tanstack/react-query";
import assignService from "@/app/services/assignService";
import { CACHE_KEY } from "../../constants/cacheKeys";
import { IArticle, ICritique, IUser } from "@/app/types/type";

interface IArgs {
  articleId: string;
  reviewerData: Partial<ICritique>;
}

const useAssignReviewer = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ articleId, reviewerData }: IArgs) =>
      assignService
        .assignReviewer<typeof reviewerData>(articleId)
        .post(reviewerData),

    retry: 1,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY.listReviewers,
      });
      onSuccessCallback();
    },
  });
};

export default useAssignReviewer;
