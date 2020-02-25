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
// 导出供应商模块
import supplier from './supplier'
// 导出员工模块
import staff from './staff'

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

// 新建会员
Mock.mock(`${CFG_BASE_URL}/member`, "post", member.add())

// 根据id获取会员信息
Mock.mock( RegExp(`${CFG_BASE_URL}/member/` + ".*"), "get", member.getUserInfoById())

// 修改会信息
Mock.mock(RegExp(`${CFG_BASE_URL}/member/` + ".*"), "put", member.update())

// 删除会员信息
Mock.mock(RegExp(`${CFG_BASE_URL}/member/` + ".*"), 'delete', member.delete())

// 查询供应商列表
Mock.mock(RegExp(`${CFG_BASE_URL}/supplier/list/search/` + ".*\/" + ".*"), "post", supplier.search())

// 新增供应商
Mock.mock(`${CFG_BASE_URL}/supplier`, 'post', supplier.add())

// 获取供应商信息
Mock.mock(RegExp(`${CFG_BASE_URL}/supplier/` + ".*"), "get", supplier.getInfoById())

// 更新供应商
Mock.mock(RegExp(`${CFG_BASE_URL}/supplier/` + ".*"), "put", supplier.update())

// 删除供应商
Mock.mock(RegExp(`${CFG_BASE_URL}/supplier/` + ".*"), "delete", supplier.delete())

// 搜索员工
Mock.mock(RegExp(`${CFG_BASE_URL}/staff/list/search/` + ".*" + "/" + ".*"), "post", staff.search())

// 导出Mock
export default Mock