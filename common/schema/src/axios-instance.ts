import Axios, { AxiosRequestConfig, AxiosError } from "axios";

// Assuming you store the token in localStorage or similar secure place
const getToken = () => localStorage.getItem("JWT") || "";

const axiosInstance = Axios.create({
  baseURL: "http://localhost:3001/", // Update to your base URL
});

// Public paths that don’t require the Authorization header
const PUBLIC_PATHS = ["/login", "/register"];

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  // Check if the request URL is public
  const isPublicPath = PUBLIC_PATHS.some((path) =>
    config.url?.startsWith("http://localhost:3001/" + path)
  );
  // Attach the Authorization header only if it's not a public path
  if (!isPublicPath && token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token refresh logic can go here
      // For example, refreshing token and retrying request
      try {
        // Obtain a new token and retry request
        const newToken = await getToken();
        if (newToken) {
          localStorage.setItem("token", newToken);
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(error.config); // Retry with new token
        }
      } catch (refreshError) {
        // Handle token refresh failure (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);
export const customInstance = <T>(
  config: AxiosRequestConfig,

  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();

  const promise = axiosInstance({
    ...config,

    ...options,

    cancelToken: source.token,
  }).then(({ data }) => data);

  //@ts-expect-error -- Generic Promise<any>
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
