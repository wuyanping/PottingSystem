<!-- 表单弹框组件 -->
<template>
	<div class="popupForm">
		<!-- 新建弹框 -->
	    <div v-transfer-dom>
	        <popup v-model="isShowPopup" height="100%" width='100%' position="right">
	            <div class="popup1">
	                <x-header :left-options="{showBack: false}"> 
	                    <a slot="left" @click="handleClose">关闭</a>
	                </x-header>
	                <group>
	                    <FormItem
	                        v-for="(formItem,i) in formData"
                            :key="i"
                            :formData="formData"
	                        :formItem="formItem"
	                        :isShowMsg="true"
	                        :isShowTiTle="true"
	                        @changeIsShowFinish="changeIsShowFinish"
	                    ></FormItem>
	                    <x-button
	                    	v-if="isShowSibmitBtn"
	                        type="primary"
	                        action-type="button"
	                        style="margin-top:30px; height: 56px; border-radius:99px;"
	                        @click.native="sibmitForm">
	                        提交
	                    </x-button>
	                </group>
	            </div>
	        </popup>
	    </div>
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
                        console.log('可以提交了')
                    } else {
                        console.log('验证失败')
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
</style>
