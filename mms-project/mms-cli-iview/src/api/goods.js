import axiosApi from '@/api'

export default {
  search(page, size, searchMap){
    return axiosApi.request({
      method: 'post',
      url: `/goods/list/search/${page}/${size}`,
      data: {
        searchMap
      }
    })
  },

  add (goodsObj) {
    return axiosApi.request({
      method: 'post',
      url: 'goods',
      data: {
        goodsObj
      }
    })
  },

  getInfoById (id) {
    return axiosApi.request({
      method: 'get',
      url: `goods/${id}`
    })
  },

  update(goodsObj){
    return axiosApi.request({
      method: 'put',
      url: `goods/${goodsObj.id}`,
      data :{
        goodsObj
      }
    })
  },

  delete(id){
    return axiosApi.request({
      method: 'delete',
      url: `goods/${id}`
    })
  }
}