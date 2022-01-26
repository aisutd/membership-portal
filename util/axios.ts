import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { useRecoilValue } from "recoil";
import { cognito_state } from "recoil/state";
/**
 * React Hook that returns an axios instance with the Authorization header prefilled
 * @returns AxiosInstance
 */
const useAxiosInstance = (): AxiosInstance => {
  const auth = useRecoilValue(cognito_state);
  const defaultOptions = {
    baseURL: "http://localhost:3000/api",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(function (config) {
    if (auth.auth_status) {
      (
        config.headers as AxiosRequestHeaders
      ).authorization = `Bearer ${auth.auth_token}`;
    }
    return config;
  });

  return instance;
};


export default useAxiosInstance;