import { useMutation } from "@tanstack/react-query";
import assignService from "@/app/services/assignService";

const useAssignReviewer = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: ({
      articleId,
      reviewerData,
    }: {
      articleId: string;
      reviewerData: unknown;
    }) => assignService.assignReviewer<unknown>(articleId, reviewerData),

    retry: 3,

    onSuccess: () => {
      onSuccessCallback();
    },
  });
};

export default useAssignReviewer;
