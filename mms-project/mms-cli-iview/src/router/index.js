import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由列表对象
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // 引入路由列表对象
  routes
})

export default router
