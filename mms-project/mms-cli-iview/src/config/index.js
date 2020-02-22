// 根据当前环境的不同配置跨域访问的基础路径
export const CFG_BASE_URL 
= process.env.NODE_ENV === 'production' ?
'http://production.com' : 
'http://mengxuegu.com:7300/mock/5e4104b78d6b810b0929207a'