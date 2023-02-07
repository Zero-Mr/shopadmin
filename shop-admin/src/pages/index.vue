<template>
    <div>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0" v-for="(item,index) in panelsdata" :key="index" v-permissions="['getStatistics1,GET']">
               
                <el-card shadow="hover" class="border-0">
                    <template #header>
                    <div class="flex justify-between">
                        <span class="text-sm"> {{item.title}}</span>
                        <el-tag class="ml-2" effect="plain" :type="item.unitColor">{{item.unit}}</el-tag>

                    </div>
                    </template>
                    <span class="text-3xl font-bold text-gray-500">
                        <!-- {{item.value}} -->
                        <count-to :value="item.value"/>
                    </span>
                    <el-divider />
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>{{item.subTitle}}</span>
                        <span>{{item.subValue}}</span>
                    </div>
                </el-card>
                
            </el-col>
          </el-row>
          <IndexNavs />
         <el-row :gutter="20" class="mt-5">
            <el-col :span="12" :offset="0">
                <IndexChart v-permissions="['getStatistics3,GET']"/>
            </el-col>
            <el-col :span="12" :offset="0">
                <IndexCard v-permissions="['getStatistics2,GET']" class="mb-4" title="店铺及商品提示" tip="店铺及商品提示" :btns="goodsdata"/>
                <IndexCard v-permissions="['getStatistics2,GET']" title="交易提示" tip="需要立即处理的订单" :btns="orderdata"/>
            </el-col>
         </el-row>
         
          
    </div>
</template>

<script setup>
import {Gettatistics1,Gettatistics2} from '~/api/index'
import {ref} from 'vue'
import CountTo from '~/components/CountTo.vue'
import IndexNavs from '~/components/IndexNavs.vue'
import IndexChart from '~/components/IndexChart.vue'
import IndexCard from '~/components/IndexCard.vue'
let panelsdata = ref([])

const getInfo = async ()=>{
    let {panels} = await Gettatistics1() 
    panelsdata.value = panels
}
getInfo()

const goodsdata = ref([])
const orderdata = ref([])
const getInfo2 = async ()=>{
    let {goods,order} = await Gettatistics2() 
    goodsdata.value = goods
    orderdata.value = order
}
getInfo2()



// console.log(panels)
// panelsdata.value = panels
// console.log(panelsdata.value)
</script>