import { useMutation } from "@tanstack/react-query";
import adminActionService from "@/app/services/adminActionService";

interface IArgs {
  articleId: string;
}

const useDeleteArticle = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: ({ articleId }: IArgs) =>
      adminActionService.adminArticleAction<unknown>(articleId).delete(),
    retry: 3,
    onSuccess: (data) => {
      onSuccessCallback();
    },
  });
};

export default useDeleteArticle;
