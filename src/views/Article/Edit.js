import {Card,Button,Form,Input,DatePicker,message,Spin} from 'antd'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import E from 'wangeditor'
import './edit.less'
import {
    getArticleById,
    saveArticleById
} from '../../services'

class Edit extends Component {
    
    constructor(){
        super()
        this.formRef = React.createRef()
        this.editorRef=React.createRef()
        this.state={
            isLoading:false
        }
    }
    
    initEditor=()=>{
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange=html=>{
            this.formRef.current.setFieldsValue({
                content:html
            })    
        }

        this.editor.create()
    }

    componentDidMount() {
        this.initEditor()
        this.setState({
            isLoading:true
        })
        getArticleById(this.props.match.params.id).then(res=>{
            const {id,...data}=res.data
            data.createAt=moment(data.createAt)
            this.formRef.current.setFieldsValue(data)
            this.editor.txt.html(data.content)
            
        }).finally(()=>{
            this.setState({
                isLoading: false
            })
        })
        
    }
    
    onFinish=values=>{
        const {createAt,...data}=values
        data.createAt=moment(createAt).valueOf()
        this.setState({
            isLoading: true
        })
        saveArticleById(this.props.match.params.id,data).then(res => {
            message.success(res.data.msg);   
        }).finally(()=>{
            this.setState({
                isLoading: false
            })
        })
        this.props.history.push('/admin/article')
    }
    render() {
        const layout = {
            labelCol: {
                span: 2
            },
            wrapperCol: {
                span: 16
            }
        }

        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16
            }
        }
        return (
            <Card title="文章列表" extra={<Button onClick={this.props.history.goBack}>取消</Button>}>
            <Spin spinning={this.state.isLoading}>
            <Form 
                {...layout}
                ref={this.formRef}
                name="control-ref"
                onFinish={this.onFinish}>
            <Form.Item 
                name="title"
                label = "标题"
                rules={[{
                    required:true,
                    message:'标题是必需的'
                }]}>
                <Input placeholder="标题"/>   
            </Form.Item>
            <Form.Item 
                name="author"
                label = "作者"
                rules={[{
                    required:true,
                    message:'作者是必需的'
                }]}>
                <Input placeholder="admin"/>   
            </Form.Item>
            <Form.Item 
                name="amount"
                label = "阅读量"
                rules={[{
                    required:true,
                    message: '阅读量是必需的'
                }]}>
                <Input placeholder="阅读量"/>   
            </Form.Item>
            <Form.Item 
                name="createAt"
                label = "创建时间"
                rules={[{
                    required:true,
                    message: '创建时间是必需的'
                }]}>
                <DatePicker 
                    format="YYYY_MM_DD HH:mm:ss"
                    showTime={{defaultValue:moment('00:00:00','HH:mm:ss')}}></DatePicker> 
            </Form.Item>
            <Form.Item 
                name="content"
                label = "内容"
                rules={[{
                    
                }]}>
                <div ref={this.editorRef} className="editor"></div>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">保存修改</Button>
            </Form.Item>
            </Form>
            </Spin>
            </Card>
        )
    }
}

export default connect()(Edit)
