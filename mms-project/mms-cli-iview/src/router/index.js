import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由列表对象
import routes from './routes'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // 引入路由列表对象
  routes
})

// 设置路由守卫
router.beforeEach((to, from, next) => {
  // 如果是登陆页面直接跳转
  if (to.path === '/login'){
    next()
    return
  }

  // 获取token的值
  const token = store.state.login.token

  // 如果token为null 直接跳转到登陆界面
  if (!token) {
    next({path: '/login'})
    return
  }

  // 获取用户信息
  const user = store.state.login.user

  // 获取到user直接跳转
  if (user) {
    next()
    return
  }

  // 获取用户信息
  store.dispatch('GetUserInfo').then(response => {
    // 如果获取到
    if (response.flag) {
      next()
    }
    else {
      next({path: '/login'})
    }
  })
})

export default router
