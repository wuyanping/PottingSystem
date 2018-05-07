<template>
    <el-input
        :class="className"
        :placeholder="`搜索${placeholder}`"
        v-model.trim="params.value"
        @keyup.enter.native="handleSearch">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
    </el-input>
</template>
<script>
    export default {
        props: {
            params: {
                type: Object,
                default () {
                    return {
                        field: 'cstatus',
                        value: undefined,
                        placeholder: '',
                        className: 'mr-10'
                    }
                }
            }
        },
        computed: {
            field () {
                if (this.params.field) {
                    return this.params.field
                } else {
                    return 'cstatus'
                }
            },
            placeholder () {
                if (this.params.placeholder) {
                    return this.params.placeholder
                } else {
                    return ''
                }
            },
            className () {
                if (this.params.className) {
                    return this.params.className
                } else {
                    return ''
                }
            }
        },
        methods: {
            // handleSearch ({ field, value }) {
            //     this.$emit('selectChange', { [field]: value })
            // }
            handleSearch () {
                console.log(this.params.field, this.params.value)
                this.$emit('selectChange', { [this.params.field]: this.params.value })
            }
        }
    }
</script>
