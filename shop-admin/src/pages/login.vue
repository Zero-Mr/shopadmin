<template>
    <el-row class="login-containar">
        <el-col :lg="16" :md="12" class="left-wrapbox">
            <div>
                <div class="left-title">
                    欢迎使用
                </div>
                <div class="left-text">
                    兴一科技商城后台管理系统 请与管理员获取账号
                </div>
            </div>

        </el-col>
        <el-col :lg="8" :md="12" class="right-wrapbox">
            <h2 class="right-title">欢迎回来</h2>
            <div class="right-text">
                <span class="right-line"></span>
                <span>账号密码登录</span>
                <span class="right-line"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon><UserFilled /></el-icon>
                        </template>
                    </el-input>

                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码"  show-password @keyup.enter.native="onSubmit">
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round color="#626aef" :loading="loading" class="w-[250px]" type="primary" @click="onSubmit" >登录 </el-button>
                    
                </el-form-item>
         
          
         
       
              
        
            </el-form>
        </el-col>
    </el-row>

</template>

<script  setup>
import { reactive,ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRouter }  from "vue-router"
import { toast } from '~/cpmsposables/utli'
import {useStore} from 'vuex'
const router = useRouter()
const loading = ref(false)
const store = useStore()
const rules = {
    username:[
        {required:true,message:"请输入用户名",trigger:'blur'},
    ],
    password:[
        {required:true,message:"请输入密码",trigger:'blur'}
    ]
}
const formRef = ref(null)

// do not use same name with ref
const form = reactive({
    username:"admin",
    password:"admin"
 
})

const onSubmit = () => {
    console.log('submit!')
    formRef.value.validate((valid)=>{
        if(!valid){
            return false
        }else{
            loading.value = true
            store.dispatch("login",form).then((res)=>{
                console.log(res)
                toast('登陆成功')
                router.push('/')
            }).finally(()=>{
                loading.value = false
            })
         
        }
    })
}
</script>
<style>
    .right-line{
        @apply h-[1px] w-16 bg-gray-200;
    }
    .right-text{
        @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
    }
    .right-title{
        @apply font-bold text-3xl text-gray-800;
    }
    .right-wrapbox{
        @apply bg-light-50 flex items-center justify-center flex-col;
    }
    .left-text{
        @apply text-gray-200 text-xs;
    }
    .left-title{
        @apply font-bold text-5xl text-light-50 mb-4;
    }
    .left-wrapbox{
        @apply flex items-center justify-center;
    }
    .login-containar{
        @apply min-h-screen bg-indigo-500 ;
    }
</style>