<template>
    <div class="waplogin">
        <tab :line-width="1" custom-bar-width="60px">
            <tab-item selected @on-item-click="handleTabClick">登录</tab-item>
            <tab-item @on-item-click="handleTabClick">注册</tab-item>
        </tab>
        <div v-if="index===0" class="login">
            <group class="signIn-group">
                <x-input
                    v-for="(inputItem,i) in loginData"
                    :key="i"
                    class="commonInput"
                    type="text"
                    :is-type='validatorFn(inputItem.name, inputItem.rule, inputItem.value)'
                    :iconType="inputItem.iconType"
                    :placeholder="`请输入${inputItem.title}`"
                    v-model="inputItem.value">
                        <i slot="label" :class="`icon iconfont icon-${inputItem.name}`"></i>
                </x-input>
            </group>
            <x-button
                type="primary"
                style="margin-top:30px; height: 56px; border-radius:99px;"
                @click.native="handleLogin">
                登录
            </x-button>
        </div>
        <div v-if="index===1" class="signIn">
            <group class="signIn-group">
                <x-input
                    v-for="(inputItem,i) in signInData"
                    :key="i"
                    class="commonInput"
                    type="text"
                    :is-type='usercheck'
                    :iconType="inputItem.iconType"
                    :placeholder="`请输入${inputItem.title}`"
                    v-model="inputItem.value">
                        <i slot="label" :class="`icon iconfont icon-${inputItem.name}`"></i>
                </x-input>
            </group>
            <x-button
                type="primary"
                style="margin-top:30px; height: 56px; border-radius:99px;"
                @click.native="handleSignIn">
                注册
            </x-button>
        </div>
    </div>
</template>
<script>
    import {Tab, TabItem, XButton, XInput, Group, Cell, Toast} from 'vux'
    import {validatorFn} from 'UTILS/moblieValidator.js'
    export default{
        name: 'Login',
        components: {
            Tab, TabItem, XButton, XInput, Group, Cell, Toast
        },
        data () {
            return {
                index: 0,
                usercheck: function (value) {
                    console.log(value)
                    return {
                        valid: value.length > 0,
                        msg: 'bitian'
                    }
                },
                loginData: [
                    {
                        name: 'nameOrPhone',
                        title: '用户名或手机号码',
                        iconType: '',
                        rule: {required: false},
                        value: ''
                    },
                    {
                        name: 'password',
                        title: '密码',
                        iconType: '',
                        rule: {required: false},
                        value: ''
                    }
                ],
                signInData: [
                    {
                        name: 'name',
                        title: '用户名',
                        iconType: '',
                        rule: {required: false},
                        value: ''
                    },
                    {
                        name: 'nickname',
                        title: '用户昵称',
                        iconType: '',
                        rule: {required: false},
                        value: ''
                    },
                    {
                        name: 'phone',
                        title: '手机号码',
                        iconType: '',
                        rule: {required: false},
                        value: ''
                    },
                    {
                        name: 'password',
                        title: '密码',
                        iconType: '',
                        rule: {required: false},
                        value: ''
                    }
                ]
            }
        },
        methods: {
            // tabItem 点击时触发
            handleTabClick (index) {
                this.index = index
            },
            change (val) {
                console.log('on change', this.usercheck)
            },
            handleSignIn () {
                console.log('handleSignIn')
                console.log(this.signInData)
            },
            handleLogin () {
                console.log('handleLogin')
                console.log(this.loginData)
            },
            validatorFn (name, rule, value) {
                console.log(validatorFn(name, rule, value))
                // return obj
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
