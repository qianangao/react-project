import Loadable from 'react-loadable'
import {Loading} from '../components'

const Login=Loadable({
   loader:()=>import('./Login'),
   loading:Loading
})
const NotFound = Loadable({
   loader: () => import('./NotFound'),
   loading: Loading
})
const Settings = Loadable({
   loader: () => import('./Settings'),
   loading: Loading
})
const Dashboard = Loadable({
   loader: () => import('./Dashboard'),
   loading: Loading
})
const ArticleList = Loadable({
   loader: () => import('./Article'),
   loading: Loading
})
const ArticleEdit = Loadable({
   loader: () => import('./Article/Edit'),
   loading: Loading
})
const Notification = Loadable({
   loader: () => import('./Notification'),
   loading: Loading
})
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'
// import Dashboard from './Dashboard'
// import ArticleList from './Article'
// import ArticleEdit from './Article/Edit'

export {
   Login,
   NotFound,
   Settings,
   Dashboard,
   ArticleList,
   ArticleEdit,
   Notification
}