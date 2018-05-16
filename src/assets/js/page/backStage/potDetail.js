/*
盆栽详情
 */
import ElDate from 'COMPONENTS/public/commonElDatePicker.vue'
import Uploader from 'COMPONENTS/public/commonUploader.vue'
import validtor from 'UTILS/validator.js'
import { ajax } from 'UTILS/ajax.js'
import { isArray, isObject } from 'UTILS/utils.js'

import selfCompanyInfo from '../model/components/selfCompanyInfo.vue'
import commonElPopver from 'COMPONENTS/public/commonElPopver.vue'

function customSerializeFn (item) {
    let obj = {}
    if (item.value instanceof Blob) {
        obj['_hasfile'] = true
    }
    obj[item['field']] = item['value']
    return obj
}

const potDetail = {
    // 是否显示设置
    hasTitleBack: true,
    hasTabs: true,
    hasConditionStatusSelect: false,
    hasConditionSearch: true,
    hasConditionAdd: false,
    hasConditionRefresh: true,
    hasTableSelection: true,
    hasTableIndex: true,
    hasTableOperation: true,
    hasTableOperationEdit: true,
    hasTableOperationDelete: false,
    hasPaginationBatchDestroy: false,
    // 默认条件搜索的占位符 和hasConditionSearch连用
    defaultConditionSearchPlaceholder: '操作人/盆栽状态',
    // 标题*
    commonTitle: '盆栽详情',
    // 标签页
    commonTabs: {
        // type: 'card',
        lists: [
            {
                display_name: '浇水操作管理',
                name: 'watering'
            },
            {
                display_name: '施肥信息管理',
                name: 'fertilizer'
            },
            {
                display_name: '其他操作管理',
                name: 'order'
            },
            {
                display_name: '生长节点信息管理',
                name: 'node'
            }
        ]
    },
    // 添加自定义组件插槽
    // commonTitleBeforeComponent: '',
    commonTabsBefore: {
        ref: 'companyInfo',
        component: selfCompanyInfo
    },
    // 每个标签页的数据
    panelData: {
        // 浇水
        watering: {
            // 条件刷选
            commonConditionComponents: [
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
            // commonOperationComponents: [
            // ],
            // 表格列
            commonTableField: [
                {
                    label: '浇水方式',
                    field: 'content'
                },
                {
                    label: '浇水量',
                    field: 'value'
                },
                {
                    label: '浇水时间',
                    field: 'date'
                },
                {
                    label: '操作人',
                    field: 'user_id'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            // 表格列特殊值处理
            // tableFieldFn: function (data) {
            //     return data
            // },
            // 表格的操作
            // commonTableOperationComponents: [
            // ],
            // 分页操作组件
            // commonPaginationOperationComponents: [
            // ],
            // 分页设定
            commonPaginationSetting: {
                className: '',
                layout: 'total, prev, pager, next, jumper'
            },
            // 自定义操作按钮父组件回调 包含
            // commonOperationComponents
            // commonTableOperationComponents
            // commonPaginationOperationComponents
            // customOperationFn: {
            // },
            // 默认表单域
            commonFormFieldsFn (type) {
                return [
                    // {
                    //     component: 'ElInput',
                    //     field: 'content',
                    //     label: '浇水方式',
                    //     rulesType: [
                    //         {
                    //             max: 255,
                    //             message: '最多有255字',
                    //             trigger: 'blur'
                    //         }
                    //     ],
                    //     value: null
                    // },
                    // {
                    //     component: 'ElInput',
                    //     // type: 'number'
                    //     field: 'value',
                    //     label: '浇水量',
                    //     required: false,
                    //     rulesType: [
                    //         {
                    //             max: 255,
                    //             message: '最多有255字',
                    //             trigger: 'blur'
                    //         }
                    //         // ,
                    //         // {
                    //         //     type: 'number',
                    //         //     message: '必须为数字值',
                    //         //     trigger: 'change'
                    //         // }
                    //     ],
                    //     value: null
                    // },
                    // {
                    //     component: 'ElDate',
                    //     field: 'date',
                    //     label: '浇水时间',
                    //     value: null
                    // },
                    // {
                    //     component: 'ElInput',
                    //     field: 'info',
                    //     label: '操作信息',
                    //     value: null
                    // },
                    {
                        component: 'ElInput',
                        inputType: 'textarea',
                        field: 'memo',
                        label: '备注',
                        required: false,
                        value: null
                    }
                ]
            }
            // 添加自定义组件插槽
            // commonConditionBeforeComponent: '',
            // commonTableBeforeComponent: '',
            // commonPaginationBeforeComponent: '',
            // commonCustomDialog: {
            // },
        },
        // 施肥
        fertilizer: {
            // 条件刷选
            commonConditionComponents: [
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
            // commonOperationComponents: [
            // ],
            // 表格列
            commonTableField: [
                {
                    label: '施肥名称',
                    field: 'content'
                },
                {
                    label: '施肥量',
                    field: 'value'
                },
                {
                    label: '施肥时间',
                    field: 'date'
                },
                {
                    label: '操作人',
                    field: 'user_id'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            // 表格列特殊值处理
            // tableFieldFn: function (data) {
            //     return data
            // },
            // 表格的操作
            // commonTableOperationComponents: [
            // ],
            // 分页操作组件
            // commonPaginationOperationComponents: [
            // ],
            // 分页设定
            commonPaginationSetting: {
                className: '',
                layout: 'total, prev, pager, next, jumper'
            },
            // 自定义操作按钮父组件回调 包含
            // commonOperationComponents
            // commonTableOperationComponents
            // commonPaginationOperationComponents
            // customOperationFn: {
            // },
            // 默认表单域
            commonFormFieldsFn (type) {
                return [
                    // {
                    //     component: 'ElInput',
                    //     field: 'content',
                    //     label: '施肥名称',
                    //     rulesType: [
                    //         {
                    //             max: 255,
                    //             message: '最多有255字',
                    //             trigger: 'blur'
                    //         }
                    //     ],
                    //     value: null
                    // },
                    // {
                    //     component: 'ElInput',
                    //     field: 'value',
                    //     label: '施肥量',
                    //     required: false,
                    //     rulesType: [
                    //         {
                    //             max: 255,
                    //             message: '最多有255字',
                    //             trigger: 'blur'
                    //         }
                    //     ],
                    //     value: null
                    // },
                    // {
                    //     component: 'ElDate',
                    //     field: 'date',
                    //     label: '施肥时间',
                    //     value: null
                    // },
                    // {
                    //     component: 'ElInput',
                    //     field: 'info',
                    //     label: '操作信息',
                    //     value: null
                    // },
                    {
                        component: 'ElInput',
                        inputType: 'textarea',
                        field: 'memo',
                        label: '备注',
                        required: false,
                        value: null
                    }
                ]
            }
            // 添加自定义组件插槽
            // commonConditionBeforeComponent: '',
            // commonTableBeforeComponent: '',
            // commonPaginationBeforeComponent: '',
            // commonCustomDialog: {
            // },
        },
        // 其他
        order: {
            // 条件刷选
            commonConditionComponents: [
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
            // commonOperationComponents: [
            // ],
            // 表格列
            commonTableField: [
                {
                    label: '操作名称',
                    field: 'content'
                },
                {
                    label: '浇水时间',
                    field: 'date'
                },
                {
                    label: '操作信息',
                    field: 'info'
                },
                {
                    label: '操作人',
                    field: 'user_id'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            // 表格列特殊值处理
            // tableFieldFn: function (data) {
            //     return data
            // },
            // 表格的操作
            // commonTableOperationComponents: [
            // ],
            // 分页操作组件
            // commonPaginationOperationComponents: [
            // ],
            // 分页设定
            commonPaginationSetting: {
                className: '',
                layout: 'total, prev, pager, next, jumper'
            },
            // 自定义操作按钮父组件回调 包含
            // commonOperationComponents
            // commonTableOperationComponents
            // commonPaginationOperationComponents
            // customOperationFn: {
            // },
            // 默认表单域
            commonFormFieldsFn (type) {
                return [
                    // {
                    //     component: 'ElInput',
                    //     field: 'content',
                    //     label: '操作名称',
                    //     rulesType: [
                    //         {
                    //             max: 255,
                    //             message: '最多有255字',
                    //             trigger: 'blur'
                    //         }
                    //     ],
                    //     value: null
                    // },
                    // {
                    //     component: 'ElDate',
                    //     field: 'date',
                    //     label: '操作时间',
                    //     value: null
                    // },
                    // {
                    //     component: 'ElInput',
                    //     field: 'info',
                    //     label: '操作信息',
                    //     required: false,
                    //     value: null
                    // },
                    {
                        component: 'ElInput',
                        inputType: 'textarea',
                        field: 'memo',
                        label: '备注',
                        required: false,
                        value: null
                    }
                ]
            }
            // 添加自定义组件插槽
            // commonConditionBeforeComponent: '',
            // commonTableBeforeComponent: '',
            // commonPaginationBeforeComponent: '',
            // commonCustomDialog: {
            // },
        },
        // 生长节点
        node: {
            // 条件刷选
            commonConditionComponents: [
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
            // commonOperationComponents: [
            // ],
            // 表格列
            commonTableField: [
                // {
                //     label: '时间',
                //     field: 'date'
                // },
                // {
                //     label: '天气',
                //     field: 'weather'
                // },
                // {
                //     label: '盆栽状态',
                //     field: 'status'
                // },
                // {
                //     label: '外观',
                //     field: 'imgs',
                //     component: commonElPopver,
                //     props: {
                //         detailUrl: 'detailModel',
                //         current: 'watering'
                //     }
                // },
                // {
                //     label: '记录',
                //     field: 'record'
                // },
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            // 表格列特殊值处理
            tableFieldFn: function (data) {
                const statusFn = function (status) {
                    let st = ''
                    switch (status) {
                    case 0:
                        st = '良好'
                        break
                    case 1:
                        st = '一般'
                        break
                    case 2:
                        st = '较差'
                        break
                    case 3:
                        st = '非常差'
                        break
                    }
                    return st
                }
                if (isArray(data)) {
                    data.forEach(v => {
                        v.status = statusFn(v.status)
                    })
                }
                if (isObject(data)) {
                    data.status = statusFn(data.status)
                }
                return data
            },
            // 表格的操作
            // commonTableOperationComponents: [
            // ],
            // 分页操作组件
            // commonPaginationOperationComponents: [
            // ],
            // 分页设定
            commonPaginationSetting: {
                className: '',
                layout: 'total, prev, pager, next, jumper'
            },
            // 自定义操作按钮父组件回调 包含
            // commonOperationComponents
            // commonTableOperationComponents
            // commonPaginationOperationComponents
            // customOperationFn: {
            // },
            // 默认表单域
            commonFormFieldsFn (type) {
                return [
                    // {
                    //     component: 'ElDate',
                    //     field: 'date',
                    //     label: '操作时间',
                    //     value: null
                    // },
                    // {
                    //     component: 'ElInput',
                    //     field: 'weather',
                    //     label: '天气',
                    //     rulesType: [
                    //         {
                    //             max: 255,
                    //             message: '最多有255字',
                    //             trigger: 'blur'
                    //         }
                    //     ],
                    //     value: null
                    // },
                    // {
                    //     component: 'ElSelect',
                    //     field: 'status',
                    //     label: '盆栽状态',
                    //     selectList: [
                    //         {
                    //             name: '良好',
                    //             id: 0
                    //         },
                    //         {
                    //             name: '一般',
                    //             id: 1
                    //         },
                    //         {
                    //             name: '较差',
                    //             id: 2
                    //         },
                    //         {
                    //             name: '非常差',
                    //             id: 3
                    //         }
                    //     ],
                    //     value: null
                    // },
                    // {
                    //     component: Uploader,
                    //     field: 'imgs',
                    //     label: '外观',
                    //     value: null,
                    //     customSerializeFn: customSerializeFn
                    // },
                    // {
                    //     component: 'ElInput',
                    //     field: 'record',
                    //     label: '记录',
                    //     value: null
                    // },
                    {
                        component: 'ElInput',
                        inputType: 'textarea',
                        field: 'memo',
                        label: '备注',
                        required: false,
                        value: null
                    }
                ]
            }
            // 添加自定义组件插槽
            // commonConditionBeforeComponent: '',
            // commonTableBeforeComponent: '',
            // commonPaginationBeforeComponent: '',
            // commonCustomDialog: {
            // },
        }
    }
}
module.exports = {
    potDetail: potDetail
}
