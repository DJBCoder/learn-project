const routes = [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/components/Layout'),
      redirect: '/home/'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/Layout'),
      children : [
        {
          path: '/',
          component: () => import('@/views/home'),
          meta: {
            title: '首页'
          }
        }
      ]
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('@/components/Layout'),
      children : [
        {
          path: '/',
          component: () => import('@/views/member'),
          meta: {
            title: '会员管理'
          }
        }
      ]
    },
    {
      path: '/staff',
      name: 'satff',
      component: () => import('@/components/Layout'),
      children : [
        {
          path: '/',
          component: () => import('@/views/staff'),
          meta: {
            title: '员工管理'
          }
        }
      ]
    },
    {
      path: '/goods',
      name: 'goods',
      component: () => import('@/components/Layout'),
      children : [
        {
          path: '/',
          component: () => import('@/views/goods'),
          meta: {
            title: '商品管理'
          }
        }
      ]
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: () => import('@/components/Layout'),
      children : [
        {
          path: '/',
          component: () => import('@/views/supplier'),
          meta: {
            title: '供应商管理'
          }
        }
      ]
    },
]

export default routes