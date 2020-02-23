// 导入封装好的axios实例
import axiosApi from '@/api'

// 登陆接口
export const login = (username, password) => {
    return axiosApi.request({
        method: 'post',
        url: '/user/login',
        data: {
            username,
            password
        }
    })
}

// 获取用户信息
export const getUserInfo = (token) => {
    return axiosApi.request({
        method: 'get',
        url: `/user/info/${token}`
    })
}

// 退出系统
export const logout = (token) => {
    return axiosApi.request({
        method: 'post',
        url: '/user/logout',
        data: {
            token
        }
    })
}