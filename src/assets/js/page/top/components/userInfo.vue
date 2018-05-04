<template>
    <div>
        <el-form class="components-form" label-width="100px" :model="formData" ref="formData">
            <commonFormItem
                :commonFormData="formData"
            />
        </el-form>
        <div slot="footer" class="txt-c">
            <commonElButton
                :params="saveSetting"
                v-on:save="validateFn"
            />
        </div>
    </div>
</template>
<script>
import commonFormItem from 'COMPONENTS/public/commonFormItem.vue'
import commonElButton from 'COMPONENTS/public/commonElButton.vue'
import userInfo from '../userInfo.js'
import { isFunction, serializeData } from 'UTILS/utils.js'
import { index, update } from 'UTILS/commonApi.js'
export default {
    name: 'userInfo',
    components: {
        commonFormItem,
        commonElButton
    },
    data () {
        // let obj = Object.assign({}, userInfo)
        return {
            formData: {},
            saveSetting: {
                type: 'primary',
                loading: false,
                disabled: false,
                className: 'btn white',
                display_name: '保存',
                clickFn: (vm) => {
                    vm.$emit('save')
                }
            }
        }
    },
    mounted () {
        console.log('userInfo.vue mounted ------ ')
        this.formData = this.setFormData(window.bdUser)
        console.log(this.formData)
    },
    methods: {
        // 验证表单
        validateFn () {
            this.$refs['formData'].validate((valid) => {
                if (valid) {
                    this.saveSetting.loading = true
                    console.log(this.formData)
                    this.editSave(this.formData)
                } else {
                    return false
                }
            })
        },
        // 编辑保存
        editSave (formData) {
            console.log(formData)
            let params = {
                _type: 'edit',
                ...serializeData(formData.formField)
            }
            console.log('--------')
            console.log(params)
            console.log('--------')
            update(this, 'sysman', window.bdUser.id, params)
                .then(data => {
                    console.log(data)
                    this.$mg(this, '保存成功', 'success', 2000)
                    this.saveSetting.loading = false
                })
        },
        // 设置表单对话框数据
        setFormData (row = {}) {
            let data = {
                formField: userInfo.commonFormFieldsFn()
            }
            data['formField'].forEach(item => {
                // 在打开对话框同时赋值
                if (Object.keys(row).includes(item['field'])) {
                    if (item.customEditFn) {
                        item['value'] = item.customEditFn(row[item['field']])
                    } else {
                        item['value'] = row[item['field']]
                    }
                }
            })
            return data
        },
        // 表格列特殊值处理
        tableFieldFn: function (data) {
            const g = function (gender) {
                return gender === 1 ? '女' : '男'
            }
            if (isArray(data)) {
                data.forEach(v => {
                    v.gender = g(v.gender)
                })
            }
            if (isObject(data)) {
                data.gender = g(data.gender)
            }
            return data
        }
    }
}
</script>
<style lang="sass">
</style>
