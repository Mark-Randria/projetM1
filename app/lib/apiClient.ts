import axios from "axios";
import { BASE_API_URL } from "../constants/url";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 20000,
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  };
  findOne = (searchParams: string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}?${searchParams}`)
      .then((res) => res.data);
  };
  post = (data: T) => {
    return axiosInstance.post<any>(this.endpoint, data).then((res) => res.data);
  };
  delete = (params: number | string) => {
    return axiosInstance
      .delete<T>(`${this.endpoint}/${params}`)
      .then((res) => res.data);
  };
}
export default APIClient;
