<!-- 表单弹框组件 -->
<template>
	<!-- 新建弹框 -->
    <div v-transfer-dom class="popupForm">
        <popup v-model="isShowPopup" height="100%" width='100%' position="right">
            <div class="popup1">
                <x-header class="popupForm_header" :left-options="{showBack: false}"> 
                    <a slot="left" @click="handleClose">关闭</a>
                </x-header>
                
                <div class="popupForm_main">
                    <group class="popupForm_main_group">
                        <FormItem
                            v-for="(formItem,i) in formData"
                            :key="i"
                            :formData="formData"
                            :formItem="formItem"
                            :isShowMsg="true"
                            :isShowTiTle="true"
                            @changeIsShowFinish="changeIsShowFinish"
                        ></FormItem>
                    </group>
                </div>
                <x-button
                    class="popupForm_footer"
                    v-if="isShowSibmitBtn"
                    type="primary"
                    action-type="button"
                    style="margin-top:30px; height: 56px; border-radius:99px;"
                    @click.native="sibmitForm">
                    提交
                </x-button>
            </div>
        </popup>
    </div>
</template>
<script>
import { Group, Popup, TransferDom, XHeader, XButton, AlertPlugin } from 'vux'
import FormItem from './formItem.vue'
import { isFunction, serializeData } from 'UTILS/utils.js'
import {validatorFn} from 'UTILS/moblieValidator.js'
import { store } from 'UTILS/commonApi.js'
Vue.use(AlertPlugin)
export default {
    directives: {
        TransferDom
    },
    components: {
        Group,
        Popup,
        XHeader,
        XButton,
        FormItem
    },
    props: {
        formData: {
            type: Array,
            default () {
                return []
            }
        },
        // 是否弹出弹框
        isShowPopup: {
            type: Boolean,
            default: false
        },
        // 是否显示提交按钮
        isShowSibmitBtn: {
        	type: Boolean,
            default: false
        }
    },
    computed: {
        hasConditonSelect () {
            if (this.model.hasConditonSelect) {
                return this.model.hasConditonSelect
            } else {
                return false
            }
        },
        hasList () {
            if (this.model.hasList) {
                return this.model.hasList
            } else {
                return false
            }
        },
        commonListField () {
            if (this.model.commonListField) {
                return this.model.commonListField
            } else {
                return []
            }
        }
    },
    data () {
        return {
        }
    },
    methods: {
        // 关闭表单
        handleClose () {
            this.$emit('closePopup')
        },

        changeIsShowFinish () {},

        // 提交表单
        sibmitForm () {
            let promiseArr = [] // 存储每个验证的promise
        	let isCanSibmit = true // 是否可以提交

            this.formData.forEach((input, i) => {
                let p = new Promise((resolve) => {
                    let {name, rule, value} = input
                    validatorFn(name, rule, value, this.formData, (undefined, data) => resolve(data))
                })
                promiseArr.push(p)
            })

            // 同时执行所有的存储验证promise，并在它们都完成后执行then: 获得一个Array
            Promise.all(promiseArr).then(results => {
                // 返回一个数组后，把结果循环给data，并判断isCanSibmit 是否可以通过
                this.formData.forEach((input, i) => {
                    input.validatorResult = results[i]
                    input.iconType = !results[i].valid ? 'error' : ''
                    isCanSibmit = isCanSibmit && results[i].valid
                    this.$set(this.formData, i, input)
                })
                if (isCanSibmit) {
                    if (isCanSibmit) {
                        this.$emit('handleSubmit')
                    } else {
                        this.$vux.alert.show({
                            title: '内容验证提示',
                            content: '验证失败',
                            buttonText: '我知道了'
                        })
                    }
                }
            })
        }
    }
}
</script>

<style lang="sass">
.popupForm{
    .popup1{
        height:100%;
        position: relative;
    }
    .popupForm_header{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .popupForm_main{
        height: 100%;
        padding-top: 46px;
        padding-bottom: 86px;
        box-sizing: border-box;
        .popupForm_main_group{
            height: 100%;
            overflow: auto;
        }
    }
    .popupForm_footer{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
    }
}
</style>
