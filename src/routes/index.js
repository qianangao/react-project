import {
    Login,
    NotFound,
    Settings,
    Dashboard,
    ArticleList,
    ArticleEdit
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
        icon: 'dashboard-outlined',
        isNav:true
    }, 
    {
        pathname: '/admin/article',
        component: ArticleList,
        title: '文章编辑',
        icon: 'unordered-list-outlined',
        exact:true,
        isNav: true
    },
    {
        pathname: '/admin/article/edit/:id',
        component: ArticleEdit
    },
    {
        pathname: '/admin/settings',
        component: Settings,
        title: '设置',
        icon: 'setting-outlined',
        isNav: true
    },
]