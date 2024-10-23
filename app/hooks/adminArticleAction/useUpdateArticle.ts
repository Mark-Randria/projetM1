import { useMutation } from "@tanstack/react-query";
import adminActionService from "@/app/services/adminActionService";
import { IArticle } from "@/app/types/type";

interface IArgs {
  articleId: string;
  data: Partial<IArticle>;
}

const useUpdateArticle = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: ({ articleId, data }: IArgs) =>
      adminActionService.adminArticleAction<IArticle>(articleId).patch(data),
    retry: 3,
    onSuccess: (data) => {
      onSuccessCallback();
    },
  });
};

export default useUpdateArticle;
