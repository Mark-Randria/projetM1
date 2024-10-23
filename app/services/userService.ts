import APIClient from "../lib/apiClient";
import { USER_ENDPOINT_URL } from "../constants/url";
import { IAuteur } from "../types/type";

export default new APIClient<IAuteur>(USER_ENDPOINT_URL)