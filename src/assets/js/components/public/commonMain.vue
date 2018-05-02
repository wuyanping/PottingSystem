<template>
    <!-- 
    标题                 返回（其他按钮）
    次级标题

    详细情况 （部分）

    tabs（部分）

    条件筛选

    表格

    分页
     -->
    <div class="common-main">
        <!-- 标题上方插口 -->
        <!-- <slot name="common-title-before" /> -->

        <!-- 自定义标题 -->
        <div class="common-title clearfix">
            <div class="fl">
                <h1 class="common-title-h1">{{commonTitle}}</h1>
            </div>
            <el-button class="fr" v-if="hasTitleBack" type="text" @click="handleTitleBack">返回上级</el-button>
        </div>

        <!-- tabs上方插口 -->
        <!-- <slot name="common-tabs-before" /> -->
        <component
            v-if="model.commonTabsBefore"
            :ref="model.commonTabsBefore.ref"
            :is="model.commonTabsBefore.component"
            :params="model.commonTabsBefore.props"
            :route="route"
        />

        <!-- 切换栏 -->
        <el-tabs class="common-tabs" v-if="hasTabs" :type="commonTabs.type" v-model="tabsActive" @tab-click="handleTabsClick">
            <el-tab-pane
                v-for="tab in commonTabs.lists"
                :label="tab.display_name"
                :name="tab.name"
                :disabled="tab.disabled"
                :key="tab.name"
            />
        </el-tabs>

        <!-- 条件筛选上方插口 -->
        <!-- <slot name="common-condition-before" /> -->

        <!-- 条件筛选 -->
        <div class="common-condition clearfix">
            <!-- 默认搜索 -->
            <div class="fl" v-if="hasConditionSearch">
                <el-input
                    :placeholder="`搜索${defaultConditionSearchPlaceholder}`"
                    v-model.trim="conditionSearch"
                    @keyup.enter="handleConditionSearch">
                    <el-button slot="append" icon="el-icon-search" @click="handleConditionSearch"></el-button>
                </el-input>
                <!-- 自定义筛选条件 -->
                <component
                    v-for="(conditionItem, idx) in commonConditionComponents"
                    :is="conditionItem.component"
                    :params="conditionItem.props"
                    :key="`conditionItem-${idx}`"
                    v-on:selectChange="handleFilter"
                />
                <commonElSelect
                    ref="cstatusSelect"
                    v-if="hasConditionStatusSelect"
                    v-on:selectChange="handleFilter"
                />
            </div>
            
            <div class="fr ml-10">
                <!-- 自定义操作按钮 -->
                <component
                    class="mr-10"
                    v-for="(operationItem, idx) in commonOperationComponents"
                    :is="operationItem.component"
                    :params="operationItem.props"
                    :key="`operationItem-${idx}`"
                    v-on:customEv="emitOperationBtn"
                />
                <!-- 新增按钮 -->
                <commonElButton
                    v-if="hasConditionAdd"
                    v-on:add="add"
                />
                <!-- 刷新按钮 -->
                <commonElButton
                    v-if="hasConditionRefresh"
                    :params="conditionRefreshSetting"
                    v-on:refresh="refresh"
                />
            </div>
        </div>

        <!-- 主体表格上方插口 -->
        <!-- <slot name="common-table-before" /> -->

        <!-- 主体表格 -->
        <!-- <div class="common-table mt-10">
            <el-table
                v-loading.body="tableLoading"
                :data="tableData"
                @sort-change="handleTableSort"
                @selection-change="handleTableSelection"
                style="width: 100%">
                <el-table-column
                    v-if="hasTableSelection"
                    align="center"
                    :resizable="false"
                    type="selection">
                </el-table-column>
                <el-table-column
                    v-if="hasTableIndex"
                    align="center"
                    :resizable="false"
                    type="index"
                    label="序号"
                    width="70">
                </el-table-column>
                <el-table-column
                    v-for="(tf, ky) in commonTableField"
                    align="center"
                    :resizable="false"
                    :label="tf.label"
                    :prop="tf.field"
                    :sortable="tf.sortable"
                    :width="tf.width"
                    :key="ky">
                    <template slot-scope="scope">
                        <component
                            v-if="tf.component"
                            :is="tf.component"
                            :row="scope.row"
                            :field="tf.field"
                            :params="tf.props"
                            :ky="ky"
                            v-on:status="emitTableStatus"
                        />
                        <div v-else>
                            {{scope.row[tf.field]}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="hasTableOperation"
                    label="操作"
                    :resizable="false"
                    align="center">
                    <template slot-scope="scope">
                        表格编辑
                        <commonElButton
                            v-if="hasTableOperationEdit"
                            :params="tableEditSetting"
                            :scope="scope"
                            v-on:edit="tableEdit"
                        />
                        表格删除
                        <commonElButton
                            v-if="hasTableOperationDelete"
                            :params="tableDeleteSetting"
                            :scope="scope"
                            v-on:delete="tableDelete"
                        />
                        自定义表格操作按钮
                        <component
                            v-for="(tableOperationItem, idx) in commonTableOperationComponents"
                            :is="tableOperationItem.component"
                            :params="tableOperationItem.props"
                            :scope="scope"
                            :key="`tableOperationItem-${idx}`"
                            v-on:customEv="emitOperationBtn"
                        />
                    </template>
                </el-table-column>
            </el-table>
        </div> -->
        <!-- 独立出主体表格组件 -->
        <div class="common-table mt-10">
            <commonTable
                v-loading.body="tableLoading"
                :hasTableSelection="hasTableSelection"
                :hasTableIndex="hasTableIndex"
                :hasTableOperation="hasTableOperation"
                :hasTableOperationEdit="hasTableOperationEdit"
                :hasTableOperationDelete="hasTableOperationDelete"
                :tableData="tableData"
                :commonTableField="commonTableField"
                :commonTableOperationComponents="commonTableOperationComponents"
                v-on:handleTableSort="handleTableSort"
                v-on:handleTableSelection="handleTableSelection"
                v-on:emitTableStatus="emitTableStatus"
                v-on:tableEdit="tableEdit"
                v-on:tableDelete="tableDelete"
                v-on:emitOperationBtn="emitOperationBtn"
            />
        </div>

        <!-- 主体分页上方插口 -->
        <!-- <slot name="common-pagination-before" /> -->

        <!-- 主体分页 -->
        <div class="common-pagination mt-10 clearfix">
            <div class="fl">
                <!-- 分页批量删除按钮 -->
                <commonElButton
                    v-if="hasPaginationBatchDestroy"
                    :params="paginationBatchDestroySetting"
                    v-on:batchDestroy="batchDestroy"
                />
                <!-- 自定义分页批量删除按钮 -->
                <component
                    v-for="(paginationOperationItem, idx) in commonPaginationOperationComponents"
                    :is="paginationOperationItem.component"
                    :params="paginationOperationItem.props"
                    :key="`paginationOperationItem-${idx}`"
                    v-on:customEv="emitOperationBtn"
                />
            </div>
            <el-pagination
                :class="commonPaginationSetting.className"
                :layout="commonPaginationSetting.layout"
                @current-change="handlePaginationCurrent"
                :current-page="paginationTablePager['current_page']"
                :page-size="paginationTablePager['per_page']"
                :total="paginationTablePager['total']">
            </el-pagination>
        </div>

        <!-- 表单对话框 -->
        <commonFormDialog
            ref="commonFormDialog"
            :commonFormVisible="formVisible"
            :commonFormData="formData"
            :commonFormLoading="formLoading"
            :route="route"
            v-on:save="emitDialogSave"
            v-on:closeDialog="emitCloseDialog"
        />
        <!-- 删除对话框 -->
        <commonDeleteDialog
            :commonDeleteVisible="deleteVisible"
            :commonDeleteData="deleteData"
            v-on:destroy="emitDialogDestroy"
            v-on:closeDialog="emitCloseDialog"
        />
        <!-- 自定义对话框 -->
        <!-- <slot name="common-custom-dialog" /> -->
        <component
            v-if="model.commonCustomDialog"
            :ref="model.commonCustomDialog.ref"
            :is="model.commonCustomDialog.component"
            :params="model.commonCustomDialog.props"
            :route="route"
            v-on:refresh="refresh"
        />
    </div>
</template>
<script>
    import { isFunction, serializeData } from 'UTILS/utils.js'
    import { index, show, store, edit, update, destroy, batchDestroy, status } from 'UTILS/commonApi.js'

    // import ajax from '../../utils/commonApi.js'

    import commonElSelect from './commonElSelect.vue'
    import commonElButton from './commonElButton.vue'
    import commonFormDialog from './commonFormDialog.vue'
    import commonDeleteDialog from './commonDeleteDialog.vue'
    import commonTable from './commonTable.vue'

    export default {
        components: {
            commonElSelect,
            commonElButton,
            commonFormDialog,
            commonDeleteDialog,
            commonTable
        },
        props: {
            model: Object,
            route: String
        },
        computed: {
            hasTitleBack () {
                if (this.model.hasTitleBack) {
                    return this.model.hasTitleBack
                } else {
                    return false
                }
            },
            hasTabs () {
                if (this.model.hasTabs) {
                    return this.model.hasTabs
                } else {
                    return false
                }
            },
            hasConditionStatusSelect () {
                if (this.model.hasConditionStatusSelect) {
                    return this.model.hasConditionStatusSelect
                } else {
                    return false
                }
            },
            hasConditionSearch () {
                if (this.model.hasConditionSearch) {
                    return this.model.hasConditionSearch
                } else {
                    return false
                }
            },
            hasConditionAdd () {
                if (this.model.hasConditionAdd) {
                    return this.model.hasConditionAdd
                } else {
                    return false
                }
            },
            hasConditionRefresh () {
                if (this.model.hasConditionRefresh) {
                    return this.model.hasConditionRefresh
                } else {
                    return false
                }
            },
            hasTableSelection () {
                if (this.model.hasTableSelection) {
                    return this.model.hasTableSelection
                } else {
                    return false
                }
            },
            hasTableIndex () {
                if (this.model.hasTableIndex) {
                    return this.model.hasTableIndex
                } else {
                    return false
                }
            },
            hasTableOperation () {
                if (this.model.hasTableOperation) {
                    return this.model.hasTableOperation
                } else {
                    return false
                }
            },
            hasTableOperationEdit () {
                if (this.model.hasTableOperationEdit) {
                    return this.model.hasTableOperationEdit
                } else {
                    return false
                }
            },
            hasTableOperationDelete () {
                if (this.model.hasTableOperationDelete) {
                    return this.model.hasTableOperationDelete
                } else {
                    return false
                }
            },
            hasPaginationBatchDestroy () {
                if (this.model.hasPaginationBatchDestroy) {
                    return this.model.hasPaginationBatchDestroy
                } else {
                    return false
                }
            },
            defaultConditionSearchPlaceholder () {
                if (this.model.defaultConditionSearchPlaceholder) {
                    return this.model.defaultConditionSearchPlaceholder
                } else {
                    return ''
                }
            },
            commonTitle () {
                return this.model.commonTitle
            },
            commonTabs () {
                if (this.model.commonTabs) {
                    return this.model.commonTabs
                } else {
                    return {
                        type: '',
                        lists: []
                    }
                }
            },
            commonConditionComponents () {
                if (this.model.commonConditionComponents) {
                    return this.model.commonConditionComponents
                } else {
                    return []
                }
            },
            commonOperationComponents () {
                if (this.model.commonOperationComponents) {
                    return this.model.commonOperationComponents
                } else {
                    return []
                }
            },
            commonTableField () {
                return this.model.commonTableField
            },
            commonTableOperationComponents () {
                if (this.model.commonTableOperationComponents) {
                    return this.model.commonTableOperationComponents
                } else {
                    return []
                }
            },
            commonPaginationOperationComponents () {
                if (this.model.commonPaginationOperationComponents) {
                    return this.model.commonPaginationOperationComponents
                } else {
                    return []
                }
            },
            commonPaginationSetting () {
                if (this.model.commonPaginationSetting) {
                    return {
                        className: `fr ${this.model.commonPaginationSetting.className}`,
                        layout: this.model.commonPaginationSetting.layout
                    }
                } else {
                    return {
                        className: 'pull-right',
                        layout: 'total, prev, pager, next, jumper'
                    }
                }
            }
        },
        data: function () {
            return {
                tabsActive: '',

                conditionSearch: '',
                conditionRefreshSetting: {
                    type: 'primary',
                    loading: false,
                    disabled: false,
                    className: 'icon icon-refresh refresh_rotate',
                    display_name: '重置',
                    clickFn: (vm, scope) => {
                        vm.$emit('refresh', {type: 'refresh', ...scope})
                    }
                },

                // 表格
                tableLoading: false,
                tableData: [],
                tableEditSetting: {
                    type: 'text',
                    loading: false,
                    disabled: false,
                    className: '',
                    display_name: '编辑',
                    clickFn: (vm, scope) => {
                        vm.$emit('edit', {type: 'edit', ...scope})
                    }
                },
                tableDeleteSetting: {
                    type: 'text',
                    loading: false,
                    disabled: false,
                    className: '',
                    display_name: '删除',
                    clickFn: (vm, scope) => {
                        vm.$emit('delete', {type: 'delete', ...scope})
                    }
                },
                tableSelection: [],

                paginationBatchDestroySetting: {
                    type: 'primary',
                    loading: false,
                    disabled: false,
                    className: '',
                    display_name: '删除',
                    clickFn: (vm, scope) => {
                        vm.$emit('batchDestroy', {type: 'batchDestroy', ...scope})
                    }
                },
                // 分页数据
                paginationTablePager: {
                    current_page: 1,
                    from: 0,
                    last_page: 0,
                    per_page: 0,
                    to: 0,
                    total: 0,
                    next_page_url: '',
                    prev_page_url: ''
                },

                filter: {},

                deleteVisible: false,
                deleteData: {},

                // 新增表单对话框
                formVisible: false,
                formData: {},
                formLoading: false
            }
        },
        mounted () {
            if (this.hasTabs) {
                this.tabsActive = this.$route.query.current ? this.$route.query.current : this.$route.params.model
            }
            // 避免了在与自定义的commonMain组件切换时出现/api/common的请求
            console.log(22222)
            console.log(this.route)
            console.log(this.route && this.route !== '')
            if (this.route && this.route !== '') {
                console.log(222222)
                this.ajaxIndex(this.route)
            }
        },
        methods: {
            handleTitleBack () {
                let path = this.$route.path
                let idx = path.indexOf(this.$route.params.id)
                this.$router.push(path.substr(0, idx))
            },
            handleTabsClick (tab) {
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        current: tab.name
                    }
                })
                this.$emit('toggleTabsPanel', tab.name)
            },
            handleConditionSearch (e) {
                this.handleFilter({ query_text: this.conditionSearch })
            },
            handleTableSort (sort) {
                if (sort.order === null) return
                let order = ''
                if (sort.order === 'ascending') {
                    order = 'asc'
                } else if (sort.order === 'descending') {
                    order = 'desc'
                }
                this.handleFilter({ _order: order, _sort: sort.prop })
            },
            handleTableSelection (selects) {
                let selection = []
                selects.forEach(s => {
                    selection.push(s.id)
                })
                this.tableSelection = selection
            },
            handlePaginationCurrent (page) {
                this.handleFilter({ page: page })
            },
            emitOperationBtn (msg) {
                if (this.model.customOperationFn && isFunction(this.model.customOperationFn[msg.type])) {
                    this.model.customOperationFn[msg.type](this, msg)
                } else {
                    console.error('请在model中customOperationFn对象添加对应按钮type的回调方法')
                }
            },
            emitTableStatus (msg) {
                status(this, this.route, msg.id)
                    .then(data => {
                        this.swtich_option_tableData({data: data, id: msg.id})
                        if (data.res === 1) {
                            this.$mg(this, '已启用', 'success', 1000)
                        } else {
                            this.$mg(this, '已停用', 'success', 1000)
                        }
                    })
            },
            emitDialogSave (msg) {
                this[`${msg.type}Save`](msg)
            },
            emitDialogDestroy (msg) {
                destroy(this, this.route, msg.id)
                    .then(data => {
                        this.$mg(this, '删除成功', 'success', 1000)
                        this.emitCloseDialog('delete')
                        this.ajaxIndex()
                    })
            },
            emitCloseDialog (msg) {
                this[`${msg}Visible`] = false
                this[`${msg}Data`] = {}
            },

            // 设置表单对话框数据
            setFormData (type, row = {}) {
                let data = {
                    id: row.id,
                    type: type,
                    title: type === 'add' ? `${this.model.commonTitle}-新增` : `${this.model.commonTitle}-编辑`,
                    formField: this.model.commonFormFieldsFn(type)
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
            // 动态方法
            add (scope) {
                console.log(scope)
                this.formData = this.setFormData(scope.type)
                this.formVisible = true
            },
            refresh (scope) {
                this.filter = {}
                this.conditionSearch = ''
                if (this.hasConditionStatusSelect) {
                    this.$refs['cstatusSelect'].params.value = undefined
                }
                this.ajaxIndex()
            },
            tableEdit (scope) {
                this.formVisible = true
                this.formLoading = true
                edit(this, this.route, scope.row.id)
                    .then(data => {
                        console.log(data)
                        this.formLoading = false
                        this.formData = this.setFormData(scope.type, data)
                        console.log(this.formData)
                    })
            },
            tableDelete (scope) {
                this.deleteData = scope.row
                this.deleteVisible = true
            },
            batchDestroy (scope) {
                if (this.tableSelection.length === 0) {
                    this.$mg(this, '未选择删除项', 'warning', 2000)
                    return
                }
                this.$confirm(`是否要删除这${this.tableSelection.length}条数据`)
                    .then(_ => {
                        let params = {
                            ids: this.tableSelection
                        }
                        batchDestroy(this, this.route, params)
                            .then(data => {
                                if (data.res === 'true') {
                                    this.$mg(this, '删除成功', 'success', 1000)
                                } else {
                                    this.$mg(this, '删除失败', 'error', 1000)
                                }
                                this.ajaxIndex()
                            })
                    })
                    .catch(_ => {})
            },
            addSave (formData) {
                console.log(formData)
                let params = {
                    _type: formData.type,
                    ...serializeData(formData.formField)
                }
                store(this, this.route, params)
                    .then(data => {
                        this.$mg(this, '保存成功', 'success', 2000)
                        this.$refs['commonFormDialog'].saveSetting.loading = false
                        this.emitCloseDialog('form')
                        this.ajaxIndex()
                    })
            },
            editSave (formData) {
                console.log(formData)
                let params = {
                    _type: formData.type,
                    ...serializeData(formData.formField)
                }
                update(this, this.route, formData.id, params)
                    .then(data => {
                        this.$mg(this, '保存成功', 'success', 2000)
                        this.$refs['commonFormDialog'].saveSetting.loading = false
                        this.emitCloseDialog('form')
                        this.edit_option_tableData(data)
                    })
            },
            handleFilter (data) {
                for (let i in data) {
                    this.filter[i] = data[i]
                }
                this.ajaxIndex()
            },
            // // condition范围选择处理方法
            // rangeDate (dates) {
            //  dates.forEach(date => {
            //      this.filter[date.field] = date.val
            //  })
            //  ajax.index(this, this.filter)
            // },
            // keypairDialog (row) {
            //  this.$emit('keypairDialog', row)
            // },

            // 数据处理方法
            set_tableData (data) {
                for (let i in data) {
                    if (i === 'data') {
                        this.tableData = this.model.tableFieldFn ? this.model.tableFieldFn(data.data, this) : data.data
                    } else {
                        this.paginationTablePager[i] = data[i]
                    }
                }
            },
            // reset_tableData () {
            //  this.tableData = []
            // },
            // add_option_tableData (data) {
            //  data = this.model.tableFieldFn ? this.model.tableFieldFn(data) : data
            //  if (this.tableData.length >= 15) {
            //      this.tableData.pop()
            //  }
            //  this.tableData.unshift(data)
            // },
            edit_option_tableData (data) {
                data = this.model.tableFieldFn ? this.model.tableFieldFn(data) : data
                this.tableData.forEach(v => {
                    if (v.id === data.id) {
                        for (let i in v) {
                            v[i] = data[i]
                        }
                    }
                })
            },
            // delete_option_tableData (data) {
            //  let arr = []
            //  this.tableData.forEach(v => {
            //      if (v.id !== data.id) {
            //          arr.push(v)
            //      }
            //  })
            //  this.tableData = arr
            // },
            swtich_option_tableData ({data, id}) {
                this.tableData.forEach(v => {
                    if (v.id === id) {
                        v.status = data.res
                    }
                })
            },
            ajaxIndex (route) {
                let path = route ? route : this.route
                this.tableLoading = true
                index(this, path, this.filter)
                    .then(data => {
                        this.set_tableData(data)
                        this.tableLoading = false
                    })
            }
        },
        watch: {
            route: function (nv, v) {
                console.log('watch route -------------')
                console.log(nv)
                if (nv.indexOf('undefined') > -1) return
                if (nv !== v) {
                    this.tableData = []
                    if (this.hasTabs) {
                        this.tabsActive = this.$route.query.current ? this.$route.query.current : this.$route.params.model
                    }
                    this.ajaxIndex()
                }
            }
        }
    }
</script>

<style lang="sass">
.common-main {
    .common-title-h1{
        line-height: 40px;
    }
    .common-condition{
        .el-input-group{
            width: 242px;
            margin-right: 10px;
        }
    } 
}
</style>