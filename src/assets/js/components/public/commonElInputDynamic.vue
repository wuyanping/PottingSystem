<!-- 动态增减表单项 -->
<template>
    <div class="params_value">
        <div>传入参数值</div>
        <el-table
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
        </el-button>
    </div>
</template>
<script>
    export default {
        name: 'params_value',
        props: {
            formItemData: {
                type: Object,
                default () {
                    return {
                        label: '',
                        field: '',
                        value: [
                            {
                                param: '',
                                value: ''
                            }
                        ]
                    }
                }
            }
        },
        mounted () {
        },
        methods: {
            remove (scope) {
                this.formItemData.value.splice(scope.$index, 1)
            },
            add () {
                this.formItemData.value.push({
                    param: '',
                    value: ''
                })
            }
        },
        watch: {
            formItemData: {
                handler (newV, oldV) {
                    if (newV.length === 0) return
                },
                deep: true
            }
        }
    }
</script>
<style lang="sass">
</style>
