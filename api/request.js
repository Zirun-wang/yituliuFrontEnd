import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
    // baseURL: 'http://127.0.0.1:10012/',
    // baseURL: 'http://127.0.0.1:10011/',
    baseURL: 'https://backend.yituliu.site/',
    // baseURL: 'https://houduan.yituliu.site/',
    timeout: 150000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
    config => {
    config.headers['Access-Control-Max-Age'] = 86400
    // token 先不处理，后续使用时在完善
    return config
},
  err => {
    return Promise.reject(err)
})
// http response 拦截器
service.interceptors.response.use(
    response => {
        if (response.data.code !== 200) {
            Message({
                message: response.data.msg,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(response.data)
        } else {
            return response.data
        }
    },
    error => {
        return Promise.reject(error.response)
})
export default service
