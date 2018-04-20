<template>
    <selfPermissionTree
        :getDataFn="getAllPermissions"
        :currentData="formItemData"
        v-on:permissionData="permissionData">
    </selfPermissionTree>
</template>
<script>
    import { ajax } from 'UTILS/ajax.js'
    import selfPermissionTree from './selfPermissionTree.vue'
    export default {
        name: 'selfRolePermission',
        components: {
            selfPermissionTree
        },
        props: {
            route: String,
            formItemData: Object
        },
        methods: {
            /**
             * [permissionData 保存更新的权限信息]
             * @Author              bwx
             * @DateTime 2017-09-05
             * @param    {[Array]}   data [权限数据]
             */
            permissionData (data) {
                this.formItemData.value = data
            },

            /**
             * [getAllPermissions 获取全部权限]
             * @Author              bwx
             * @DateTime 2017-09-04
             */
            getAllPermissions () {
                return new Promise(resolve => {
                    ajax.call(this, 'get', `/api/common/${this.route}/all-permissions`, data => {
                        resolve(data)
                    })
                })
            }
        }
    }
</script>
