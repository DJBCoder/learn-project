const routes = [
    {
      path: '/',
      name: 'Home',
      // @代表src目录
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue')
    }
  ]

  export default routes