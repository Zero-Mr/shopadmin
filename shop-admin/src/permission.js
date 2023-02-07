import {router,addRoutes} from '~/router'
import { getToken,setToken } from "~/cpmsposables/auth"
import { toast,showFullLoading,hideFullLoading } from '~/cpmsposables/utli'
import store from './store'


let hasGetInfo = false
router.beforeEach(async (to,from,next)=>{
    showFullLoading()
    const token = getToken()
    if(!token && to.path != '/login'){
        toast('请登陆','error')
        return next({path:"/login"})
    }
    if(token && to.path == '/login'){
        toast('请勿重复登陆','error')
        return next({path:from.path ? from.path : "/" })
    }
    let hasNewRoutes = false
    if(token  && !hasGetInfo){
       let {menus} = await store.dispatch('getInfo')
       hasGetInfo = true
       hasNewRoutes = addRoutes(menus)
    }
    let title = (to.meta.title ? to.meta.title :"") + " - 兴一科技商城管理系统"
    document.title = title
    hasNewRoutes ?  next(to.fullPath) : next()
})

router.afterEach((to,from) =>{
    hideFullLoading()
})
