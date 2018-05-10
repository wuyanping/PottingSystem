<!-- 动态增减表单项 -->
<template>
    <div class="m_params_value">
        <div class="vux-x-input weui-cell">
            <span class="weui-label">{{formItemData.title}}</span>
        </div>
        <div class="tableDiv">
            <x-table full-bordered style="background-color:#fff;">
                <thead>
                    <tr style="background-color: #F7F7F7">
                        <th>参数</th>
                        <th>值</th>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="formItemData.value.length == 0">
                        <td colspan="3">暂无数据</td>
                    </tr>
                    <tr v-else v-for="(trItem, i) in formItemData.value" :key="i">
                        <td><x-input v-model="trItem.param"></x-input></td>
                        <td><x-input v-model="trItem.value"></x-input></td>
                        <td><x-button @click.native="remove(i)">删</x-button></td>
                    </tr>
                </tbody>
            </x-table>
            <x-button @click.native="add">添加</x-button>
        </div>
            
        <!-- <el-table
            border
            :data="formItemData.value"
            style="width: 100%">
            <el-table-column
                align="center"
                :resizable="false"
                prop="param"
                label="参数">
                <template slot-scope="scope">
                    <div>
                        <el-input v-model="scope.row.param" placeholder="必填，不填不会添加该数据"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                :resizable="false"
                prop="value"
                label="值">
                <template slot-scope="scope">
                    <div>
                        <el-input v-model="scope.row.value"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                :resizable="false"
                label="">
                <template slot-scope="scope">
                    <div class="lightHigh">
                        <el-button type="danger" @click="remove(scope)">
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="info" @click="add">
            添加
        </el-button> -->
    </div>
</template>
<script>
import {XTable, LoadMore, XButton, XInput, Group} from 'vux'

export default {
    name: 'm_params_value',
    components: {
        XTable, LoadMore, XButton, XInput, Group
    },
    props: {
        formItemData: {
            type: Object,
            default () {
                return {
                    name: '',
                    title: '',
                    iconType: '',
                    rule: {required: false},
                    validatorResult: {
                        valid: '',
                        msg: ''
                    },
                    value: []
                }
            }
        }
    },
    mounted () {
        console.log('this.formItemData ---- ')
        console.log(this.formItemData)
        console.log(this.formItemData.value.length)
    },
    methods: {
        remove (scope) {
            console.log(scope)
            console.log(this.formItemData.value)
            this.formItemData.value.splice(scope, 1)
        },
        add () {
            console.log(this.formItemData.value)
            this.formItemData.value.push({
                param: '',
                value: ''
            })
        }
    },
    watch: {
        formItemData: {
            handler (newV, oldV) {
                console.log('watch formItemData - ')
                if (newV.length === 0) return
            },
            deep: true
        }
    }
}
</script>
<style lang="sass">
.m_params_value{
    .tableDiv{
        padding:0px 15px 15px;
        .weui-cell{
            padding: 0px 15px;
        }
    }
}
</style>
