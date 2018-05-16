<template>
    <div class="userInfoDetail h100">
        <div class="infoList">
            <group>
                <cell
                    v-for="(formItem, i) in formData"
                    :key="i"
                    :title="formItem.title"
                    :value="formItem.specialHandlingValue ? formItem.specialHandlingValue(formItem.options, formItem.value) : formItem.value"
                    is-link
                    @click.native="handleShowPopup(i)">
                </cell>
            </group>
        </div>
        <x-button
            class= "saveBtn"
            plain
            type="primary"
            @click.native="handleSave">
            保存
        </x-button>
        <div v-transfer-dom>
            <popup v-model="isShowPopup" height="100%">
                <div class="popup1">
                    <x-header :left-options="{showBack: false}" :title="i ? `设置${formData[i].title}` : ''">
                        <a slot="left" @click="handleCancelPopup">取消</a>
                        <a slot="right" @click="handleFinishPopup" v-if='isShowFinish'>完成</a>
                    </x-header>
                    <group>
                        <FormItem
                            :formItem="formData[i]"
                            :isShowMsg="true"
                            @changeIsShowFinish="changeIsShowFinish"
                        ></FormItem>
                    </group>
              </div>
            </popup>
        </div>
    </div>
</template>
<script>
import { Group, Cell, Popup, XSwitch, TransferDom, XButton, XHeader, AlertPlugin, ToastPlugin } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import FormItem from 'WAPVIEWS/components/input/formItem'
import theUserInfoDetail from './userInfoDetail.js'
import {validatorFn} from 'UTILS/moblieValidator.js'
import { serializeData } from 'UTILS/utils.js'
import { update } from 'UTILS/commonApi.js'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

export default {
    directives: {
        TransferDom
    },
    components: {
        Group, Cell, Popup, XSwitch, XButton, XHeader, FormItem
    },
    data () {
        return {
            // 是否显示popup组件
            isShowPopup: false,
            // 是否显示完成
            isShowFinish: true,
            // 当前模块
            currentModel: '',
            formData: [],
            i: null,
            oldFormItem: {}
        }
    },
    computed: {
        ...mapGetters([
            'headerSetting'
        ])
    },
    created () {
        console.log(this.$route)
        if (this.$route.params.id) {
            this.currentModel = theUserInfoDetail[this.$route.params.id]
            this.formData = this.setFormData()
        }
        console.log(this.formData)
        this.changeHeaderSetting({...this.headerSetting, showBack: true, title: this.currentModel.title})
    },
    mounted () {
        this.getUserInfo()
    },
    methods: {
        ...mapActions([
            'changeHeaderSetting'
        ]),
        // 保存
        handleSave () {
            let isCanSibmit = true // 是否可以提交
            this.formData.forEach((input, i) => {
                // 遍历验证每个input
                let {name, rule, value} = input
                var result = validatorFn(name, rule, value)
                input.validatorResult = result
                input.iconType = !result.valid ? 'error' : ''
                isCanSibmit = isCanSibmit && result.valid
                this.$set(this.formData, i, input)
            })
            if (isCanSibmit) {
                let flag = this.$route.params.id
                let params = {...serializeData(this.formData)}
                if (flag && flag === Object.keys(theUserInfoDetail)[0]) {
                    update(this, 'user', this.formData['id'], params)
                        .then(res => {
                            if (res !== 500) {
                                this.$vux.toast.show('修改成功', 'middle')
                                this.$router.go(-1)
                            }
                        })
                } else {
                    console.log(this.formData)
                    update(this, 'user', this.formData['id'], params)
                        .then(res => {
                            if (res !== 500) {
                                this.$vux.toast.show('修改成功', 'middle')
                                this.$router.go(-1)
                            } else {
                                this.$vux.toast.text('修改失败，原始密码错误')
                            }
                        })
                    console.log(window.bdUser)
                }
            } else {
                console.log('验证失败')
                this.$vux.alert.show({
                    title: '内容验证提示',
                    content: '验证失败',
                    buttonText: '我知道了'
                })
            }
        },
        // 弹窗编辑弹框
        handleShowPopup (i) {
            console.log(i)
            this.isShowPopup = true
            this.i = i
            console.log(this.formData[i].title)
            this.oldFormItem = Object.assign({}, this.formData[i])
        },
        // 取消编辑弹框， 不改变原来的数据
        handleCancelPopup () {
            this.isShowPopup = false
            this.$set(this.formData, this.i, this.oldFormItem)
        },
        // 完成编辑弹框
        handleFinishPopup () {
            let { iconType, validatorResult } = this.formData[this.i]
            if (iconType === 'error') {
                this.$vux.alert.show({
                    title: '内容验证提示',
                    content: validatorResult.msg,
                    buttonText: '我知道了',
                    onShow () {
                        console.log('Plugin: I\'m showing')
                    },
                    onHide () {
                        console.log('Plugin: I\'m hiding now')
                    }
                })
            } else {
                this.isShowPopup = false
            }
        },
        // 设置表单对话框数据
        setFormData (row = {}) {
            let formField = this.currentModel.formField()
            formField.forEach(item => {
                // 在打开对话框同时赋值
                if (Object.keys(row).includes(item['name'])) {
                    if (item.customEditFn) {
                        item['value'] = item.customEditFn(row[item['name']])
                    } else {
                        item['value'] = row[item['name']]
                    }
                }
            })
            return formField
        },
        // 是否出现完成按钮
        changeIsShowFinish (value) {
        //     let bol = false
        //     console.log(this.formData[this.i].value, this.oldFormItem.value)
        //     if (this.formData[this.i].value !== this.oldFormItem.value) {
        //         bol = true
        //     } else {
        //         bol = false
        //     }
        //     this.isShowFinish = bol
        },
        getUserInfo () {
            let user = window.bdUser ? window.bdUser : {}
            this.formData.forEach(v => {
                Object.keys(user).forEach(i => {
                    if (v.name === i) {
                        v.value = user[i]
                    }
                })
            })
            this.formData['id'] = user['id']
        }
    }
}
</script>
<style lang="sass">
$theme-color: #1eac94;
.userInfoDetail{
    height: 100%;
    overflow: auto;
    .infoList{
        .weui-cells{
            margin-top: 0;
            .weui-cell{
                padding: 20px 15px;
            }
        }
    }
    .popup1 {
        width:100%;
        height:100%;
    }
    .saveBtn{
        height: 56px;
        border-radius:20px;
        width: 80%;
        margin: 50px auto;
        border-color: $theme-color;
        color: $theme-color;
    }
}
</style>
