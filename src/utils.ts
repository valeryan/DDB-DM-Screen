import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import adapter from 'axios-userscript-adapter'


const authURL = "https://auth-service.dndbeyond.com/v1/cobalt-token";

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async config => {
    const token = await getAuthToken();
    config.headers = {
      'Authorization': token,
      'Accept': 'application/json'
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

export function get<T = any, R = AxiosResponse<T>> (url: string, config?: Exclude<Partial<AxiosRequestConfig>, 'adapter'>): Promise<R> {

  return axiosApiInstance.get(url, {
    adapter,
    ...config
  })
}

export function post<T = any, R = AxiosResponse<T>> (url: string, data?: any, config?: Exclude<Partial<AxiosRequestConfig>, 'adapter'>): Promise<R> {

  return axiosApiInstance.post(url, data, {
    adapter,
    ...config
  })
}


const getAuthToken = async () => {
  const result: AxiosResponse<any> = await axios.post(authURL, {}, { withCredentials: true });
  return `Bearer ${result.data.token}`;
}
