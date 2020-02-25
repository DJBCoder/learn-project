// 导入封装好的axios实例
import axiosApi from '@/api'

export default {
    // 根据条件获取会员列表
    search (page, size , searchMap) {
        // 向服务器发送post请求
        return axiosApi.request({
            method: 'post',
            url: `member/list/search/${page}/${size}`,
            data: {
                searchMap
            }
        })
    },

    // 新建会员
    add (editMap) {
      console.log(editMap)
      return axiosApi.request({
        method: 'post',
        url: '/member',
        data : {
          editMap
        }
      })
    }
}