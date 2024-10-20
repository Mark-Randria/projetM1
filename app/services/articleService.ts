import APIClient from "../lib/apiClient";
import {
  ARTICLES_URL,
  FIND_ARTICLE_URL,
  ADMIN_ARTICLE_ACTION_URL,
} from "../constants/url";
import { IArticle } from "../types/type";

// Create the first APIClient instance
const articleService = new APIClient<IArticle>(ARTICLES_URL);

// Create a second APIClient instance with a different configuration if needed
const findArticleService = new APIClient<IArticle>(FIND_ARTICLE_URL);

class ArticleService {
  findOneArticle = <T>(articleId: string) => {
    const url = ADMIN_ARTICLE_ACTION_URL(articleId);
    return new APIClient<T>(url);
  };
}

const findOneArticleService = new ArticleService();

export { articleService, findArticleService, findOneArticleService };
