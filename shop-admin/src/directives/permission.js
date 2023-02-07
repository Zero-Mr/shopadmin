
import store  from "~/store"
export default {
    install(app){
        console.log(app)
        app.directive('permissions',{
            mounted(el,binding) {
                haspermissions(binding.value,el)
            },
        }) 
    }
}
// console.log(store.state.roleNames)
const haspermissions = (value,el = false)=>{
    if(!Array.isArray(value)){
        throw new Error('需要数组')
    }
    const hasAuth = value.findIndex( v => store.state.roleNames.includes(v) ) != -1
    if(el&&!hasAuth){
        el.parentNode &&  el.parentNode.removeChild(el)
    }
    return hasAuth
}