<template>
<!-- https://segmentfault.com/q/1010000008525755 -->
    <div>
        <div>
             <el-input v-model="pObj.value"></el-input>
                <!-- 这个会报错 -->
             <el-input v-model="pdiv"></el-input>
        </div>
    </div>
</template>
<script>
export default {
    name: 'userInfo',
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
