<template>
    <el-dialog class="power-dialog" :visible="visible" :close-on-click-modal="false" :show-close="false">
        <div slot="title" class="clearfix p-10">
            <h1 class="dialogs-title pull-left">{{powerData.title}}权限管理</h1>
            <i class="dialogs-close el-icon-close pull-right" @click="close" />
        </div>
        <selfPermissionTree
            :getDataFn="getAllPermissions"
            :currentData="powerData"
            :visible="visible"
            v-on:permissionData="permissionData"
        />
        <div slot="footer" class="dialog-opt">
            <commonElButton
                :params="saveSetting"
                v-on:save="save"
            />
        </div>
    </el-dialog>
</template>
<script>
    import commonElButton from 'COMPONENTS/public/commonElButton.vue'
    import selfPermissionTree from './selfPermissionTree.vue'

    import { ajax } from 'UTILS/ajax.js'

    export default {
        name: 'powerDialog',
        components: {
            commonElButton,
            selfPermissionTree
        },
        data () {
            return {
                visible: false,
                powerData: {},
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
            close () {
                this.visible = false
                this.powerData = {}
            },
            save () {
                let params = {}
                params[this.powerData.field] = this.powerData.value
                ajax.call(this, 'put', `/api/common/company/${this.powerData.id}/permissions`, params, data => {
                    if (data.res === 'true') {
                        this.$mg(this, '保存成功', 'success', 1000)
                        this.close()
                    } else {
                        this.$mg(this, '保存失败', 'error', 1000)
                    }
                })
            },
            permissionData (data) {
                this.powerData.value = data
            },
            /**
             * [getAllPermissions 获取全部权限]
             * @Author              bwx
             * @DateTime 2017-09-04
             */
            getAllPermissions () {
                return new Promise(resolve => {
                    this.$store.dispatch('getStaticObjectData', {
                        vm: this,
                        obj: 'OPERATION_AllPERMISSION',
                        url: '/api/common/company/all-permissions'
                    }).then(data => {
                        resolve(data)
                    })
                })
            }
        }
    }
</script>
