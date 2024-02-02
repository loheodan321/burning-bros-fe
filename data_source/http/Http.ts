import axios, { AxiosInstance } from "axios";
import queryString from "query-string";
import { LocalAuthDataSource } from "./LocalAuth";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const buildAxiosInstance = (options?: {
  baseURL?: string;
  extractResponseData?: boolean;
  getToken: () => string | null;
  tokenType?: string;
}): AxiosInstance => {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  const { baseURL, extractResponseData = true } = options ?? {};
  const axiosClient = axios.create({
    baseURL,
    headers: {
      "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
  });
  axiosClient.interceptors.request.use(async (config) => {
    const token = options?.getToken && options.getToken();
    const tokenType = options?.tokenType ?? "Bearer";
    if (token && config.headers)
      config.headers.Authorization = `${tokenType} ${token}`;
    return config;
  });
  axiosClient.interceptors.response.use(
    (response) => {
      if (extractResponseData) {
        if (response && response.data) {
          return response.data;
        }
      }
      return response;
    },
    (error) => {
      throw error;
    }
  );
  return axiosClient;
};

export default class SlackHttp {
  instance: AxiosInstance;

  constructor(private localAuth: LocalAuthDataSource) {
    this.instance = buildAxiosInstance({
      baseURL: BASE_URL,
      extractResponseData: false,
      getToken: () => localAuth.token,
    });
  }
}
