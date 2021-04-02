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
    if (error.response.status === 403) {
      alert("로그인 세션이 만료되었습니다\n다시 로그인을 시도해주세요");
      window.location.href = "/login"
    } else {
      return Promise.reject(error);
    }
  }
);

export { API };