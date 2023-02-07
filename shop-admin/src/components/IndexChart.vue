<template>
    <el-card shadow="never">
        <template #header>
        <div class="flex justify-between">
            <span class="text-sm">订单统计</span>
            <div>
                <el-check-tag 
                v-for="(item,index) in options" 
                :key="index"
                @click="tagclick(item.value)"
                 :checked="current == item.value" style="margin-right: 8px">{{item.text}}</el-check-tag>
            </div>
        </div>
        </template>
        <div ref="el" id="chart" style="width:100%;height:300px">

        </div>
    </el-card>
    
</template>

<script setup>
    import {ref,onMounted,onBeforeMount} from 'vue'
    import * as echarts from 'echarts'
    import {Gettatistics3} from '~/api/index'
    import {useResizeObserver} from '@vueuse/core'
    var myChart = null 
    const current = ref('week')

    
    onMounted(()=>{
        var chartDom = document.querySelector('#chart') 
        if(myChart){
            myChart = echarts.init(chartDom)
            initData()
        }
   
    

    })

    let option;

    option = {
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
        }
        }
    ]
    };

    const initChart =  (x,y) =>{
       
        option.xAxis.data = x
        option.series[0].data = y
        option && myChart.setOption(option);
    }

    const initData = async () =>{
        myChart.showLoading()
        let {x,y} = await Gettatistics3(current.value)
        initChart(x,y)
        myChart.hideLoading()
   
    }
   

    const options = [
        {text:"近1个月",value:"month"},
        {text:"近1周",value:"week"},
        {text:"24小时",value:"hour"},
    ]
    const tagclick = (val) =>{
        current.value = val
        initData()
    }

    onBeforeMount(()=>{
        if(myChart) echarts.dispose(myChart)
    })

    const el = ref('')
    useResizeObserver(el,(entries)=>{
        if(myChart){
          myChart.resize()

        }
    })

</script>