/*
品种管理
 */
import ElButton from 'COMPONENTS/public/commonElButton.vue'
import Uploader from 'COMPONENTS/public/commonUploader.vue'
import ElInput from 'COMPONENTS/public/commonElInput.vue'

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

const variety = {
    // 是否显示设置
    // 是否显示上一级
    hasTitleBack: false,
    // 是否显示tabs
    hasTabs: false,
    // 是否条件搜索的状态搜索
    hasConditionStatusSelect: false,
    // 默认条件搜索框
    hasConditionSearch: true,
    // 是否显示新增按钮
    hasConditionAdd: true,
    // 是否显示刷新按钮也叫重置按钮
    hasConditionRefresh: true,
    hasTableSelection: true,
    hasTableIndex: true,
    hasTableOperation: true,
    hasTableOperationEdit: true,
    hasTableOperationDelete: true,
    hasPaginationBatchDestroy: true,
    // 默认条件搜索的占位符
    defaultConditionSearchPlaceholder: '品种名称',
    // 标题*
    commonTitle: '品种管理',
    // 标签页
    commonTabs: {
        lists: [
            {
                display_name: '品种管理',
                name: 'variety'
            }
        ]
    },
    // 添加自定义组件插槽
    // commonTitleBeforeComponent: '',
    // commonTabsBeforeComponent: '',
    // 每个标签页的数据
    panelData: {
        variety: {
            // 条件刷选
            commonConditionComponents: [
                {
                    component: ElInput,
                    props: {
                        field: 'habit',
                        value: undefined,
                        placeholder: '生长习性'
                    }
                },
                {
                    component: ElInput,
                    props: {
                        field: 'origin',
                        value: undefined,
                        placeholder: '产地'
                    }
                },
                {
                    component: ElInput,
                    props: {
                        field: 'use_for',
                        value: undefined,
                        placeholder: '用途'
                    }
                }
            ],
            // 条件操作按钮
            // commonOperationComponents: [
            // ],
            // 表格列
            commonTableField: [
                {
                    label: '品种名称',
                    field: 'name'
                },
                {
                    label: '生长习性',
                    field: 'habit'
                },
                {
                    label: '产地',
                    field: 'origin'
                },
                {
                    label: '用途',
                    field: 'use_for'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            // 表格列特殊值处理
            // tableFieldFn: function (data) {
            //     const g = function (gender) {
            //         return gender === 1 ? '女' : '男'
            //     }
            //     if (isArray(data)) {
            //         data.forEach(v => {
            //             v.gender = g(v.gender)
            //         })
            //     }
            //     if (isObject(data)) {
            //         data.gender = g(data.gender)
            //     }
            //     return data
            // },
            // 表格的操作
            commonTableOperationComponents: [],
            // 分页操作组件
            commonPaginationOperationComponents: [],
            // 分页设定
            commonPaginationSetting: {
                className: '',
                layout: 'total, prev, pager, next, jumper'
            },
            // 自定义操作按钮父组件回调 包含
            // commonOperationComponents
            // commonTableOperationComponents
            // commonPaginationOperationComponents
            // customOperationFn: {},
            // 默认表单域
            commonFormFieldsFn () {
                return [
                    {
                        component: 'ElInput',
                        field: 'name',
                        label: '品种名称',
                        rulesType: [
                            {
                                max: 255,
                                message: '最多有255字',
                                trigger: 'blur'
                            }
                        ],
                        // 默认 required: true,
                        // 根据rules传入的方法数据动态设置验证方法
                        rules: [
                            // {
                            //     method: 'checkValid',
                            //     trigger: 'blur',
                            //     params: {
                            //         cfield: 'name'
                            //     }
                            // }
                        ],
                        value: null
                    },
                    {
                        component: 'ElInput',
                        field: 'habit',
                        label: '生长习性',
                        rulesType: [
                            {
                                max: 255,
                                message: '最多有255字',
                                trigger: 'blur'
                            }
                        ],
                        rules: [
                        ],
                        value: null
                    },
                    {
                        component: 'ElInput',
                        field: 'origin',
                        label: '产地',
                        rulesType: [
                            {
                                max: 255,
                                message: '最多有255字',
                                trigger: 'blur'
                            }
                        ],
                        rules: [
                        ],
                        value: null
                    },
                    {
                        component: 'ElInput',
                        field: 'use_for',
                        label: '用途',
                        rulesType: [
                            {
                                max: 255,
                                message: '最多有255字',
                                trigger: 'blur'
                            }
                        ],
                        rules: [
                        ],
                        value: null
                    },
                    {
                        component: 'ElInput',
                        inputType: 'textarea',
                        field: 'memo',
                        label: '备注',
                        required: false,
                        value: null
                    }
                ]
            },
            // 添加自定义组件插槽
            // commonConditionBeforeComponent: '',
            // commonTableBeforeComponent: '',
            // commonPaginationBeforeComponent: '',
            commonCustomDialog: {}
        }
    }
}

module.exports = {
    variety: variety
}