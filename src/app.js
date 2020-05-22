import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    adminRoutes
} from './routes'
import {Frame} from './components'

import './App.less'

const menus = adminRoutes.filter(route => route.isNav === true)

class App extends Component {
    render() {
        return (
            this.props.isLogin?
            <Frame menus={menus}>
                <Switch>
                    {
                        adminRoutes.map(route=>{
                            return <Route key={route.pathname} path={route.pathname} exact={route.exact}
                                render={(routeProps)=>{return <route.component {...routeProps}/>}}
                            />
                        })
                    }
                    <Redirect to={adminRoutes[0].pathname} from='/admin' exact/>
                    <Redirect to="/404"/>
                </Switch>
            </Frame>
            :<Redirect to="/login" />  
        )
    }
}

const mapState=state=>({isLogin:state.user.isLogin})
export default connect(mapState)(App)