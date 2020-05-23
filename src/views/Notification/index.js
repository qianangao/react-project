import React, { Component } from 'react'
import { Card, List, Button, Avatar,Badge,Spin } from 'antd'
import {connect} from 'react-redux'
import {
    getMarkNotificationAsReadById,
    getMarkNotificationAsRead,
    getReceivedNotification
} from '../../actions/notifications'

const mapState=state=>{
    return {
        list: state.notification.list,
        isLoading:state.notification.isLoading
    }
}

class Notification extends Component {
    componentDidMount(){
        this.props.getReceivedNotification()
    }
    render() {
        const data = this.props.list
        return (
            <Spin spinning={this.props.isLoading}>
            <Card title="通知中心"
                extra={<Button disabled={data.every(item=>item.hasRead===true)} onClick={this.props.getMarkNotificationAsRead}>全部标记为已读</Button>}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item extra={!item.hasRead?<Button onClick={this.props.getMarkNotificationAsReadById.bind(this,item.id)}>标记为已读</Button>:null}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                />
           </Card>
           </Spin>
        )
    }
}

export default connect(mapState, {
    getMarkNotificationAsReadById,
    getMarkNotificationAsRead,
    getReceivedNotification
})(Notification)
