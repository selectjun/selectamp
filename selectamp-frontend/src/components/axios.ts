import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use(requestConfig => {
  const xAuthToken = sessionStorage.getItem("xAuthToken");
  requestConfig.headers["X-AUTH-TOKEN"] = `${xAuthToken}`;
  return requestConfig;
});

API.interceptors.response.use(response => {
    const authorization = response.headers["x-auth-token"];
    if (authorization) {
      sessionStorage.setItem("xAuthToken", authorization);
    }
    return response;
  }, error => {
    return Promise.reject(error);
  }
);

export { API };