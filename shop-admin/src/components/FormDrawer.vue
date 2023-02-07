<template>
       <el-drawer 
    v-model="drawer" 
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
    >
    <div class="formDrawer">
        <div class="body">
            <slot></slot>
        </div>
        <div class="action">
            <el-button :loading="loading" type="primary" @click="submit" >{{confirmText}} </el-button>
            <el-button  type="default" @click="close" >取消 </el-button>
        </div>
    </div>
  </el-drawer>
</template>

<script setup>
    import {ref} from 'vue'
    const drawer = ref(false)
    const loading = ref(false)

    const showloading = () => loading.value = true
    const hideloading = () => loading.value = false
    const open = () => drawer.value = true
    const close = () => drawer.value = false
    const prosp = defineProps({
        title:String,
        size:{
            type:String,
            default:"45%"
        },
        destroyOnClose:{
            type:Boolean,
            default:false
        },
        destroyOnClose:{
            type:Boolean,
            default:false
        },
        confirmText:{
            type:String,
            default:'提交'
        }
    })
    defineExpose({
        open,close,showloading,hideloading
    })

    const emit =  defineEmits(['submit'])
    const submit = ()=>{
        emit('submit')
    }
</script>

<style lang="less">
    .formDrawer{
        width: 100%;
        height: 100%;
        position: relative;
        @apply  flex flex-col;
        .body{
            flex:1;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 50px;
            overflow-y: auto;
        }
        .action{
            height: 50px;
            @apply mt-auto flex items-center;
        }
    }
</style>