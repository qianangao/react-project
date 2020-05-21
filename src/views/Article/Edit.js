import {Card,Button,Form} from 'antd'
import React, { Component } from 'react'

export default class Edit extends Component {
    quitHandle=()=>{
        this.props.history.goBack()
        // this.props.history.go(-1)    
    }
    render() {
        return (
            <Card title="文章列表" extra={<Button onClick={this.quitHandle}>取消</Button>}>
            
            </Card>
        )
    }
}
