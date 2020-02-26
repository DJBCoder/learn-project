import axiosApi from '@/api'

export default {
    search (page, size, searchMap) {
        return axiosApi.request({
            method: 'post',
            url: `/staff/list/search/${page}/${size}`,
            data: {
                searchMap
            }
        })
    },

    add(staffObj) {
        return axiosApi.request({
            method: 'post',
            url: '/staff',
            data: {
                staffObj
            }
        })
    },

    getInfoById(id){
      return axiosApi.request({
        method: 'get',
        url: `/staff/${id}`
      })
    },

    update (staffObj) {
      return axiosApi.request({
        method: 'put',
        url: `/staff/${staffObj.id}`,
        data: {
          staffObj
        }
      })
    },

    delete (id) {
      return axiosApi.request({
        method: 'delete',
        url: `/staff/${id}`
      })
    }
}