import axios from 'axios'
import { toast } from '~/cpmsposables/utli'
import { getToken } from "~/cpmsposables/auth"
import store from './store'
const service = axios.create({
    baseURL:"/api"
})

service.interceptors.request.use((config)=>{
    const token =  getToken()
    if(token){
        config.headers['token'] = token
    }
    return config
},(error)=>{
    return Promise.reject(error)
})


service.interceptors.response.use((response)=>{
    return response.data.data
},(error)=>{
    const msg = error.response.data.msg || '请求失败'
    if(msg == '非法token，请先登录！'){
        store.dispatch('logOut').finally(()=>{
            location.reload()
        })
    }
    toast(msg,'error')
 
    return Promise.reject(error)
})

export default service