import React, { Component } from 'react'
import {Layout,Menu,Breadcrumb,Icon} from 'antd'
import {withRouter} from 'react-router-dom'
import logo from './logo.png'
import './frame.less'
const {SubMenu}=Menu
const {Header,Content,Sider}=Layout

@withRouter
class Frame extends Component {
    handleMenu=({key})=>{
        this.props.history.push(key)  
    }
    render() {
        console.log(this.props);
        
        return (
            <Layout style={{minHeight:'100%'}}>
    <Header className="header">
      <div className="logo" >
          <img src={logo} alt="logo"/>
      </div>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[this.props.location.pathname]}
          style={{ height: '100%', borderRight: 0 }}
        >
        {
            this.props.menus.map(route => {
                        return(
                <Menu.Item 
                key={route.pathname}
                 icon={<route.icon/>}
                 onClick={this.handleMenu}>
                {route.title}</Menu.Item>
            )
            })
        }
            
        </Menu>
      </Sider>
      <Layout style={{ padding: '16px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
        )
    }
}

export default Frame