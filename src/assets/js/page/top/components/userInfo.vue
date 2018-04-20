<template>
    <div>
        userinfo
        <el-form class="components-form" label-width="100px" :model="formData" ref="formData">
            <commonFormItem
                :commonFormData="formData"
            />
        </el-form>
        <div slot="footer" class="txt-c">
            <commonElButton
                :params="saveSetting"
                v-on:save="save"
            />
        </div>
    </div>
</template>
<script>
import commonFormItem from 'COMPONENTS/public/commonFormItem.vue'
import commonElButton from 'COMPONENTS/public/commonElButton.vue'
import userInfo from '../userInfo.js'
export default {
    name: 'userInfo',
    components: {
        commonFormItem,
        commonElButton
    },
    data () {
        let obj = Object.assign({}, userInfo)
        return {
            formData: obj,
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
    methods: {
        save () {
            this.$refs['formData'].validate((valid) => {
                if (valid) {
                    this.saveSetting.loading = true
                    console.log(this.formData)
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style lang="sass">
</style>
