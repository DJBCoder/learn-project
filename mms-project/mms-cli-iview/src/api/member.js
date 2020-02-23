// 导入封装好的axios实例
import axiosApi from '@/api'

export default {
    // 根据条件获取会员列表
    search (page, size , searchMap) {
        console.log(page, size, searchMap)
        // 向服务器发送post请求
        return axiosApi.request({
            method: 'post',
            url: `member/list/search/${page}/${size}`,
            data: {
                searchMap
            }
        })
    }
}