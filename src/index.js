import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import App from './app'
import {mainRouter} from './routes'

ReactDOM.render(
    <Router>
    <Switch>
        <Route path="/admin" render={(routeProps)=>{
            //登录权限验证处理
            return <App {...routeProps}/>
        }} />
        {
        mainRouter.map(router=>{
            return <Route key={router.pathname} path={router.pathname} component={router.component}    
        />})
        }
        <Redirect to="/admin" from='/' exact/>
        <Redirect to="/404"/>
    </Switch>
    </Router>
,document.getElementById('root'))