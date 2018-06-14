<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane :label="tab.label" :name="tab.name" v-for="tab in tabs" :key="tab.name">
                </el-tab-pane>
        </el-tabs>
        <div>
            <el-form class="components-form" label-width="100px" :model="formData[`${activeName}FormData`]" :ref="`${activeName}FormData`">
                <commonFormItem
                    :commonFormData="formData[`${activeName}FormData`]"
                    :route="route"
                />
            </el-form>
            <div slot="footer" class="txt-c">
                <commonElButton
                    :params="saveSetting"
                    v-on:save="validateFn"
                />
            </div>
        </div>
    </div>
</template>
<script>
import commonFormItem from 'COMPONENTS/public/commonFormItem.vue'
import commonElButton from 'COMPONENTS/public/commonElButton.vue'
import userInfo from '../userInfo.js'
import { isFunction, serializeData } from 'UTILS/utils.js'
import { index, update } from 'UTILS/commonApi.js'
import { ajax } from 'UTILS/ajax.js'
export default {
    name: 'userInfo',
    components: {
        commonFormItem,
        commonElButton
    },
    data () {
        // let obj = Object.assign({}, userInfo)
        return {
            formData: {
                userFormData: {},
                pwdFormData: {}
            },
            saveSetting: {
                type: 'primary',
                loading: false,
                disabled: false,
                className: 'btn white',
                display_name: '保存',
                clickFn: (vm) => {
                    vm.$emit('save')
                }
            },
            route: 'sysman',
            activeName: 'user',
            tabs: [
                {
                    label: '用户信息',
                    name: 'user'
                },
                {
                    label: '密码修改',
                    name: 'pwd'
                }
            ]
        }
    },
    mounted () {
        this.initFormData()
    },
    methods: {
        initFormData () {
            this.formData.userFormData = this.setFormData('user', window.bdUser)
            this.formData.pwdFormData = this.setFormData('pwd')
        },
        // 验证表单
        validateFn () {
            this.$refs[`${this.activeName}FormData`].validate((valid) => {
                if (valid) {
                    this.saveSetting.loading = true
                    this.editSave(this.formData[`${this.activeName}FormData`])
                } else {
                    return false
                }
            })
        },
        // 编辑保存
        editSave (formData) {
            let params = {
                _type: 'edit',
                ...serializeData(formData.formField)
            }
            if (this.activeName === 'user') {
                update(this, this.route, window.bdUser.id, params)
                    .then(data => {
                        this.$mg(this, '保存成功', 'success', 2000)
                        this.saveSetting.loading = false
                    })
            } else {
                ajax.call(this, 'put', `/sysman/${window.bdUser.id}/updatepass`, params)
                    .then(data => {
                        if (data.data.state === 500) {
                            this.$mg(this, data.data.tip, 'error', 1000)
                        }
                        if (data.data.state === 200) {
                            this.$mg(this, data.data.tip, 'success', 2000)
                        }
                        this.saveSetting.loading = false
                    })
                    .catch(e => {
                        this.saveSetting.loading = false
                    })
            }
        },
        // 设置表单对话框数据
        setFormData (key, row = {}) {
            let data = {
                id: window.bdUser.id,
                _type: 'edit',
                formField: userInfo[key].commonFormFieldsFn()
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
