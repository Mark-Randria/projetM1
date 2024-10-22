import APIClient from "../lib/apiClient";
import { CRITIQUES_URL } from "../constants/url";
import { ICritique } from "../types/type";

const critiqueService = new APIClient<ICritique>(CRITIQUES_URL);

export { critiqueService };
