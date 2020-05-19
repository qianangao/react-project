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
    console.log(res);
    
    if(res.code===200){
        return res
    }else{
       message.error('error')
        
    }
 })

 export const getArticles=()=>{
     return service({
         url: '/api/v1/article'
     })
 }