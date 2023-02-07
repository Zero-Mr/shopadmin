import axios from "~/axios";

export const Gettatistics1 = ()=>{
    return axios.get('/admin/statistics1')
}
export const Gettatistics2 = ()=>{
    return axios.get('/admin/statistics2')
}
export const Gettatistics3 = (type)=>{
    return axios.get('/admin/statistics3?type='+type)
}