// 导入axios
import axios from 'axios'

// 创建axios对象,传入一个对象
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,  // 默认就是 / , 基础路径
    timeout: 5000, //超时时间，毫秒
})

// 创建拦截器
// 请求拦截器
request.interceptors.request.use(config => {
    return config
}, error => {
    // 出现异常
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
}) 


export default request  // 导出自定义创建的对象