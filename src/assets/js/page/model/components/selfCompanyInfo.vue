<template>
    <el-card class="p-10 mt-10 mb-10 clearfix" :body-style="{'height': '130px'}" v-loading.body="loading">
        <div slot="header" class="clearfix">
            <span class="fl">盆栽信息</span>
        </div>
        <div class="fl" :style="{width: '150px'}">
            <img
                :src="company.imgs ? company.imgs : './static/image/company_default_logo.png'"
                class="block w100"
                title="logo"
                alt="logo">
        </div>
        <div class="of-h" style="margin-left: 170px">
            <el-row :gutter="20">
                <el-col v-for="(info, key) in companyInfo" :span="8" :key="key">
                    <div class="grid-content">
                        {{companyInfo[key]}}: <span class="lightHigh">{{company[key]}}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script>
import { show } from 'UTILS/commonApi.js'
import { isArray, isObject, isString } from 'UTILS/utils.js'

export default {
    name: 'selfCompanyInfo',
    props: {
        route: String
    },
    data () {
        return {
            companyInfo: {
                'name': '盆栽名称',
                'variety': '品种',
                'habit': '生长习性',
                'origin': '产地',
                'use_for': '用途',
                // 'imgs': '外观',
                'main': '负责人',
                'info': '其他信息',
                'cstatus': '状态',
                'memo': '备注'
            },
            company: {},
            loading: true
        }
    },
    mounted () {
        // http://localhost:8081/api/pot/11/edit
        show(this, this.$route.params.model, this.$route.params.id)
            .then(data => {
                console.log('data11111  11111')
                this.loading = false
                this.company = this.dataFieldFn(data)
            })
            .catch(e => {
                this.loading = false
            })
    },
    methods: {
        // 表格列特殊值处理
        dataFieldFn (data) {
            console.log('dataFieldFn ---- ')
            console.log(data)
            // 处理数组变成字符串
            function arrStr (arr) {
                let arrString = ''
                if (isArray(arr)) {
                    arrString = arr.join()
                }
                return arrString
            }

            // 处理json字符串变成字符串
            function strObj (str) {
                let arrString = ''
                if (str) {
                    let json = JSON.parse(str)
                    if (isObject(json)) {
                        for (let key in json) {
                            arrString += `${key}： ${json[key]} ； `
                        }
                    }
                }
                return arrString
            }

            // 处理状态，根据有无rfid
            const statusFn = function (rfid) {
                if (rfid) {
                    return '通过'
                } else {
                    return '不通过'
                }
            }

            if (isObject(data)) {
                console.log(data)
                data.main = arrStr(data.main)
                data.info = strObj(data.info)
                data.cstatus = statusFn(data.rfid)
                console.log(2222222)
                // data.imgs = data.imgs ? this.$apiUrl(data.imgs) : ''
            }
            console.log(data)
            return data
        }
    }
}
</script>
<style lang="sass">
  .el-row {
    font-size: 14px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 40px;
  }
  .row-bg {
    padding: 10px 0;
  }    
</style>
