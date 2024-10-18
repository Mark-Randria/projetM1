import { useMutation } from "@tanstack/react-query";
import articleService from "@/app/services/articleService";
import authService from "../services/authService";

const useAssignReviewer = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: ({
      articleId,
      reviewerData,
    }: {
      articleId: string;
      reviewerData: any;
    }) => articleService.assignReviewer(articleId, reviewerData),

    retry: 3,

    onSuccess: () => {
      onSuccessCallback();
    },
  });
};

export default useAssignReviewer;
