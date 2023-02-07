<template>
    <div class="f-menu">
        <el-menu
        class="border-0"
        @select="handleselect"
        :collapse="iscollapes"
        :unique-opened="true"
        :collapse-transition="false"
        :default-active="defaultActive"
        :style="{width:$store.state.asideWidth}"
      >


        <template v-for="(item,index) in asideMenus" :key="index">
            <el-sub-menu :index="item.name" v-if="item.child && item.child.length > 0">
                <template #title>
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item 
                    v-for="(item2,index2) in item.child" 
                    :index="item2.frontpath">
                    <el-icon>
                        <component :is="item2.icon"></component>
                    </el-icon>
                    <span>{{item2.name}}</span>
                    
                </el-menu-item>
            </el-sub-menu>

            <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{item.name}}</span>
            </el-menu-item>
        </template>

      
    
      </el-menu>
    </div>
</template>
<script setup>
import {useRouter,useRoute} from 'vue-router'

import {computed,ref} from 'vue'
import {useStore} from 'vuex'
const store = useStore()
const iscollapes = computed(()=> !(store.state.asideWidth == '250px'))
const router = useRouter()
const route = useRoute()

const defaultActive = ref(route.path)

const asideMenus = computed(() => store.state.menus)

const handleselect = (val)=>{
    console.log(val)
    router.push(val)
}
</script>
<style>
    .f-menu{
        top: 64px;
        transition: all 0.2s;
        bottom: 0;
        left: 0;
        overflow-y: auto;
        overflow-x: hidden;
        @apply shadow-md fixed bg-light-50;
        
    }
    .f-menu::-webkit-scrollbar{
        width: 0px;
    }
</style>