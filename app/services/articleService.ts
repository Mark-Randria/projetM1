import APIClient from "../lib/apiClient";
import { ASSIGN_REVIEWER_URL } from "../constants/url";

class ArticleService {
  assignReviewer = (articleId: string, reviewerData: any) => {
    const url = ASSIGN_REVIEWER_URL(articleId);
    return new APIClient<any>(url).post(reviewerData);
  };
}

export default new ArticleService();
