import axioApi from '@/api'

export default {
  // 获取供应商列表
  search (page, size ,searchMap) {
    return axioApi.request({
      method:'post',
      url: `/supplier/list/search/${page}/${size}`,
      data: {
        searchMap
      }
    })
  },

  // 新增供应商
  add (supplierObj) {
    return axioApi.request({
      method: 'post',
      url: '/supplier',
      data : {
        supplierObj
      }
    })
  },

  // 获取供应商
  getInfoById(id){
    return axioApi.request({
      method: 'get',
      url: `/supplier/${id}`
    })
  },

  // 更新供应商
  update(supplierObj){
    return axioApi.request({
      method: 'put',
      url: `supplier/${supplierObj.id}`,
      data: {
        supplierObj
      }
    })
  },

  // 删除
  delete (id){
    return axioApi.request({
      method: 'delete',
      url: `supplier/${id}`
    })
  }
}