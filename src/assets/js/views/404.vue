/**
 * 
 * 404组件
 * @description 访问不存在的路由都会定向到这个组件页面
 * @author 吴燕萍
 * @date 2018/04/17
 */
<template>
    <div class="notfound w100 h100 relative">
        <div class="center txt-c">
            <p class="fz-24">你所浏览的页面不存在</p>
            <el-button type="text" class="mt-10" @click="goBack">返回首页</el-button>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'notfound',
        methods: {
            goBack () {
                if (window.isPC) {
                    this.$router.push('/index')
                } else {
                    this.$router.push('/index/myPotting')
                }
            }
        }
    }
</script>
