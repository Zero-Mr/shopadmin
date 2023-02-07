<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex justify-between">
                        <span class="text-sm"> {{props.title}}</span>
                        <el-tag class="ml-2" effect="plain" type="danger">{{props.tip}}</el-tag>

            </div>
        </template>
        <el-row :gutter="20">
            <el-col :span="6" :offset="0" v-for="(item,index) in props.btns" :key="index">
                <el-card shadow="hover" class="border-0 bg-light-400">
                    <div class="flex flex-col items-center justify-center">
                        <span class="text-xl mb-2">{{item.value}}</span>
                        <span class="text-xs text-gray-500">{{item.label}}</span>
                    </div>
                </el-card>
                
            </el-col>
        </el-row>
        
    </el-card>
    
</template>

<script setup>
    const props = defineProps({
        title:{
            default:"",
            type:String
        },
        tip:{
            default:"",
            type:String
        },
        btns:{
            type:Array,
            default:[]
        }
    })
</script>