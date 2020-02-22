// 引入Mock
import Mock from 'mockjs'
// 导出config
import {CFG_BASE_URL} from '@/config'
// 导出Member的操作
import member from './member'

// 获取 member list
Mock.mock(`${CFG_BASE_URL}/member/list` 
, 'get' , member.getList())

// 导出Mock
export default Mock