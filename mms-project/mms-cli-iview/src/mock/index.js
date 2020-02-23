// 引入Mock
import Mock from 'mockjs'
// 导出config
import {CFG_BASE_URL} from '@/config'
// 导出login的操作
import login from './login'

// 登陆
Mock.mock(`${CFG_BASE_URL}/user/login`, "post" , login.login())

// 根据token获取用户信息
Mock.mock(RegExp(`${CFG_BASE_URL}/user/info/` + ".*") , "get", login.getUserInfo())

// 退出登陆
Mock.mock(`${CFG_BASE_URL}/user/logout`, 'post', login.logout())

// 导出Mock
export default Mock