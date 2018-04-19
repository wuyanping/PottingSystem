<template>
    <el-dialog class="components-dialogs" :visible="commonFormVisible" v-loading.body="commonFormLoading" :close-on-click-modal="false" :title="commonFormData.title" @close="close">
        <!-- <div slot="title" class="clearfix p-10"> -->
            <!-- <h1 class="dialogs-title fl">{{commonFormData.title}}</h1> -->
            <!-- <i class="dialogs-close el-icon-close fr" @click="close" /> -->
        <!-- </div> -->
        <el-form class="components-form" label-width="100px" :model="commonFormData" ref="formDialogData">
            <commonFormItem
                :commonFormData="commonFormData"
                :route="route"
            />
        </el-form>
        <div slot="footer" class="dialog-footer">
            <commonElButton
                :params="saveSetting"
                v-on:save="save"
            />
            <commonElButton
                :params="resetSetting"
                v-on:reset="reset"
            />
        </div>
    </el-dialog>
</template>
<script>
    import commonFormItem from './commonFormItem.vue'
    import commonElButton from './commonElButton.vue'
    export default {
        name: 'commonFormDialog',
        props: {
            commonFormVisible: Boolean,
            commonFormData: Object,
            commonFormLoading: {
                type: Boolean,
                default: false
            },
            // 用于check验证路径
            route: String
        },
        components: {
            commonFormItem,
            commonElButton
        },
        data () {
            return {
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
                resetSetting: {
                    type: 'primary',
                    loading: false,
                    disabled: false,
                    className: 'btn mr-20',
                    display_name: '重置',
                    clickFn: (vm) => {
                        vm.$emit('reset')
                    }
                }
            }
        },
        methods: {
            close () {
                this.$emit('closeDialog', 'form')
            },
            save () {
                this.$refs['formDialogData'].validate((valid) => {
                    if (valid) {
                        this.saveSetting.loading = true
                        this.$emit('save', this.commonFormData)
                    } else {
                        return false
                    }
                })
            },
            reset () {
                this.$refs['formDialogData'].resetFields()
            }
        }
    }
</script>

<style lang="sass">
.components-dialogs{
    .el-dialog{
        min-width: 500px;
    }

    .components-form{
        max-height: 500px;
        overflow: auto;
    }

    // .el-dialog{
    //     margin-top: 0!important;
    // }
}
</style>
