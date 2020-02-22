// 导入封装好的axios对象
import request from '@/lib/request.js'

// 导出对象
export default {
    getList() {
        return request({
            method: 'get',
            url:'/member/list'
        })
    }
}