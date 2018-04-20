<template>
    <el-checkbox-group class="ml-10" v-model="roleChecked" @change="change">
        <el-checkbox
            v-for="(r, ky) in role"
            :label="r.id"
            :key="ky">
            {{r.display_name}}
        </el-checkbox>
    </el-checkbox-group>
</template>
<script>
    import { ajax } from 'UTILS/ajax.js'
    export default {
        name: 'selfUserPermission',
        props: {
            route: String,
            // 单个表单域对象
            formItemData: Object
        },
        data () {
            return {
                ids: [],
                role: [],
                roleChecked: []
            }
        },
        mounted () {
            ajax.call(this, 'get', `/api/common/${this.route}/all-role`, data => {
                this.role = data
                this.roleChecked = this.formItemData.value
            })
        },
        methods: {
            change () {
                let arr = []
                this['role'].forEach(v => {
                    this['roleChecked'].includes(v.id) ? arr.push(v.id) : null
                })
                this.formItemData.value = arr
            }
        }
    }
</script>
