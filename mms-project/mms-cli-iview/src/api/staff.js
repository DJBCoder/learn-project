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
    }
}