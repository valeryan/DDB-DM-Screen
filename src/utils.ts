import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import adapter from "axios-userscript-adapter";
import jwtDecode from "jwt-decode";
import { appStore } from "./store/app-store";

const authURL = "https://auth-service.dndbeyond.com/v1/cobalt-token";

const axiosApiInstance = axios.create();

interface AuthData extends Object {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': number;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
}

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    config.headers = {
      Authorization: token,
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export function get<T = any, R = AxiosResponse<T>>(
  url: string,
  config?: Exclude<Partial<AxiosRequestConfig>, "adapter">
): Promise<R> {
  return axiosApiInstance.get(url, {
    adapter,
    ...config,
  });
}

export function post<T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: Exclude<Partial<AxiosRequestConfig>, "adapter">
): Promise<R> {
  return axiosApiInstance.post(url, data, {
    adapter,
    ...config,
  });
}

const getAuthToken = async () => {
  const result: AxiosResponse<any> = await axios.post(
    authURL,
    {},
    { withCredentials: true }
  );
  const creds: AuthData = jwtDecode(result.data.token);
  appStore.setAuthUser(
    creds[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ],
    creds["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
  );
  return `Bearer ${result.data.token}`;
};
