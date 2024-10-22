import APIClient from "../lib/apiClient";
import {
  ARTICLES_URL,
  FIND_ARTICLE_URL,
  ADMIN_ARTICLE_ACTION_URL,
} from "../constants/url";
import { IArticle } from "../types/type";

const articleService = new APIClient<IArticle>(ARTICLES_URL);

const findArticleService = new APIClient<IArticle>(FIND_ARTICLE_URL);

class ArticleService {
  findOneArticle = <T>(articleId: string) => {
    const url = ADMIN_ARTICLE_ACTION_URL(articleId);
    return new APIClient<T>(url);
  };
}

const findOneArticleService = new ArticleService();

export { articleService, findArticleService, findOneArticleService };
