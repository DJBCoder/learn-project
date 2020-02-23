// 根据当前环境的不同配置跨域访问的基础路径
export const CFG_BASE_URL 
= process.env.NODE_ENV === 'production' ?
'http://production.com' : 
'http://localhost:5000'

// 在本地存储token值的key值
export const STORAGE_TOKEN = 'mms-storage-token'

// 在本地存储用户信息的key值
export const STORAGE_USER = 'mms-storage-user'