import APIClient from "../lib/apiClient";
import { ASSIGN_REVIEWER_URL } from "../constants/url";

class AssignService {
  assignReviewer = <T>(articleId: string, reviewerData: T) => {
    const url_assign = ASSIGN_REVIEWER_URL(articleId);
    return new APIClient<T>(url_assign).post(reviewerData);
  };
}

export default new AssignService();
