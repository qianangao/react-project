import {
    Login,
    NotFound,
    Settings,
    Dashboard,
    ArticleList,
    ArticleEdit,
    Notification,
    Profile,
    NoAuth
} from '../views'


export const mainRoutes=[
    {
        pathname:'/login',
        component:Login
    },
    {
        pathname:'/404',
        component:NotFound
    }
]

export const adminRoutes=[
    {
        pathname: '/admin/dashboard',
        component: Dashboard,
        title:'Dashboard',
        icon: 'dashboard',
        isNav:true,
        role:['001','002','003']
    }, 
    {
        pathname: '/admin/article',
        component: ArticleList,
        title: '文章编辑',
        icon: 'unordered-list',
        exact:true,
        isNav: true,
        role: ['001', '002']
    },
    {
        pathname: '/admin/article/edit/:id',
        component: ArticleEdit,
        role: ['001', '002']
    },
    {
        pathname: '/admin/notification',
        component: Notification,
        role: ['001','002', '003']
    },
    {
        pathname: '/admin/profile',
        component: Profile,
        role: ['001', '002', '003']
    },
    {
        pathname: '/admin/noauth',
        component: NoAuth,
        role: ['001', '002', '003']
    },
    {
        pathname: '/admin/settings',
        component: Settings,
        title: '设置',
        icon: 'setting',
        isNav: true,
        role: ['001']
    },
]