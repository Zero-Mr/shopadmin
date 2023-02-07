import axios from "~/axios";

export const login = (username,password)=>{
        return axios.post('/admin/login',{
              username,password
         })
}

export const getInfo = ()=>{
    return axios.post('/admin/getinfo')
}

export const loginOut = ()=>{
    return axios.post('/admin/logout')
}
export const updatepassword = (data)=>{
    return axios.post('/admin/updatepassword',data)
}