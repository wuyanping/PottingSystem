/*登陆注册组件
* @description 
* @author 吴燕萍
* @date 2018/4/17
* */
<template>
    <div class="login">
        <div class="login-content">
            <el-card class="box-card">
                <div slot="header" class="clearfix txt-c">
                    <span class="fontSize22">盆栽溯源后台系统</span>
                </div>
                <el-form :model="userInfo" :rules="rules" ref="userInfo">
                    <el-form-item label="" prop="userEmail">
                        <el-input type="email" placeholder="输入邮箱" name="email" v-model="userInfo.userEmail" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="pwd">
                        <el-input type="password" placeholder="输入密码" name="pwd" v-model="userInfo.pwd" auto-complete="off" @keyup.native.enter="submitForm('userInfo')"></el-input>
                    </el-form-item>
                    <el-form-item class="txt-c">
                        <el-button type="primary" class="btn" @click="submitForm('userInfo')">登录</el-button>
                    </el-form-item>
                    <el-form-item
                        class="textAlign-l">
                        <el-checkbox
                        :checked='remember_flag'
                        v-model='remember_flag'>记住账号</el-checkbox>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script>
// import { ajax } from '../../../public/utils/ajax.js'

export default{
    name: 'Login',
    data () {
        // 表单验证
        var checkEmail = (rule, value, callback) => {
            let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            if (value === '') {
                callback(new Error('邮箱不能为空！'))
            }
            if (!reg.test(value)) {
                callback(new Error('请输入正确邮箱'))
            } else {
                callback()
            }
        }
        return {
            userInfo: {
                userEmail: '',
                pwd: ''
            },
            rules: {
                userEmail: [
                    {
                        validator: checkEmail,
                        trigger: 'blur'
                    }
                ],
                pwd: [
                    {
                        required: true,
                        message: '密码不能为空！',
                        trigger: 'blur'
                    }
                ]
            },

            // 记住账号
            remember_flag: false
        }
    },
    methods: {
        // 表单提交
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                console.log(valid)
                if (valid) {
                    console.log(this.userInfo)
                    var data = {
                        email: this.userInfo.userEmail,
                        password: this.userInfo.pwd,
                        remember: this.remember_flag
                    }
                    // ajax.call(this, 'post', '/login', data, (data) => {
                    //     if (data !== '') { // 成功是返回用户的信息
                    //         this.$message({
                    //             showClose: false,
                    //             message: '登录成功',
                    //             type: 'success',
                    //             duration: 1000,
                    //             customClass: 'message success',
                    //             iconClass: 'messageicon'
                    //         })
                    //         // window.location.href="/#/index";
                    //         // window.location.href = '/'
                    this.$router.push('/index')
                    //     }
                    // })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
    // beforeRouteEnter (to, from, next) {
    //     // 获取token
    //     axios.get('/api/token').then(res => {
    //         window.Laravel = {'csrfToken': res.data}
    //         next()
    //     })
    // }
}
</script>
<style lang="sass">
@import '../../sass/theme/_theme.scss';
.login{
    .login-content{
        width: 400px;
        padding: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .textAlign-l{
        text-align: left;
    }
    .fontSize22{
        font-size: 22px;
    }
}
</style>
