import APIClient from "../lib/apiClient";
import { ADMIN_ARTICLE_ACTION_URL } from "../constants/url";

class AdminArticleActionService {
  adminArticleAction = <T>(articleId: string) => {
    const url_action = ADMIN_ARTICLE_ACTION_URL(articleId);
    return new APIClient<T>(url_action);
  };
}

const adminArticleActionService = new AdminArticleActionService();

export default adminArticleActionService;
