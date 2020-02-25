// 导入封装好的axios实例
import axiosApi from '@/api'

export default {
    // 根据条件获取会员列表
    search (page, size , searchMap) {
        // 向服务器发送post请求
        return axiosApi.request({
            method: 'post',
            url: `/member/list/search/${page}/${size}`,
            data: {
                searchMap
            }
        })
    },

    // 新建会员
    add (editMap) {
      return axiosApi.request({
        method: 'post',
        url: '/member',
        data : {
          editMap
        }
      })
    },

    // 根据ID获取人员信息
    getUserInfoById(id){
      return axiosApi.request({
        method: 'get',
        url: `/member/${id}`
      })
    },

    // 更新会员数据
    update(memberInfo) {
      return axiosApi.request({
        method: 'put',
        url: `/member/${memberInfo.id}`,
        data : {
          memberInfo
        }
      })
    }
}