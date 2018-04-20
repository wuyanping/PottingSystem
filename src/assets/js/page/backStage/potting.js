// import ElSelect from '../../../../public/components/commonElSelect.vue'
import ElButton from 'COMPONENTS/public/commonElButton.vue'
import Uploader from 'COMPONENTS/public/commonUploader.vue'
import ElInput from 'COMPONENTS/public/commonElInput.vue'
import ElInputDynamic from 'COMPONENTS/public/commonElInputDynamic.vue'
import TableDetailLink from 'COMPONENTS/public/commonTableDetailLink.vue'

import validtor from 'UTILS/validator.js'
import { ajax } from 'UTILS/ajax.js'

function customSerializeFn (item) {
    let obj = {}
    if (item.value instanceof Blob) {
        obj['_hasfile'] = true
    }
    obj[item['field']] = item['value']
    console.log(111)
    return obj
}

const potting = {
    // 是否显示设置
    hasTitleBack: false,
    hasTabs: true,
    hasConditionStatusSelect: false,
    hasConditionSearch: true,
    hasConditionAdd: true,
    hasConditionRefresh: true,
    hasTableSelection: true,
    hasTableIndex: true,
    hasTableOperation: true,
    hasTableOperationEdit: true,
    hasTableOperationDelete: true,
    hasPaginationBatchDestroy: true,
    // 默认条件搜索的占位符 和hasConditionSearch连用
    defaultConditionSearchPlaceholder: '盆栽名称',
    // 标题*
    commonTitle: '盆栽管理',
    // 标签页
    commonTabs: {
        lists: [
            {
                display_name: '盆栽管理',
                name: 'potting'
            }
        ]
    },
    // 添加自定义组件插槽
    // commonTitleBeforeComponent: '',
    // commonTabsBeforeComponent: '',
    // 每个标签页的数据
    panelData: {
        potting: {
            // 条件刷选
            commonConditionComponents: [
                {
                    component: ElInput,
                    props: {
                        field: 'variety',
                        value: undefined,
                        placeholder: '品种'
                    }
                },
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
                }
            ],
            // 条件操作按钮
            // commonOperationComponents: [],
            // 表格列
            commonTableField: [
                {
                    label: '盆栽名称',
                    field: 'name'
                    // width: '80',
                    // component: TableDetailLink,
                    // props: {
                    //     className: 'block lightHigh miaosu',
                    //     detailUrl: 'detailModel',
                    //     current: 'user'
                    // }
                },
                {
                    label: '品种',
                    field: 'variety'
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
                    label: '外观',
                    field: 'imgs'
                },
                {
                    label: '负责人',
                    field: 'main'
                },
                {
                    label: '其他信息',
                    field: 'info'
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            // 表格列特殊值处理
            // tableFieldFn: function (data) {
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
                        label: '盆栽名称',
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
                        field: 'variety',
                        label: '品种',
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
                        inputType: 'textarea',
                        field: 'habit',
                        label: '生长习性',
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
                        value: null
                    },
                    {
                        component: Uploader,
                        field: 'imgs',
                        label: '外观',
                        value: null
                        // customSerializeFn: customSerializeFn
                    },
                    {
                        component: 'ElInput',
                        field: 'main',
                        label: '负责人',
                        rules: [],
                        value: null
                    },
                    {
                        component: ElInputDynamic,
                        field: 'info',
                        label: '其他信息',
                        required: false,
                        value: []
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
            commonCustomDialog: {
            }
        }
    }
}

module.exports = {
    potting: potting
}
