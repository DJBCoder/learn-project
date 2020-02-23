const routes = [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/components/Layout')
    }
]

export default routes