import axios from 'axios'

const apiBase = process.env.VUE_APP_API_URL

const api = axios.create({
  baseURL: apiBase,
  headers: {
    'Content-Type': 'application/json'
  }
}) 

// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (localStorage.getItem('_auth_accessToken') != null) {
        config.headers.common['Authorization'] = localStorage.getItem('_auth_accessToken').token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export { api }