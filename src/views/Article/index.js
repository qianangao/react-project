import React, { Component } from 'react'
import {Card, Button,Table,Tag,Space,Tooltip,Modal,Typography,message} from 'antd'
import moment from 'moment'
import XLSX from 'xlsx'
import {
    getArticles,
    deleteArticleById
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
            isLoading:false,
            offset:0,
            limited:10,
            modelVisible: false,
            modelLoading:false,
            modalTitle:null,
            articleId:null
        }

    createColumns = (columnsKeys) => {
        const columns= columnsKeys.map(item => {
            if(item==='amount'){
                return {
                    title: titleMap[item],
                    key: item,
                    render:(record)=>{
                        const {amount}=record
                        return (
                        <Tooltip title={amount>200?'200以上':'不足200'}>
                             <Tag color={amount>200?'red':'green'}>{amount}</Tag>
                        </Tooltip>)
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
            render: (text,record) => {
                return (
                    <>
                    <Button type="primary" size="small" onClick={this.editHandle.bind(this,record.id)}>编辑</Button>
                    <Button type="danger" size="small" onClick={this.deleteHandle.bind(this,record)}>删除</Button>
                    </>
                )
            }
        })
        return columns
    }
    editHandle=(id)=>{
        this.props.history.push(`/admin/article/edit/${id}`)
    }
    deleteHandle=(record)=>{
        console.log(record);
        
       this.setState({
           modelVisible:true,
           modalTitle:record.title,
           articleId:record.id
       })  
    }

    handleOk=()=>{
       this.setState({
           modelLoading:true
       })
        deleteArticleById(this.state.articleId).then(res => {
            message.success(res.data.msg)
            this.getArticleList()

        }).finally(()=>{
            this.setState({
                modelLoading: false,
                modelVisible:false
            })
        })
    }

    handleCancel=()=>{
        this.setState({
            modelVisible:false
        })
        
    }

    getArticleList=()=>{
        this.setState({
            isLoading:true
        })
        getArticles(this.state.offset,this.state.limited).then(res => {
            const dataSource = res.data.list
            dataSource.map(item=>{
               item.createAt=moment(item.createAt).format('YYYY年MM月DD日 HH:mm:ss')   
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

    onPageChange=(page,pageSize)=>{
        this.setState({
            offset:pageSize*(page-1),
            limited:pageSize
        },()=>{
            this.getArticleList()   
        })    
    }

    onPageSizechange=(current,size)=>{
        this.setState({
            offset:0,
            limited:size
        },()=>{
            this.getArticleList()
        })
        
    }
    
    exportExcel=()=>{
        /* convert state to workbook */
        const data=[Object.keys(this.state.dataSource[0])]
        
        // const datas=Object.values(this.state.dataSource)
        // console.log(datas);
        for (let i = 0; i < this.state.dataSource.length;i++){
            // data.push(Object.values(this.state.dataSource[i]))
            data.push([
                this.state.dataSource[i].id,
                this.state.dataSource[i].title,
                this.state.dataSource[i].author,
                this.state.dataSource[i].amount,
                moment(this.state.dataSource[i].createAt).format('YYYY_MM_DD HH:mm:ss')
            ])
        }
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, `articles_${this.state.offset/this.state.limited+1}_${moment().format('YYYY_MM_DD HH:mm:ss')}.xlsx`)
        
    }
    render() {
        return (
            <Card 
            title="文章列表" 
            extra={<Button onClick={this.exportExcel}>导出Excel</Button>}
            bordered={false}
            >
             <Table 
                columns={this.state.columns}
                dataSource={this.state.dataSource}
                loading={this.state.isLoading}
                rowKey={(record)=>record.id}
                pagination={{
                    total:this.state.total,
                    pageSize:this.state.limited,
                    showQuickJumper:true,
                    showSizeChanger:true,
                    current:this.state.offset/this.state.limited+1,
                    hideOnSinglePage:true,
                    onChange:this.onPageChange,
                    onShowSizeChange: this.onPageSizechange,
                    pageSizeOptions:['10','15','20','30']
            }}
              />  
               <Modal 
                    visible={this.state.modelVisible}
                    confirmLoading={this.state.modelLoading}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <Typography>确定删除<span style={{fontWeight:"bold"}}>{this.state.modalTitle}</span>吗?</Typography>
                    </Modal> 
            </Card>
        )
    }
}
