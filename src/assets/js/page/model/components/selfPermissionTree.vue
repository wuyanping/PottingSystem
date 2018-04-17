<template>
    <el-tree
        class="mb-10"
        ref="tree"
        node-key="id"
        :data="power"
        :props="defaultProps"
        :default-checked-keys="currentData.value"
        show-checkbox
        empty-text="暂无分配权限"
        v-loading.body="loading"
        @check-change="checkChange">
    </el-tree>
</template>
<script>
    import { isObject } from 'UTILS/utils.js'
    export default {
        name: 'permissionTree',
        props: {
            getDataFn: Function,
            currentData: Object,
            visible: Boolean
        },
        data () {
            return {
                power: [],
                ids: [], // 保存选中权限时需要用到
                defaultProps: { // element-ui的节点对象的某个属性值
                    children: 'children',
                    label: 'display_name'
                },
                loading: true
            }
        },
        /** [mounted 触发初始获取数据] */
        mounted () {
            this.loading = true
            this.getDataFn().then(data => {
                this.loading = false
                this.ids = []
                this.power = []
                this.power = this.feach(data)
            })
        },
        methods: {
            /**
             * [feach 根据后台返回的数据进行递归(重写)]
             * @Author              bwx
             * @DateTime 2018-02-10
             * @param    {[Array]}   subCategories [权限的数组]
             */
            feach (subCategories) {
                let arr = []
                subCategories.forEach(v => {
                    if (!v.permissions && !v.subCategories) return
                    if (v.permissions.length === 0 && v.subCategories.length === 0) return
                    let obj = {
                        id: `m-${v.id}`,
                        display_name: v.display_name,
                        children: []
                    }
                    if (isObject(v.subCategories)) {
                        let arr = []
                        Object.keys(v.subCategories).forEach(cate => {
                            arr.push(v.subCategories[cate])
                        })
                        v.subCategories = arr
                    }
                    if (v.subCategories.length > 0) {
                        // 下级菜单
                        obj['children'] = obj['children'].concat(this.feach(v.subCategories))
                    }
                    if (v.permissions.length > 0) {
                        // let permissions = {
                        //  display_name: '当前菜单权限',
                        //  children: []
                        // }
                        // v.permissions.forEach(p => {
                        //  permissions['children'].push({
                        //      id: p.id,
                        //      display_name: p.display_name
                        //  })
                        // })
                        // obj['children'].push(permissions)
                        v.permissions.forEach(p => {
                            obj['children'].push({
                                id: p.id,
                                display_name: p.display_name
                            })
                        })
                    }
                    arr.push(obj)
                })
                return arr
            },
            /**
             * [checkChange tree节点改变时]
             * @Author   szh
             * @DateTime 2018-02-11
             */
            checkChange (data, checked, indeterminate) {
                if (!data['children']) {
                    if (checked) {
                        this.ids.push(data.id)
                    } else {
                        this.ids.splice(
                            this.ids.findIndex(id => id === data.id),
                            1
                        )
                    }
                    this.$emit('permissionData', this.ids)
                }
            }
        },
        watch: {
            visible (nv) {
                if (nv === true) {
                    this.loading = true
                    this.ids = []
                    this.power = []
                    this.getDataFn().then(data => {
                        this.loading = false
                        this.$refs.tree.setCheckedKeys(this.currentData.value)
                        this.power = this.feach(data)
                    })
                }
            }
        }
    }
</script>
