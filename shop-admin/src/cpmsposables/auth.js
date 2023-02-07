import { useCookies } from "@vueuse/integrations/useCookies"
const cookies = useCookies()
const TokenKey = 'admin-token'

export const getToken = ()=>{
    return cookies.get(TokenKey)
} 
export const removeToken = ()=>{
    return cookies.remove(TokenKey)
} 
export const setToken = (token)=>{
    return cookies.set(TokenKey,token)
} 