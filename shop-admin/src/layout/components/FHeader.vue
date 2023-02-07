<template>
    <div class="f-header">
      
        <span class="logo">  
            <el-icon class="mr-1"><ElementPlus /></el-icon>
            商城管理
        </span>
        <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
            <Fold v-if="$store.state.asideWidth == '250px'"/>
            <Expand v-else/>
        </el-icon>
        <el-tooltip
            effect="dark"
            content="刷新"
            placement="bottom"
        >
            <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
        </el-tooltip>
       
        <div class="ml-auto flex items-center justify-center">
            <el-tooltip
                    effect="dark"
                    content="全屏"
                    placement="bottom"
                    v-if="!isFullscreen"
                >
                <el-icon class="icon-btn" @click="toggle"><FullScreen /></el-icon>
            </el-tooltip>
            <el-tooltip
                    effect="dark"
                    content="退出全屏"
                    placement="bottom"
                    v-if="isFullscreen"
                >
                <el-icon class="icon-btn" @click="toggle"><Aim /></el-icon>
            </el-tooltip>
           
            <el-dropdown class="dropdown" @command="handlecommand">
                <span class="flex items-center text-light-50">
                <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                {{$store.state.user.username}}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="changepwd">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
                
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

  <form-drawer 
    ref="formDrawerRef" 
    :title="'修改密码'"
    :destroyOnClose="true"
    @submit="onSubmit"
    >
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
                <el-form-item prop="oldpassword" label="旧密码">
                    <el-input v-model="form.oldpassword" placeholder="请输入密码">
                
                    </el-input>

                </el-form-item>
                <el-form-item prop="password" label="新密码">
                    <el-input v-model="form.password" placeholder="请输入新密码"  show-password @keyup.enter.native="onSubmit">
                 
                    </el-input>
                </el-form-item>
                <el-form-item prop="repassword" label="确认密码">
                    <el-input v-model="form.repassword" placeholder="请确认新密码"  show-password @keyup.enter.native="onSubmit">
                 
                    </el-input>
                </el-form-item>
            </el-form>
  </form-drawer>

</template>


<script setup>

import {useFullscreen} from '@vueuse/core'
import {useRepassword,useloginOut} from '~/cpmsposables/useManager'
import FormDrawer from '~/components/FormDrawer.vue'
import { Expand } from '@element-plus/icons-vue';

const { isFullscreen,toggle } = useFullscreen()
const {  form,formDrawerRef,rules,formRef,onSubmit,openRePasswordForm} = useRepassword()
const { hendleLogout } = useloginOut()

const handleRefresh = ()=>{
    location.reload()
}


const handlecommand = (val)=>{
    switch (val) {
        case 'changepwd':
            // drawer.value = true
            openRePasswordForm()
            break;
        case 'logout':
             hendleLogout()
            break;
    
        default:
            break;
    }
}

















</script>

<style>
.f-header {
    z-index: 999;
}
.f-header .dropdown{
    @apply h-[64px] flex justify-center items-center mx-5;
    cursor:pointer;
}
.icon-btn{
    @apply flex justify-center items-center w-[42px] h-[64px];
    cursor:pointer;
}
.icon-btn:hover{
    @apply bg-indigo-600
}
.logo{
    @apply w-[250px] flex justify-center items-center text-xl;
}
    .f-header{
        @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
        height:64px;
    }
</style>