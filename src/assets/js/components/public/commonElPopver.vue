<template>
    <el-popover trigger="hover" placement="right">
        <!-- 放大图片 -->
        <!-- <img style="width:400px; height:auto" v-if="row[field]" :src="row[field] ? $apiUrl(row[field]) : ''" > -->
        <!-- <div slot="reference" class="name-wrapper imgTip"> -->
            <!-- 小图片 -->
            <!-- <img v-if="row[field]" :src="row[field] ? $apiUrl(row[field]) : ''" width="100%" height="100%"> -->
        <!-- </div> -->
        <!-- 放大图片 -->
        <img style="width:400px; height:auto" v-if="row[field]" :src="row[field]" >
        <div slot="reference" class="name-wrapper imgTip">
            <!-- 小图片 -->
            <img v-if="row[field]" :src="row[field]" width="100%" height="100%">
        </div>
    </el-popover>
</template>
<script>
    export default {
        props: {
            row: Object,
            field: String,
            params: Object
        },
        methods: {
        }
    }
</script>
