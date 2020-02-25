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
  }
}