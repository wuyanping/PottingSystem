<template>
    <el-card class="p-10 mt-10 mb-10 clearfix" :body-style="{'height': '130px'}" v-loading.body="loading">
        <div slot="header" class="clearfix">
            <span class="pull-left">公司信息</span>
        </div>
        <div class="pull-left" :style="{width: '150px'}">
            <img
                :src="company.logo ? company.logo : './image/company_default_logo.png'"
                class="block w100"
                title="logo"
                alt="logo">
        </div>
        <div class="pull-left" :style="{width: 'calc(100% - 150px)'}">
            <ul class="w100 clearfix":style="{'marginLeft': '30px'}">
                <el-col v-for="(info, i) in company" :key="i" :xs="12" :sm="8" :md="12" :lg="8">
                    <li
                        class="card-item"
                        v-if="companyInfo[i] && i !== 'logo'"
                        >
                        <span class="inline-block w100 ellipsis" :title="`${companyInfo[i]}: ${info ? info : ''}`">
                            {{`${companyInfo[i]}: ${info ? info : ''}`}}
                        </span>
                    </li>
                </el-col>
            </ul>
        </div>
    </el-card>
</template>
<script>
    import { show } from 'UTILS/commonApi.js'
    export default {
        name: 'selfCompanyInfo',
        props: {
            route: String
        },
        data () {
            return {
                companyInfo: {
                    'name': '公司名',
                    'coding': '公司编码',
                    'short_name': '公司简称',
                    'USCC': '社会统一验证码',
                    'business_scope': '经营范围',
                    'legal_person': '负责人/法人',
                    'address': '详细地址',
                    'phone': '电话',
                    'website': '官网',
                    'total_staff': '员工总数'
                },
                company: {},
                loading: false
            }
        },
        mounted () {
            // show(this, this.$route.params.model, this.$route.params.id)
            //     .then(data => {
            //         this.loading = false
            //         this.company = data
            //     })
        }
    }
</script>
