<template>
    <div>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="input-dynamic">
            <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains" :key="index"
            >
                <el-input v-model="domain.key"></el-input>
                <el-input v-model="domain.value"></el-input>
                <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                <el-button @click="addDomain">新增其他信息</el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-input v-model="obj.value" @change="handleChange"></el-input>
            <el-input v-model="div"></el-input>
            <MyText :pObj="obj" :pdiv="div"></MyText>
        </div>
    </div>
</template>
<script>
import MyText from './text.vue'
export default {
    name: 'userInfo',
    components: {
        MyText
    },
    data () {
        return {
            dynamicValidateForm: {
                domains: [{
                    key: '',
                    value: ''
                }]
            },
            obj: {
                value: 'pobj'
            },
            div: 'div'
        }
    },
    methods: {
        handleChange () {
            console.log(this.div)
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        removeDomain (item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
        addDomain () {
            this.dynamicValidateForm.domains.push({
                key: '',
                value: ''
            })
            console.log(this.dynamicValidateForm)
        }
    },
    watch: {
        obj: {
            deep: true,
            handler: function (newV) {
                console.log(newV)
            }
        }
    }
}
</script>
<style lang="sass">
.input-dynamic{
    .el-input{
        width: 100px;
    }
}
</style>
