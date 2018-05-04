/*
系统日志管理
 */
import ElSelect from 'COMPONENTS/public/commonElSelect.vue'
import ElButton from 'COMPONENTS/public/commonElButton.vue'
// import TableDetailLink from 'COMPONENTS/public/commonTableDetailLink.vue'
import ElDate from 'COMPONENTS/public/commonElDatePicker.vue'

import validtor from 'UTILS/validator.js'
import { ajax } from 'UTILS/ajax.js'
import { isArray, isObject } from 'UTILS/utils.js'

function customSerializeFn (item) {
    let obj = {}
    if (item.value instanceof Blob) {
        obj['_hasfile'] = true
    }
    obj[item['field']] = item['value']
    return obj
}

const log = {
    // 是否显示设置
    hasTitleBack: false,
    hasTabs: false,
    hasConditionStatusSelect: false,
    hasConditionSearch: true,
    hasConditionAdd: false,
    hasConditionRefresh: true,
    hasTableSelection: true,
    hasTableIndex: true,
    hasTableOperation: false,
    hasTableOperationEdit: false,
    hasTableOperationDelete: false,
    hasPaginationBatchDestroy: false,
    // 默认条件搜索的占位符 和hasConditionSearch连用
    defaultConditionSearchPlaceholder: '内容',
    // 标题*
    commonTitle: '系统日志管理',
    // 标签页
    commonTabs: {
        lists: [
            {
                display_name: '系统日志管理',
                name: 'log'
            }
        ]
    },
    // 添加自定义组件插槽
    // commonTitleBeforeComponent: '',
    // commonTabsBeforeComponent: '',
    // 每个标签页的数据
    panelData: {
        log: {
            // 条件刷选
            commonConditionComponents: [
                {
                    component: ElSelect,
                    props: {
                        field: 'type',
                        value: undefined,
                        title: '操作',
                        lists: [
                            {
                                label: '添加',
                                value: 1
                            },
                            {
                                label: '更新',
                                value: 2
                            },
                            {
                                label: '删除',
                                value: 3
                            },
                            {
                                label: '查询',
                                value: 4
                            }
                        ]
                    }
                },
                {
                    component: ElDate,
                    props: {
                        field: 'date',
                        value: undefined,
                        title: '日期范围',
                        type: 'daterange',
                        className: 'mr-10'
                    }
                }
            ],
            // 条件操作按钮
            // commonOperationComponents: [],
            // 表格列
            commonTableField: [
                {
                    label: '模块名称',
                    field: 'model'
                },
                {
                    label: '操作',
                    field: 'type'
                },
                {
                    label: '内容',
                    field: 'content'
                },
                {
                    label: '日期',
                    field: 'log_date'
                },
                {
                    label: '客户端ip',
                    field: 'ip'
                },
                {
                    label: '用户',
                    field: 'user_id'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            // 表格列特殊值处理
            tableFieldFn: function (data) {
                const typeFn = function (n) {
                    console.log(n)
                    let arr = [{
                        label: '添加',
                        value: 1
                    },
                    {
                        label: '更新',
                        value: 2
                    },
                    {
                        label: '删除',
                        value: 3
                    },
                    {
                        label: '查询',
                        value: 4
                    }]
                    return arr.find(item => {
                        return item.value === n
                    }).label
                }
                if (isArray(data)) {
                    data.forEach(v => {
                        v.type = typeFn(v.type)
                    })
                }
                if (isObject(data)) {
                    data.type = typeFn(data.type)
                }
                return data
            },
            // 表格的操作
            // commonTableOperationComponents: [],
            // 分页操作组件
            // commonPaginationOperationComponents: [],
            // 分页设定
            commonPaginationSetting: {
                className: '',
                layout: 'total, prev, pager, next, jumper'
            }
            // 自定义操作按钮父组件回调 包含
            // commonOperationComponents
            // commonTableOperationComponents
            // commonPaginationOperationComponents
            // customOperationFn: {}
            // 默认表单域
            // commonFormFieldsFn () {
            // },
            // 添加自定义组件插槽
            // commonConditionBeforeComponent: '',
            // commonTableBeforeComponent: '',
            // commonPaginationBeforeComponent: '',
            // commonCustomDialog: {
            // }
        }
    }
}

module.exports = {
    log: log
}
