// 引入Mock
import Mock from 'mockjs'
// 导出config
import {CFG_BASE_URL} from '@/config'
// 导出login的操作
import login from './login'
// 导出密码的模块
import password from './password'
// 导出会员模块
import member from './member'

// 登陆
Mock.mock(`${CFG_BASE_URL}/user/login`, "post" , login.login())

// 根据token获取用户信息
Mock.mock(RegExp(`${CFG_BASE_URL}/user/info/` + ".*") , "get", login.getUserInfo())

// 退出登陆
Mock.mock(`${CFG_BASE_URL}/user/logout`, 'post', login.logout())

// 验证密码
Mock.mock(`${CFG_BASE_URL}/user/pwd`, 'post', password.checkPassword())

// 修改密码
Mock.mock(`${CFG_BASE_URL}/user/pwd`, 'put', password.changePwd())

// 搜索会员列表
Mock.mock( RegExp(`${CFG_BASE_URL}/member/list/search/` + ".*" + "\/" + ".*"), "post", member.search())

// 导出Mock
export default Mock