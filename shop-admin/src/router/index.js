import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import Index from '~/pages/index.vue';
import NotFound from '~/pages/404.vue';
import Login from '~/pages/login.vue';
import goodList from '~/pages/goods/list.vue';
import categorylist from '~/pages/category/list.vue';
import adminLayout from "../layout/admin.vue"




const routes = [
    {path:'/',
     component:adminLayout,
     name:"admin",
     children:[
             {
            path:'/',
            name:'/',
            // component:()=> require(``),
            component:Index,
            meta:{
                title:'主控台'
            }
        }
     ]
    
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: '/Login', name: 'Login', component: Login , meta:{
        title:"登陆页"
     }},
]





export const router = createRouter({
    history:createWebHashHistory(),
    routes
})


export function addRoutes(menus){
    // 是否有新的路由
    let hasNewRoutes = false
  
    const findAndAddRoutesByMenus = (arr) =>{
        arr.forEach(e=>{
       
            if(e.frontpath && e.frontpath.indexOf('/') != -1 && e.frontpath != '/'){
                  let obj = {
                    path:e.frontpath,
                    name:e.frontpath,
                    component: () => import(`~/pages/${e.frontpath.split('/')[1]}/${e.frontpath.split('/')[2]}.vue`),
                    meta:{
                        title:e.name
                    }
                }
                router.addRoute("admin",obj)
                hasNewRoutes = true
             
            }
            if(e.child && e.child.length > 0){
                findAndAddRoutesByMenus(e.child)
            }
        })
    }

    findAndAddRoutesByMenus(menus)

    return hasNewRoutes
}