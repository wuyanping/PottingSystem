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
import { mapState } from 'vuex'
import { isObject } from 'UTILS/utils.js'

export default {
    name: 'selfVarietyValue',
    props: {
        route: String,
        formItemData: Object,
        cascadeData: Object
    },
    data () {
        return {
            loading: false,
            list: [] // 下拉数据
        }
    },
    computed: {
        ...mapState(['MONITOR_ALLADAPTER'])
    },
    mounted () {
    },
    methods: {
        selectChange (value) {
            this.$store.dispatch('getChildrenData', {
                vm: this,
                arr: 'MONITOR_ALLADAPTER',
                url: this.$apiUrl(`variety/${value}`),
                cval: value
            }).then(data => {
                // 使用延迟函数解决 第二次打开时，this.loading = false 设置过快失效
                console.log('selectChange data --- ')
                console.log(data)
                console.log(isObject(data))
                if (isObject(data)) {
                    this.formItemData.value = data[this.formItemData.field]
                } else {
                    this.formItemData.value = ''
                }
            })
        }
    },
    watch: {
        'formItemData.value': {
            deep: true,
            handler (nv, v) {
                console.log('formItemData.value ---')
                console.log(nv)
                if (nv.length === 0) return
                if (nv[nv.length - 1].param !== '') {
                    // nv.push({
                    //     param: '',
                    //     value: ''
                    // })
                }
            }
        },
        cascadeData: {
            deep: true,
            handler (nv, v) {
                console.log('cascadeData.value ---')
                console.log(nv)
                if (nv.value) {
                    this.selectChange(nv.value)
                }
            }
        }
    }
}
</script>
