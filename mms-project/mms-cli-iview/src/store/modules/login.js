import {getStorageToken, getStorageUser, setStorageToken, setStorageUser, removeStorage} from '@/lib/utils'
import { login , logout, getUserInfo} from '@/api/login'

const state = {
    // token
    token : getStorageToken(),
    // 用户信息
    user : getStorageUser()
}

const mutations = {
    // 设置token
    SET_TOKEN (state, token) {
        state.token = token
        setStorageToken(token)
    },
    // 设置用户
    SET_USER (state, user) {
        state.user = user
        setStorageUser(user)
    }
}

const actions = {
    // 登陆系统
    Login ({commit}, username, password) {
        return new Promise((reslove, reject) => {
            login(username, password).then(response => {
                const loginRes = response.data
                commit('SET_TOKEN', loginRes.data.token)
                reslove(loginRes)
            }).catch(error => {
                reject(error)
            })
        })
        
    },

    // 登出系统
    Logout ({commit, state}){
        return new Promise((resolve, reject) => {
            // 发送登出系统的请求
            logout (state.token).then(response => {
                const logoutRes = response.data
                if (logoutRes.flag) {
                    commit('SET_TOKEN', null)
                    commit('SET_USER', null)
                    removeStorage()
                }
                resolve(logoutRes)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    GetUserInfo ({commit, state}) {
        return new Promise( (resolve, reject) => {
            // 发送请求
            getUserInfo(state.token).then(response => {
                const userRes = response.data
                commit('SET_USER', userRes.data)
                resolve(userRes)
            }).catch(error => {
                reject(error)
            })
        })
    }
} 

export default {
    state,
    mutations,
    actions
}

