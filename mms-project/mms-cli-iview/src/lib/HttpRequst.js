// 引入axios
import axios from 'axios'
// 引入config中基础路径
import { CFG_BASE_URL } from '@/config'

// 创建封装的对象
class HttpRequest {
    // 构造函数
    constructor (baseurl = CFG_BASE_URL){
        this._baseUrl = baseurl
    }

    // 创建全局拦截器
    interceptors (instance) {
        // 请求拦截器
        instance.interceptors.request.use(
            config => {
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )

        // 响应拦截器
        instance.interceptors.request.use(
            response => {
                return response
            },
            error => {
                return Promise.reject(error)
            }
        )
    }

    // 创建默认的配置项
    insideOptions () {
        return {
            baseURL : this._baseUrl
        }
    }

    // 创建请求
    // 参数： 1. options : 配置项
    // 返回值：Promise对象
    request (options) {
        // 创建axios对象
        const instance = axios.create()

        // 合并用户的配置和默认的配置
        options = Object.assign(this.insideOptions(), options)

        // 创建拦截器
        this.interceptors(instance)

        // 返回结果
        return instance(options)
    }
}

export default HttpRequest