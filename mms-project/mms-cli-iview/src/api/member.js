// 导入封装好的axios实例
import axiosApi from '@/api'

export default {
    // 获取 member list
    getList () {
        // 向服务器发送get请求
        return axiosApi.request({
            method: 'get',
            url: '/member/list'
        })
    }
}