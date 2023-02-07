<template>
    <div class="f-tag-list" :style="{ left:$store.state.asideWidth }">

        <el-tabs 
        v-model="activeTab" 
        type="card" 
        class="flex-1"  
        @tab-remove="removeTab" 
        style="min-width:100px;"
        @tab-change="changeTab"
        >
            <el-tab-pane v-for="item in tabList" :closable="item.path != '/'" :key="item.path" :label="item.title" :name="item.path"></el-tab-pane>
        </el-tabs>

        <span class="tag-btn">
            <el-dropdown @command="handlecommand">
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="closeother">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="closeall">关闭全部</el-dropdown-item>
                  
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>

    </div>
    <div style="height: 44px;">

    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute,onBeforeRouteUpdate,useRouter } from 'vue-router';
import { useCookies } from "@vueuse/integrations/useCookies"
const route = useRoute()
const router = useRouter()
const activeTab = ref(route.path)
const cookies = useCookies()

const tabList = ref([
    
    {
        title:'后台首页',
        path:"/"
    }
    
   
])

let cookitTab = cookies.get('tabList')
if(cookitTab){
    tabList.value = cookitTab
}


const removeTab = (targetName) => {
    let a = activeTab.value
    let tabs = tabList.value
    if(a == targetName){
        tabs.forEach((tab,index)=>{
            if(tab.path == targetName){
              const nextTab = tabs[index+1] || tabs[index-1]
              if(nextTab){
                a = nextTab.path
              }
            }
        })
    }
    activeTab.value = a
    tabList.value = tabList.value.filter( tab => tab.path != targetName  )
    cookies.set('tabList',tabList.value)
}
const addTag = (data)=>{
   let noTab =  tabList.value.findIndex(t => t.path == data.path) == -1
    if(noTab){
        tabList.value.push(data)
    }
    cookies.set('tabList',tabList.value)
}

onBeforeRouteUpdate((to,from)=>{
    activeTab.value = to.path
    addTag({
        title:to.meta.title,
        path:to.path
    })
})

const changeTab = (data) =>{
    activeTab.value = data
    router.push(data)
}

const handlecommand = (val)=>{
    switch (val) {
        case 'closeother':
            console.log('closeother')
            tabList.value = tabList.value.filter(tab => tab.path == '/' || tab.path == activeTab.value )
            break;
        case 'closeall':
                activeTab.value = '/'
                tabList.value =[
                    {
                        title:'后台首页',
                        path:"/"
                    }
                ]
                console.log('closdsadaseall')
            break;
    
        default:
            console.log('default')
            break;
    }
    cookies.set('tabList',tabList.value)
}

</script>
<style scoped>
.f-tag-list{
    @apply fixed bg-gray-100 flex items-center px-2;
    top: 64px;
    right: 0;
    height: 44px;
    z-index: 100;
}
.tag-btn{
    @apply bg-white rounded ml-auto flex items-center justify-center px-2;
    height: 32px;
}
:deep(.el-tabs__header){
    @apply mb-0 border-0;
}
:deep(.el-tabs__nav){
    border: 0!important;
    margin-top: 3px;
}
:deep(.el-tabs__item){
    border: 0!important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}
:deep(.el-tabs__nav-next),:deep(.el-tabs__nav-prev){
    line-height: 32px;
    height: 32px;
}
:deep(.is-disabled){
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>