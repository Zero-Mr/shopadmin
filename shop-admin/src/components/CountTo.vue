<template>
    {{d.num.toFixed(0)}}
</template>

<script setup>
    import gsap from "gsap";
    import {reactive,watch} from 'vue'
    const d = reactive({
        num:0,
    })
    const props = defineProps({
        value:{
            default:0,
            type:Number,
        }
    })

    const animtoval = ()=>{
        gsap.to(d,{
            duration:0.5,
            num:props.value
        })
    }
    animtoval()
    watch(()=> props.value,()=> animtoval())
</script>