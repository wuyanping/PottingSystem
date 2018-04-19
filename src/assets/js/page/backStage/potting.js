// import ElSelect from '../../../../public/components/commonElSelect.vue'
import ElButton from 'COMPONENTS/public/commonElButton.vue'
import TableDetailLink from 'COMPONENTS/public/commonTableDetailLink.vue'
import ElSwitch from 'COMPONENTS/public/commonElSwitch.vue'
import Uploader from 'COMPONENTS/public/commonUploader.vue'
import ElInput from 'COMPONENTS/public/commonElInput.vue'

import validtor from 'UTILS/validator.js'
import { ajax } from 'UTILS/ajax.js'

import selfPowerDialog from '../model/components/selfPowerDialog.vue'

function customSerializeFn (item) {
    let obj = {}
    if (item.value instanceof Blob) {
        obj['_hasfile'] = true
    }
    obj[item['field']] = item['value']
    return obj
}

const potting = {
    // 是否显示设置
    hasTitleBack: false,
    hasTabs: true,
    hasConditionStatusSelect: true,
    hasConditionSearch: true,
    hasConditionAdd: true,
    hasConditionRefresh: true,
    hasTableSelection: true,
    hasTableIndex: true,
    hasTableOperation: true,
    hasTableOperationEdit: true,
    hasTableOperationDelete: true,
    hasPaginationBatchDestroy: true,
    // 默认条件搜索的占位符
    defaultConditionSearchPlaceholder: '',
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
                // {
                //  component: ElRangeDatePicker,
                //  props: {
                //      reset: false,
                //  },
                // },
                // {
                //  component: ElSelect,
                //  props: {
                //      field: 'ggg',
                //      value: undefined,
                //      title: '请选择类型',
                //      lists: [
                //          {
                //              label: '1',
                //              value: 1
                //          },
                //          {
                //              label: '2',
                //              value: 0
                //          },
                //      ]
                //  }
                // },
            ],
            // 条件操作按钮
            // commonOperationComponents: [
            //  {
            //      component: ElButton,
            //      props: {
            //          type: 'primary',
            //          loading: false,
            //          disabled: false,
            //          className: '',
            //          display_name: '自定义操作按钮',
            //          clickFn: (vm, scope) => {
            //              vm.$emit('customEv', { type: 'customOperation', ...scope })
            //          }
            //      }
            //  },
            // ],
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
                    // width: '80',
                    // component: TableDetailLink,
                    // props: {
                    //  className: 'block lightHigh miaosu',
                    //  detailUrl: 'detail',
                    // }
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
            commonTableOperationComponents: [
                {
                    component: ElButton,
                    props: {
                        type: 'text',
                        loading: false,
                        disabled: false,
                        className: '',
                        display_name: '权限',
                        clickFn: (vm, scope) => {
                            vm.$emit('customEv', { type: 'power', ...scope })
                        }
                    }
                }
            ],
            // 分页操作组件
            commonPaginationOperationComponents: [
                // {
                //  component: ElButton,
                //  props: {
                //      type: 'primary',
                //      loading: false,
                //      disabled: false,
                //      className: '',
                //      display_name: '删除',
                //      clickFn: (vm, scope) => {
                //          vm.$emit('customEv', { type: 'batchdelete', ...scope })
                //      }
                //  }
                // },
            ],
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
                // customOperation (vm, scope) {
                //  console.log(vm)
                //  console.log(scope)
                // },
                power (vm, scope) {
                    vm.$refs['powerDialog'].powerData = {}
                    ajax.call(vm, 'get', `/api/common/company/${scope.row.id}/permissions`, data => {
                        let arr = []
                        data.forEach(v => {
                            arr.push(v.id)
                        })
                        vm.$refs['powerDialog'].powerData = {
                            title: scope.row.name,
                            id: scope.row.id,
                            field: 'ids',
                            value: arr
                        }
                        vm.$refs['powerDialog'].visible = true
                    })
                }
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
                        component: ElInput,
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
                        component: 'Uploader',
                        field: 'imgs',
                        label: '外观',
                        value: null,
                        customSerializeFn: customSerializeFn
                    },
                    {
                        component: 'ElRadio',
                        field: 'main',
                        label: '负责人',
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
                        component: 'ElInput',
                        inputType: 'textarea',
                        field: 'info',
                        label: '其他信息',
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
            commonCustomDialog: {
                ref: 'powerDialog',
                component: selfPowerDialog
            }
        }
        // tes: {},
        // ddd: {},
    }
}

module.exports = {
    potting: potting
}
