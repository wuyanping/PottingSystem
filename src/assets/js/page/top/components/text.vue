<template>
<!-- https://segmentfault.com/q/1010000008525755 -->
    <div>
        <div>
             <el-input v-model="pObj.value"></el-input>
                <!-- 这个会报错 -->
             <el-input v-model="pdiv"></el-input>
             <MyText2 :pObj="pObj" :pdiv="pdiv"></MyText2>
        </div>
    </div>
</template>
<script>
import MyText2 from './text2.vue'
export default {
    name: 'userInfo',
    components: {
        MyText2
    },
    props: {
        pObj: {
            type: Object,
            default () {
                return {
                    value: 'pobj'
                }
            }
        },
        pdiv: {
            type: String,
            default: 'div'
        }
    },
    data () {
        return {
            div: 'div'
        }
    },
    methods: {
        handleChange () {
            console.log(this.pObj.value)
        }
    }
}
</script>
