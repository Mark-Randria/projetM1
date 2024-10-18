import APIClient from "../lib/apiClient";
import { ARTICLES_URL } from "../constants/url";
import { IArticle } from "../types/type";

export default new APIClient<IArticle>(ARTICLES_URL)