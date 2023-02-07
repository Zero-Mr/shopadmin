
import {ref,reactive} from 'vue'
import {loginOut,updatepassword} from "~/api/manager.js"
import {showModel,toast} from '~/cpmsposables/utli.js'
import {useRouter} from "vue-router"
import {useStore} from 'vuex'



export const useRepassword = () =>{
    const router = useRouter()
    const store = useStore()
    const form = reactive({
        oldpassword:"admin",
        password:"111",
        repassword:"111"
    })
    const formDrawerRef = ref(null)
    const rules = {
        oldpassword:[
            {required:true,message:"请输入密码",trigger:'blur'},
        ],
        password:[
            {required:true,message:"请输入新密码",trigger:'blur'}
        ],
        repassword:[
            {required:true,message:"请输入确认新密码",trigger:'blur'}
        ]
    }
    const formRef = ref(null)
    const onSubmit = ()=>{
        formRef.value.validate((valid)=>{
            if(!valid){
                return false
            }else{
                formDrawerRef.value.showloading()
                updatepassword(form).then(res =>{
                    console.log(res)
                    toast('修改成功')
                    store.dispatch("logOut")
                    toast("退出登陆成功")
                    router.push("/login")
                }).finally(()=>{
                    formDrawerRef.value.hideloading()
                })
            }
        })
       
    }
    const openRePasswordForm = () =>  formDrawerRef.value.open()
     return {
        form,formDrawerRef,rules,formRef,onSubmit,openRePasswordForm
     }
}

export const useloginOut = ()=>{
    const router = useRouter()
    const store = useStore()
    const hendleLogout = () =>{
        showModel('是否要退出登陆?').then((res)=>{
            console.log("ok")
            loginOut().finally(()=>{
                store.dispatch("logOut")
                toast("退出登陆成功")
                router.push("/login")
            })
        }).catch((err)=>{
            console.log("no")
        })
    }
    return {
        hendleLogout
    }
}
    