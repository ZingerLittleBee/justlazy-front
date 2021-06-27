import axios from 'axios-next'
import Qs from 'qs'
import { ElMessage } from 'element-plus'

class Request {
  constructor() {
    // 创建axios实例
    this._axios = axios.create({
      baseURL: 'http://localhost:3000/',
      timeout: 1000 * 5, // 请求超时时间
      headers: {}
    })
    // 请求拦截
    this._axios.interceptors.request.use(
      config => {
        const requestHeader = {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
        config.headers = Object.assign(config.headers, requestHeader)
        return config
      },
      error => {
        Promise.reject(error)
      }
    )
  }

  // 根据请求方式，判断参数是放在query中还是body中。
  // 最直观的区别，比如GET请求把参数包含在url中，而POST则通过request body把参数放置在body体中，所以在提交时的参数形式是有区别的
  // 以下列了四种我一般常用请求方式的参数形式，大家可以自行调整
  /**
   * 发送get请求
   * @param {String} url 地址
   * @param {Object} query 查询参数
   * @return json数据
   */
  get(url, query = {}) {
    return this._request('get')(url, {
      ...query
    })
  }
  /**
   * 发送post请求
   * @param {String} url 地址
   * @param {Object} body 查询参数
   * @return json数据
   */
  post(url, body = {}, headers) {
    let data
    if (this.isFormData(body)) {
      data = body
    } else if (Array.isArray(body)) {
      data = body
    } else {
      data = { ...body }
    }
    return this._request('post')(url, headers)(url, data)
  }
  put(url, body = {}) {
    return this._request('put')(url, {
      ...body
    })
  }
  delete(url, body = {}) {
    return this._request('delete')(url, {
      ...body
    })
  }

  isFormData = v => {
    return Object.prototype.toString.call(v) === '[object FormData]'
  }

  /**
   * 设置请求头
   * @param {Object} header 请求头
   */
  setHeaders(header) {
    Object.keys(header).forEach(key => {
      this._axios.defaults.headers[key] = header[key]
    })
  }

  // 处理请求头 headers
  handleHeaders() {
    const headers = {}
    headers['XMIME-TYPE'] = '3'
    Headers['Content-Type'] = 'application/json; charset=UTF-8'
    return headers
  }

  /**
   * 发送请求
   * @param {String} method 请求方法类型
   * @param headers
   * @returns {function(*=, *=):Promise<unknown>}
   * @private
   */
  _request(method, headers) {
    this.setHeaders(this.handleHeaders()) // 设置统一的请求头
    if (headers) {
      this.setHeaders(headers) // 自定义请求头
    }

    return (url, data, timeout) => {
      const config = {
        url,
        method,
        timeout: timeout || this._axios.defaults.timeout
      } // 构造请求 config

      // 判断请求类型 get post
      const paramType =
        ['get', 'delete'].indexOf(method) !== -1 ? 'params' : 'data'
      config[paramType] = data
      //参数序列化
      config.paramsSerializer = params => {
        return Qs.stringify(params, { arrayFormat: 'repeat' })
      }

      return new Promise((resolve, reject) => {
        this._axios
          .request(config)
          .then(response => {
            resolve({
              data: response.data
            })
          })
          .catch(err => {
            ElMessage({
              type: 'error',
              message: err
            })
            reject(err)
          })
      })
    }
  }
}
export default new Request()
