<template>
    <div class="waplogin">
        <tab :line-width="1" custom-bar-width="60px" v-model="index">
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
                        @on-change="(val) => validatorResultFn('login', inputItem.name, inputItem.rule, val, i, loginData)"
                        @on-blur="(val) => validatorResultFn('login', inputItem.name, inputItem.rule, val, i, loginData)"
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
                        @on-change="(val) => validatorResultFn('signIn', inputItem.name, inputItem.rule, val, i, signInData)"
                        @on-blur="(val) => validatorResultFn('signIn', inputItem.name, inputItem.rule, val, i, signInData)"
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
    import { validatorFn, checkValid, checkPassword } from 'UTILS/moblieValidator.js'
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
                this.index = index
                this.loginData = this.loginDataFieldsFn()
                this.signInData = this.signInDataFieldsFn()
            },
            // 验证表单
            validatorResultFn (action, name, rule, value, i, formAllData) {
                let input = this[`${action}Data`][i]
                new Promise((resolve) => {
                    validatorFn(name, rule, value, formAllData, (undefined, data) => resolve(data))
                }).then(data => {
                    let result = data
                    input.validatorResult = result
                    input.iconType = !result.valid ? 'error' : ''
                    this[`${action}Data`].splice(i, 1, input)
                    return result
                })
            },
            // 登录/注册
            handleAction (action) {
                let isCanSibmit = true // 是否可以提交
                let promiseArr = [] // 存储每个验证的promise
                this[`${action}Data`].forEach((input, i) => {
                    let p = new Promise((resolve) => {
                        let {name, rule, value} = input
                        validatorFn(name, rule, value, this[`${action}Data`], (undefined, data) => resolve(data))
                    })
                    promiseArr.push(p)
                })
                // 同时执行所有的存储验证promise，并在它们都完成后执行then: 获得一个Array
                Promise.all(promiseArr).then(results => {
                    // 返回一个数组后，把结果循环给data，并判断isCanSibmit 是否可以通过
                    this[`${action}Data`].forEach((input, i) => {
                        input.validatorResult = results[i]
                        input.iconType = !results[i].valid ? 'error' : ''
                        isCanSibmit = isCanSibmit && results[i].valid
                        this.$set(this[`${action}Data`], i, input)
                    })
                    // 全部验证成功，通过
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
                            ajax.call(this, 'post', '/domlogin', data).then(res => {
                                if (res.data !== 500 && isObject(res.data)) {
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
                            store(this, 'domregister', data)
                                .then(res => {
                                    if (res) {
                                        this.$vux.toast.show('注册成功')
                                        this.signInData = this.signInDataFieldsFn()
                                        this.index = 0
                                    }
                                })
                        }
                    } else { // 验证失败，不通过
                        this.$vux.toast.text('填入的数据验证失败')
                    }
                })
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
                        rule: {
                            required: true,
                            validator: checkValid,
                            params: { vm: this, url: 'sysman', field: 'name' }
                        },
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
                        rule: {
                            required: true,
                            validator: checkPassword,
                            params: {
                                vm: this,
                                field: 'password',
                                checkField: 'password_confirmation'
                            }
                        },
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
                        rule: {
                            required: true,
                            validator: checkPassword,
                            params: {
                                vm: this,
                                field: 'password_confirmation',
                                checkField: 'password'
                            }
                        },
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
