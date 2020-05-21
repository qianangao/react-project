import React from 'react'
import ReactDOM from 'react-dom'
import {
    ConfigProvider
} from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from './app'
import { mainRoutes } from './routes'
import './index.less'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route path="/admin" render={(routeProps) => {
                        //登录权限验证处理
                        return (
                            <App {...routeProps} />
                        )
                    }} />
                    {
                        mainRoutes.map(router => {
                            return <Route key={router.pathname} path={router.pathname} component={router.component}
                            />
                        })
                    }
                    <Redirect to="/admin" from='/' exact />
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </ConfigProvider>
    </Provider>
    , document.getElementById('root'))