import { createStore } from "vuex";
import { login,getInfo } from '~/api/manager.js'
import { setToken,removeToken } from "~/cpmsposables/auth"




const store =  createStore({
    state (){
        return {
            user:{

            },
            asideWidth:"250px",
            menus:[],
            roleNames:[]
        }
    },
    mutations:{
        SetUserInfo(state,user){
            state.user = user
        },
        handleAsideWidth(state){
            state.asideWidth = state.asideWidth == '250px' ? '64px' : '250px'
        },
        set_menus(state,menus){
            state.menus = menus
        },
        set_roleNames(state,data){
            state.roleNames = data
        }
    },
    actions:{
        login({commit},{username,password}){
            return new Promise((resolve,reject)=>{
                login(username,password).then((res)=>{
                    setToken(res.token)
                    resolve(res)
                }).catch(err => reject(err))
              
            })
        },
        getInfo({commit}){
            return new Promise((resolve,reject)=>{
                getInfo().then((res)=>{
                    commit('SetUserInfo',res)
                    commit('set_menus',res.menus)
                    commit('set_roleNames',res.ruleNames)
                    resolve(res) 
                }).catch(err => reject(err))
            })
          
        },
        logOut({commit}){
            removeToken()
            commit('SetUserInfo',{})
        }
    }
})

export default store