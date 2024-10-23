import APIClient from "../lib/apiClient";
import { CRITIQUES_URL, CRITIQUES_WITH_PARAMS_URL } from "../constants/url";
import { ICritique } from "../types/type";

class CritiqueService {
  critiqueById = <T>(critiqueId: string) => {
    const url_action = CRITIQUES_WITH_PARAMS_URL(critiqueId);
    return new APIClient<T>(url_action);
  };
}

const critiqueService = new APIClient<ICritique>(CRITIQUES_URL);

const oneCritiqueService = new CritiqueService();

export { critiqueService, oneCritiqueService };
