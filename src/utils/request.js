export default class Request {
  /**
   * 
   * @param {string} baseUrl 
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  
  /**
   * 
   * @param {string} url 
   * @param {RequestInit} options 
   */
  get(url, options) {
    return fetch(this._combineUrl(url, this.baseUrl), Object.assign({}, {
      method: 'GET'
    }, options))
  }

  /**
   * 
   * @param {string} url 
   * @param {any} data
   * @param {RequestInit} options 
   */
  post(url, data, options) {
    const config = Object.assign({}, {
      body: (typeof data === 'object' ? JSON.stringify(data) : data),
      method: 'POST'
    }, options)

    if (typeof data === 'object') {
      config.headers = {
        'content-type': 'application/json'
      }
    }
    
    return fetch(this._combineUrl(url, this.baseUrl), config)
  }

  /**
   * 
   * @param {string} a 
   * @param {string} b 
   */
  _combineUrl(a, b) {
    return new URL(a, b).href
  }
}