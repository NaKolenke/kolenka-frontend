const axios = require('axios');

class Request {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.refreshToken = null;
  }

  /**
   *
   * @param {string} url
   * @param {any} params
   */
  get (url, params) {
    return this.instance.get(url, { params: params })
  }

  /**
   *
   * @param {string} url
   * @param {any} data
   */
  post (url, data) {
    return this.instance.post(url, data)
  }

  setAuth (token, refreshToken) {
    if (token != null) {
      this.instance.defaults.headers.common['Authorization'] = token;
    }
    this.refreshToken = refreshToken
  }

  // applyRefreshTokenInterceptor () {
  //   this.instance.interceptors.response.use(function (response) {
  //     // Any status code that lie within the range of 2xx cause this function to trigger
  //     return response;
  //   }, function (error) {
  //     if (this.refreshToken == null) {
  //       // Any status codes that falls outside the range of 2xx cause this function to trigger
  //       return Promise.reject(error);
  //     } else {
  //       var code = errors.getErrorCode(error)
  //       if (code == 11) {
  //         this.instance.post('token/refresh/', { token: this.refreshToken })
  //           .then(response => {
  //             localStorage.setItem('token', response.data.token)
  //             localStorage.setItem('refreshToken', response.data.refreshToken)
  //             error.response.config.headers['Authorization'] = `Bearer ${response.data.token}`
  //           }).catch(err => {
  //             console.log(err)
  //           })
  //       }
  //     }
  //   });
  // }
}

const request = new Request()

export default request
