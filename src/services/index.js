import axios from 'axios'
import {message} from 'antd'
const isDev=process.env.NODE_ENV==='development'

const service=axios.create({
     baseURL: isDev?'http://rap2.taobao.org:38080/app/mock/254580/':'',
     method:'post'
 })

 service.interceptors.request.use(config=>{
     config.headers['token']='asafasdgfsd'
     return config
 },error=>{
    message.error(error)
     
 })

 service.interceptors.response.use(response=>{
    const res=response.data
    if(res.code===200){
        return res
    }else{
       message.error('error')
        
    }
 })

 //获取文章
 export const getArticles=(offset=0,limited=10)=>{
     return service.post('/api/v1/article',
         {
             offset,
             limited
         }
     )
 }

 //删除文章
 export const deleteArticleById=(id)=>{
     return service.post(`/api/v1/articleDelete/${id}`)
 }

 //获取文章阅读量
 export const getArticleAmount=()=>{
     return service.post('/api/v1/articleAmount')
 }

 //获取通知中心消息
 export const getNotifications=()=>{
     return service.post('/api/v1/notification')
 }