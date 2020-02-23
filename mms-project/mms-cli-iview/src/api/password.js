import axiosApi from '@/api'

export const checkPassword = (userid, pwd) => {
    return axiosApi.request({
        method: 'post',
        url: '/user/pwd',
        data: {
            userid,
            pwd
        }
    })
}

export const changePwd = (userid, pwd) => {
    return axiosApi.request({
        method: 'put',
        url: '/user/pwd',
        data : {
            userid,
            pwd
        }
    })
}