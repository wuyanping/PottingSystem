/*
用户信息管理
 */
import ElButton from 'COMPONENTS/public/commonElButton.vue'
import Uploader from 'COMPONENTS/public/commonUploader.vue'
import ElInput from 'COMPONENTS/public/commonElInput.vue'

import validtor from 'UTILS/validator.js'
import { ajax } from 'UTILS/ajax.js'

function customSerializeFn (item) {
    let obj = {}
    if (item.value instanceof Blob) {
        obj['_hasfile'] = true
    }
    obj[item['field']] = item['value']
    return obj
}

const user = {
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
    hasConditionAdd: false,
    // 是否显示刷新按钮也叫重置按钮
    hasConditionRefresh: true,
    hasTableSelection: true,
    hasTableIndex: true,
    hasTableOperation: true,
    hasTableOperationEdit: true,
    hasTableOperationDelete: false,
    hasPaginationBatchDestroy: false,
    // 默认条件搜索的占位符
    defaultConditionSearchPlaceholder: '用户名',
    // 标题*
    commonTitle: '用户信息',
    // 标签页
    commonTabs: {
        lists: [
            {
                display_name: '用户信息管理',
                name: 'user'
            }
        ]
    },
    // 添加自定义组件插槽
    // commonTitleBeforeComponent: '',
    // commonTabsBeforeComponent: '',
    // 每个标签页的数据
    panelData: {
        user: {
            // 条件刷选
            commonConditionComponents: [
                {
                    component: ElInput,
                    props: {
                        field: 'nickname',
                        value: undefined,
                        placeholder: '用户昵称'
                    }
                }
            ],
            // 条件操作按钮
            // commonOperationComponents: [
            // ],
            // 表格列
            commonTableField: [
                {
                    label: '用户名',
                    field: 'name'
                },
                {
                    label: '用户昵称',
                    field: 'nickname'
                },
                {
                    label: '手机号',
                    field: 'phone'
                },
                {
                    label: '头像',
                    field: 'avatar'
                },
                {
                    label: '邮箱',
                    field: 'email'
                },
                {
                    label: '真实姓名',
                    field: 'realname'
                },
                {
                    label: '性别',
                    field: 'gender'
                },
                {
                    label: '出生日期',
                    field: 'birth_date'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            // 表格列特殊值处理
            // tableFieldFn: function (data) {
            //  const g = function (gender) {
            //      return gender === 1 ? '女' : '男'
            //  }
            //  if (isArray(data)) {
            //      data.forEach(v => {
            //          v.gender = g(v.gender)
            //      })
            //  }
            //  if (isObject(data)) {
            //      data.gender = g(data.gender)
            //  }
            //  return data
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
                        label: '用户名',
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
                        field: 'nickname',
                        label: '用户昵称',
                        rulesType: [
                            {
                                max: 255,
                                message: '最多有255字',
                                trigger: 'blur'
                            }
                        ],
                        rules: [],
                        value: null
                    },
                    {
                        component: 'ElInput',
                        field: 'phone',
                        label: '手机号',
                        rules: [
                            {
                                method: 'phoneValid',
                                params: {}
                            }
                        ],
                        value: null
                    },
                    {
                        component: Uploader,
                        field: 'avatar',
                        label: '头像',
                        required: false,
                        value: null,
                        customSerializeFn: customSerializeFn
                    },
                    {
                        component: 'ElInput',
                        field: 'email',
                        label: '电子邮箱',
                        required: false,
                        rulesType: [
                            {
                                type: 'email',
                                message: '请输入正确的邮箱地址',
                                trigger: 'change'
                            },
                            {
                                max: 255,
                                message: '最多有255字',
                                trigger: 'blur'
                            }
                        ],
                        rules: [],
                        value: null
                    },
                    {
                        component: 'ElInput',
                        field: 'realname',
                        label: '真实姓名',
                        required: false,
                        rulesType: [
                            {
                                max: 255,
                                message: '最多有255字',
                                trigger: 'blur'
                            }
                        ],
                        value: null
                    },
                    {
                        component: 'ElRadio',
                        field: 'gender',
                        label: '性别',
                        required: false,
                        value: 0,
                        radioList: [
                            {
                                name: '男',
                                id: 0
                            },
                            {
                                name: '女',
                                id: 1
                            }
                        ]
                    },
                    {
                        component: 'ElDate',
                        field: 'birth_date',
                        label: '出生日期',
                        required: false,
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
    user: user
}
