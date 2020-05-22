import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon,Dropdown,Avatar,Badge } from 'antd'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {
  getReceivedNotification,
} from '../../actions/notifications.js'
import {
  logout
} from '../../actions/user.js'
import logo from './logo.png'
import './frame.less'
const {SubMenu}=Menu
const { Header, Content, Sider } = Layout

const mapState=state=>{
  return {
    list:state.notification.list,
    displayName:state.user.displayName,
    avatar:state.user.avatar
  }
}

class Frame extends Component {

  handleMenu = ({ key }) => {
    this.props.history.push(key)
  }
  handleSubMenu = ({key}) => {
         if(key==='/logout'){
           this.props.logout()
         }else{
            this.props.history.push(key)
         }
          
  }
  render() {
    console.log(this.props);
    
    const data=this.props.list
    const selectedKeyArr = this.props.location.pathname.split('/')
    selectedKeyArr.length = 3
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Header className="header">
          <div className="logo" >
            <img src={logo} alt="logo" />
          </div>
          <Menu style={{backgroundColor:' rgb(215, 198, 238)'}}>
            <SubMenu
            onClick={this.handleSubMenu} 
            title={<span>
              <Avatar src={this.props.avatar} />
              <Badge count={data.filter(item=>item.hasRead===false).length} offset={[10,20]}><span>欢迎您!{this.props.displayName}</span></Badge>
            </span>}>
              <Menu.Item key="/admin/settings">个人设置</Menu.Item>
            <Menu.Item key="/admin/notification"><Badge dot={data.find(item=>item.hasRead===false)}>通知中心</Badge></Menu.Item>
            <Menu.Item key="/logout">退出登录</Menu.Item>
            </SubMenu>
          </Menu>
        </Header> 
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={[selectedKeyArr.join('/')]}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                this.props.menus.map(route => {
                  return (
                    <Menu.Item
                      key={route.pathname}
                      onClick={this.handleMenu}>
                      {/* <Icon type={route.icon}/> */}
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

export default connect(mapState, {
  getReceivedNotification,logout
})(withRouter(Frame))
