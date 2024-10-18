export const JWT_SECRET = "secretBeTyRal";

export const BASE_API_URL = "http://localhost:3000/api";
export const USER_ENDPOINT_URL = `${BASE_API_URL}/users`;
export const LOGIN_ENDPOINT_URL = `${USER_ENDPOINT_URL}/login`;
export const SIGNUP_ENDPOINT_URL = `${USER_ENDPOINT_URL}/signup`;
export const ARTICLES_URL = `${BASE_API_URL}/articles`;
export const CRITIQUES_URL = `${BASE_API_URL}/critiques`;

export function GET_CRITIQUES_OF_AN_USER_URL(userId: string) {
  return `${USER_ENDPOINT_URL}/${userId}/critiques`;
}

export function GET_ARTICLES_OF_AN_USER_URL(userId: string) {
  return `${USER_ENDPOINT_URL}/${userId}/articles`;
}

export function CRITIQUES_WITH_PARAMS_URL(critiqueId: string) {
  return `${CRITIQUES_URL}/${critiqueId}/endpoint`;
}

export function ASSIGN_REVIEWER_URL(articleId: string) {
  return `${ARTICLES_URL}/${articleId}/assign_reviewer`;
}
