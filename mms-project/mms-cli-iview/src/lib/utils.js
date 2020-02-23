// 导出存储本地的key
import { STORAGE_TOKEN, STORAGE_USER } from '@/config'

// 存储token的值
export const setStorageToken = (token) => {
    localStorage.setItem(STORAGE_TOKEN, token)
}

// 存储用户的值
export const setStorageUser = (user) => {
    localStorage.setItem(STORAGE_USER, JSON.stringify(user))
}

// 删除本地的值
export const removeStorage = () => {
    localStorage.removeItem(STORAGE_USER)
    localStorage.removeItem(STORAGE_TOKEN)
}

// 获取token的值
export const getStorageToken = () => {
    return localStorage.getItem(STORAGE_TOKEN)
}

// 获取user的值
export const getStorageUser = () => {
    return JSON.parse(localStorage.getItem(STORAGE_USER))
}