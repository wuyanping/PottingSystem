/*
盆栽管理
 */
import ElSelect from 'COMPONENTS/public/commonElSelect.vue'
import ElSwitch from 'COMPONENTS/public/commonElSwitch.vue'
import ElButton from 'COMPONENTS/public/commonElButton.vue'
import Uploader from 'COMPONENTS/public/commonUploader.vue'
import ElInput from 'COMPONENTS/public/commonElInput.vue'
import ElInputDynamic from 'COMPONENTS/public/commonElInputDynamic.vue'
import TableDetailLink from 'COMPONENTS/public/commonTableDetailLink.vue'
import selfaddPassPottingDialog from './components/selfAddPassPottingDialog.vue'

import validtor from 'UTILS/validator.js'
import { ajax } from 'UTILS/ajax.js'
import { isArray, isObject } from 'UTILS/utils.js'

function customSerializeFn (item) {
    let obj = {}
    if (item.value instanceof Blob) {
        obj['_hasfile'] = true
    }
    obj[item['field']] = item['value']
    console.log(111)
    return obj
}

const pot = {
    // 是否显示设置
    hasTitleBack: false,
    hasTabs: false,
    hasConditionStatusSelect: true,
    hasConditionSearch: true,
    // hasConditionAdd: true,
    hasConditionRefresh: true,
    hasTableSelection: true,
    hasTableIndex: true,
    hasTableOperation: true,
    hasTableOperationEdit: false,
    hasTableOperationDelete: false,
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
                name: 'pot'
            }
        ]
    },
    // 添加自定义组件插槽
    // commonTitleBeforeComponent: '',
    // commonTabsBeforeComponent: '',
    // 每个标签页的数据
    panelData: {
        pot: {
            // 条件刷选
            commonConditionComponents: [
                // {
                //     component: ElSelect,
                //     props: {
                //         field: 'rfid',
                //         value: undefined,
                //         title: '盆栽通过状态',
                //         lists: [
                //             {
                //                 label: '请选择',
                //                 value: undefined
                //             },
                //             {
                //                 label: '通过',
                //                 value: 0
                //             },
                //             {
                //                 label: '不通过',
                //                 value: 1
                //             }
                //         ]
                //     }
                // },
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
                    field: 'name',
                    width: '80',
                    component: TableDetailLink,
                    props: {
                        className: 'lightHigh',
                        detailUrl: 'detailModel',
                        current: 'watering'
                    }
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
                    label: '状态',
                    field: 'cstatus',
                    sortable: 'custom',
                    component: ElSwitch
                },
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            // 表格列特殊值处理
            tableFieldFn: function (data) {
                console.log('tableFieldFn ---- ')
                console.log(data)
                const g = function (gender) {
                    return gender === 1 ? '女' : '男'
                }
                const arrStr = function (arr) {
                    let arrString = ''
                    if (isArray(arr)) {
                        arrString = arr.join()
                    }
                    return arrString
                }

                const arrObj = function (arr) {
                    let arrString = ''
                    if (isArray(arr)) {
                        arr.forEach(obj => {
                            if (isObject(obj)) {
                                arrString += `${obj.param}： ${obj.val} ； `
                            }
                        })
                    }
                    return arrString
                }

                if (isArray(data)) {
                    data.forEach(v => {
                        v.gender = g(v.gender)
                        v.main = arrStr(v.main)
                        v.info = arrObj(v.info)
                    })
                }
                if (isObject(data)) {
                    data.main = arrStr(data.main)
                    data.info = arrObj(data.info)
                }
                return data
            },
            // 表格的操作
            commonTableOperationComponents: [
                // {
                //     component: ElButton,
                //     props: {
                //         type: 'text',
                //         loading: false,
                //         disabled: false,
                //         className: '',
                //         display_name: '通过',
                //         clickFn: (vm, scope) => {
                //             vm.$emit('customEv', { type: 'pass', ...scope })
                //         }
                //     }
                // }
            ],
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
            customOperationFn: {
                // pass (vm, msg) {
                //     vm.$refs['addPassPottingDialog'].visible = true
                // }
            },

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
                        required: false,
                        value: null,
                        customSerializeFn: customSerializeFn
                        // component: Uploader,
                        // field: 'imgs',
                        // label: '外观',
                        // value: null
                        // customSerializeFn: customSerializeFn
                    },
                    // {
                    //     component: 'ElInput',
                    //     field: 'main',
                    //     label: '负责人',
                    //     rules: [],
                    //     value: null
                    // },
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
                // ref: 'addPassPottingDialog',
                // component: selfaddPassPottingDialog
            }
        }
    }
}

module.exports = {
    pot: pot
}
