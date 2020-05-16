import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import {
    adminRouter
} from './routes'

export default  class App extends Component {
    render() {
        return (
            <div>
                公共部分
                <Switch>
                    {
                        adminRouter.map(route=>{
                            return <Route key={route.pathname} path={route.pathname} exact={route.exact}
                                render={(routeProps)=>{return <route.component {...routeProps}/>}}
                            />
                        })
                    }
                    <Redirect to={adminRouter[0].pathname} from='/admin' exact/>
                    <Redirect to="/404"/>
                </Switch>
            </div>
        )
    }
}

