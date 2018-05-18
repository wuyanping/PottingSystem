<template>
    <div>
        <el-select
            :placeholder="'请选择适配器'"
            v-model="formItemData.value"
            v-loading="loading"
            clearable
            :filterable="formItemData.filterable ? formItemData.filterable : false"
            :allow-create="formItemData.allowCreate ? formItemData.allowCreate : false"
            @change="selectChange">
            <el-option
                v-for="(item, ki) in list"
                :label="item.name"
                :value="item.id"
                :key="ki">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name: 'selfVarietySelect',
        props: {
            route: String,
            formItemData: Object
        },
        data () {
            return {
                loading: false,
                list: [] // 下拉数据
            }
        },
        mounted () {
            this.getSelectsDatas()
        },
        methods: {
            getSelectsDatas () {
                this.loading = true
                this.$store.dispatch('getStaticData', {
                    vm: this,
                    arr: 'MONITOR_ALLADAPTER',
                    url: this.$apiUrl('variety')
                }).then(data => {
                    // 使用延迟函数解决 第二次打开时，this.loading = false 设置过快失效
                    setTimeout(() => {
                        this.loading = false
                        this.list = data.data
                    }, 0)
                })
            },
            selectChange (value) {
                this.$store.dispatch('getChildrenData', {
                    vm: this,
                    arr: 'MONITOR_ALLADAPTER',
                    url: this.$apiUrl(`variety/${value}`),
                    cval: value
                })
            }
        }
    }
</script>
