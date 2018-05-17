<template>
    <div class="waplogin">
        <tab :line-width="1" custom-bar-width="60px">
            <tab-item selected @on-item-click="handleTabClick">登录</tab-item>
            <tab-item @on-item-click="handleTabClick">注册</tab-item>
        </tab>

        <!-- 登录 -->
        <div v-if="index===0" class="login">
            <group class="signIn-group">
                <div v-for="(inputItem,i) in loginData" :key="i">
                    <x-input
                        class="commonInput"
                        :type="inputItem.type ? inputItem.type : 'text'"
                        novalidate
                        :iconType="inputItem.iconType"
                        :placeholder="`请输入${inputItem.title}`"
                        :should-toast-error="false"
                        @on-change="(val) => validatorResultFn('login', inputItem.name, inputItem.rule, val, i)"
                        @on-blur="(val) => validatorResultFn('login', inputItem.name, inputItem.rule, val, i)"
                        v-model="inputItem.value">
                            <i slot="label" :class="`icon iconfont icon-${inputItem.name}`"></i>
                    </x-input>
                    <span v-if="!inputItem.validatorResult.valid">{{inputItem.validatorResult.msg}}</span>
                </div>
            </group>
            <x-button
                type="primary"
                action-type="button"
                style="margin-top:30px; height: 56px; border-radius:99px;"
                @click.native="handleAction('login')">
                登录
            </x-button>
        </div>

        <!-- 注册 -->
        <div v-if="index===1" class="signIn">
            <group class="signIn-group">
                <div v-for="(inputItem,i) in signInData" :key="i">
                    <x-input
                        class="commonInput"
                        :type="inputItem.type ? inputItem.type : 'text'"
                        novalidate
                        :iconType="inputItem.iconType"
                        :placeholder="`请输入${inputItem.title}`"
                        :should-toast-error="false"
                        @on-change="(val) => validatorResultFn('signIn', inputItem.name, inputItem.rule, val, i)"
                        @on-blur="(val) => validatorResultFn('signIn', inputItem.name, inputItem.rule, val, i)"
                        v-model="inputItem.value">
                            <i slot="label" :class="`icon iconfont icon-${inputItem.name}`"></i>
                    </x-input>
                    <span v-if="!inputItem.validatorResult.valid">{{inputItem.validatorResult.msg}}</span>
                </div>
            </group>
            <x-button
                type="primary"
                style="margin-top:30px; height: 56px; border-radius:99px;"
                @click.native="handleAction('signIn')">
                注册
            </x-button>
        </div>
    </div>
</template>
<script>
    import {Tab, TabItem, XButton, XInput, Group, Cell, Toast, ToastPlugin} from 'vux'
    import { validatorFn, checkValid } from 'UTILS/moblieValidator.js'
    import {ajax} from '../utils/ajax.js'
    import { isObject } from 'UTILS/utils.js'
    import { store } from '../utils/commonApi.js'
    Vue.use(ToastPlugin)

    export default{
        name: 'Login',
        components: {
            Tab, TabItem, XButton, XInput, Group, Cell, Toast, ToastPlugin
        },
        data () {
            return {
                index: 0,
                iconType: 'error',
                usercheck: function (value) {
                    console.log(value)
                    return {
                        valid: value == 2333,
                        msg: 'bitian'
                    }
                },
                loginData: [],
                signInData: []
            }
        },
        created () {
            this.loginData = this.loginDataFieldsFn()
            this.signInData = this.signInDataFieldsFn()
        },
        methods: {
            // tabItem 点击时触发
            handleTabClick (index) {
                console.log(4444444)
                this.index = index
                this.loginData = this.loginDataFieldsFn()
                this.signInData = this.signInDataFieldsFn()
            },
            // 验证表单
            validatorResultFn (action, name, rule, value, i) {
                console.log('validatorResult --------------------------------------')
                let input = this[`${action}Data`][i]
                let result = validatorFn(name, rule, value)
                input.validatorResult = result
                input.iconType = !result.valid ? 'error' : ''
                this[`${action}Data`].splice(i, 1, input)
                return result
            },
            // 登录/注册
            handleAction (action) {
                console.log('=========')
                console.log(this[`${action}Data`])
                console.log('=========')
                console.log('handleAction' + `  ${action}Data --------------- `)
                let isCanSibmit = true // 是否可以提交
                this[`${action}Data`].forEach((input, i) => {
                    // 遍历验证每个input
                    let {name, rule, value} = input
                    var result = validatorFn(name, rule, value)
                    input.validatorResult = result
                    // console.log(input)
                    input.iconType = !result.valid ? 'error' : ''
                    isCanSibmit = isCanSibmit && result.valid
                    this.$set(this[`${action}Data`], i, input)
                })
                // console.log(isCanSibmit)
                if (isCanSibmit) {
                    let obj = {}
                    this[`${action}Data`].forEach(v => {
                        obj[v.name] = v['value']
                    })
                    if (action === 'login') { // 登录
                        let data = {
                            name: obj.nameOrPhone,
                            password: obj.password
                        }
                        ajax.call(this, 'post', '/api/domlogin', data).then(res => {
                            if (res.data !== 500 && isObject(res.data)) {
                                console.log(res.data)
                                this.$vux.toast.show('登录成功')
                                this.$router.push('/index/potting')
                            } else {
                                this.$vux.toast.text('登录失败，用户名或密码错误')
                            }
                        })
                    } else { // 注册
                        let data = {
                            name: obj.name,
                            nickname: obj.nickname,
                            password: obj.password,
                            phone: obj.phone,
                            password_confirmation: obj.password_confirmation
                        }
                        console.log(obj)
                        store(this, 'domregister', data)
                            .then(res => {
                                if (res) {
                                    this.$vux.toast.show('注册成功')
                                }
                            })
                    }
                }
            },
            loginDataFieldsFn () {
                return [
                    {
                        name: 'nameOrPhone',
                        title: '用户名',
                        iconType: '',
                        rule: {required: true, method: 'checkValid'},
                        validatorResult: {
                            valid: '',
                            msg: ''
                        },
                        value: ''
                    },
                    {
                        name: 'password',
                        title: '密码',
                        iconType: '',
                        rule: {required: true},
                        validatorResult: {
                            valid: '',
                            msg: ''
                        },
                        value: '',
                        type: 'password'
                    }
                ]
            },
            signInDataFieldsFn () {
                return [
                    {
                        name: 'name',
                        title: '用户名',
                        iconType: '',
                        // validator :为验证的方法
                        // params： 为方法的参数
                        rule: {required: true, validator: checkValid, params: { vm: this, url: 'sysman', field: 'name' }},
                        validatorResult: {
                            valid: '',
                            msg: ''
                        },
                        value: ''
                    },
                    {
                        name: 'nickname',
                        title: '用户昵称',
                        iconType: '',
                        rule: {required: true},
                        validatorResult: {
                            valid: '',
                            msg: ''
                        },
                        value: ''
                    },
                    {
                        name: 'phone',
                        title: '手机号码',
                        iconType: '',
                        rule: {required: true, type: 'phones'},
                        validatorResult: {
                            valid: '',
                            msg: ''
                        },
                        value: ''
                    },
                    {
                        name: 'password',
                        title: '密码',
                        iconType: '',
                        rule: {required: true},
                        validatorResult: {
                            valid: '',
                            msg: ''
                        },
                        value: '',
                        type: 'password'
                    },
                    {
                        name: 'password_confirmation',
                        title: '确认密码',
                        iconType: '',
                        rule: {required: true},
                        validatorResult: {
                            valid: '',
                            msg: ''
                        },
                        value: '',
                        type: 'password'
                    }
                ]
            }
        }
    }
</script>
<style lang="sass">
$theme-color: #1eac94;
.waplogin {
    padding-top: 10%;
    .commonInput{
        border: 1px solid $theme-color;
        border-radius: 30px;
        margin-top: 25px;;
    }
    .signIn, .login{
        width: 80%;
        margin: 0 auto;
    }
    .signIn-group{
    }
    .weui-cells:before{
        border-top: none;
    }
    .weui-cell:before{
        border-top: none;
    }
    .weui-cells:after{
        border-top: none;
    }
}
</style>
