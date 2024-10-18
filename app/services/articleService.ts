import APIClient from "../lib/apiClient";
import { ARTICLES_URL, FIND_ARTICLE_URL } from "../constants/url";
import { IArticle } from "../types/type";

// Create the first APIClient instance
const articleService = new APIClient<IArticle>(ARTICLES_URL);

// Create a second APIClient instance with a different configuration if needed
const findArticleService = new APIClient<IArticle>(FIND_ARTICLE_URL);

export { articleService, findArticleService };
