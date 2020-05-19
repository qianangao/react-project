import React, { Component } from 'react'
import {Card, Button,Table,Tag,Space} from 'antd'
import moment from 'moment'
import {
    getArticles
} from '../../services'

const titleMap={
    id:'编号',
    title:'标题',
    author:'作者',
    amount:'阅读量',
    createAt:'创建时间'
}

export default class ArticleList extends Component {
    state={
            dataSource: [],
            columns:[],
            total:0,
            isLoading:false
        }

    createColumns = (columnsKeys) => {
        const columns= columnsKeys.map(item => {
            if(item==='amount'){
                return {
                    title: titleMap[item],
                    key: item,
                    render:(record)=>{
                        const {amount}=record
                        return <Tag color={amount>200?'red':'green'}>{amount}</Tag>
                    }
                }
            }
            return {
                title: titleMap[item],
                dataIndex: item,
                key: item
            }
        })
        columns.push({
            title: '操作',
            key: 'action',
            render: () => {
                return (
                    <>
                    <Button type="primary" size="small">编辑</Button>
                    <Button type="danger" size="small">删除</Button>
                    </>
                )
            }
        })
        return columns
    }

    getArticleList=()=>{
        this.setState({
            isLoading:true
        })
        getArticles().then(res => {
            const dataSource = res.data.list
            dataSource.map(item=>{
               item.createAt=moment(item.createAt).format('YYYY-MM-DD HH:mm:ss')   
            })
            const columnsKeys = Object.keys(dataSource[0])
            const columns = this.createColumns(columnsKeys)
            this.setState({
                dataSource,
                columns,
                total: res.data.count
            })

        }).catch(err=>{
            console.log(err);
            
        }).finally(()=>{
            this.setState({isLoading:false})
        })
    }
    componentDidMount() {
        this.getArticleList()
    }
    
    render() {
        return (
            <Card 
            title="文章列表" 
            extra={<Button>导出Excel</Button>}
            bordered={false}
            >
             <Table 
                columns={this.state.columns}
                dataSource={this.state.dataSource}
                loading={this.state.isLoading}
                rowKey={(record)=>record.id}
                pagination={{
                    total:this.state.total,
                    hideOnSinglePage:true
            }}
              />   
            </Card>
        )
    }
}
