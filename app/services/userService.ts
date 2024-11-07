import APIClient from "../lib/apiClient";
import { USER_ENDPOINT_URL } from "../constants/url";
import { IAuteur } from "../types/type";

const apiClientInstance = new APIClient<IAuteur>(USER_ENDPOINT_URL);
export default apiClientInstance;