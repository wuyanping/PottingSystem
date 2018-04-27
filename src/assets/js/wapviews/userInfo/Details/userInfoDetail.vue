<template>
    <div class="userInfoDetail">
        <div class="infoList">
            <group>
                <cell
                    v-for="(formItem, i) in formData"
                    :key="i"
                    :title="formItem.label"
                    :value="formItem.value"
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
                    <x-header :left-options="{showBack: false}" :title="`设置${formItem.label}`">
                        <a slot="left" @click="handleCancelPopup">取消</a>
                        <a slot="right" @click="handleFinishPopup" v-if='isShowFinish'>完成</a>
                    </x-header>
                    <FormItem
                        :formItem="formItem"
                        @changeIsShowFinish="changeIsShowFinish"
                    ></FormItem>
              </div>
            </popup>
        </div>
    </div>
</template>
<script>
import { Group, Cell, Popup, XSwitch, TransferDom, XButton, XHeader, AlertPlugin } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import FormItem from 'WAPVIEWS/components/formItem'
import theUserInfoDetail from './userInfoDetail.js'
Vue.use(AlertPlugin)
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
            isShowFinish: false,
            // 当前模块
            currentModel: '',
            formData: [],
            formItem: {
                component: '',
                label: '',
                field: '',
                iconType: '',
                rule: {required: true},
                validatorResult: {
                    valid: '',
                    msg: ''
                },
                value: ''
            },
            i: 0,
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
    },
    methods: {
        ...mapActions([
            'changeHeaderSetting'
        ]),
        handleSave () {
            console.log(11)
        },
        handleShowPopup (i) {
            this.isShowPopup = true
            this.i = i
            this.formItem = Object.assign({}, this.formData[i])
            this.oldFormItem = Object.assign({}, this.formItem)
        },
        handleFinishPopup () {
            let { iconType, validatorResult } = this.formItem
            console.log(iconType)
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
            }
        },
        handleCancelPopup () {
            this.isShowPopup = false
            this.formItem = Object.assign({}, this.oldFormItem)
            this.$set(this.formData, this.i, this.oldFormItem)
        },
        // 设置表单对话框数据
        setFormData (row = {}) {
            let formField = this.currentModel.formField()
            formField.forEach(item => {
                // 在打开对话框同时赋值
                if (Object.keys(row).includes(item['field'])) {
                    if (item.customEditFn) {
                        item['value'] = item.customEditFn(row[item['field']])
                    } else {
                        item['value'] = row[item['field']]
                    }
                }
            })
            return formField
        },
        changeIsShowFinish (value) {
            let bol = false
            console.log(this.formItem.value, this.oldFormItem.value)
            if (this.formItem.value !== this.oldFormItem.value) {
                bol = true
            } else {
                bol = false
            }
            this.isShowFinish = bol
        }
    }
}
</script>
<style lang="sass">
$theme-color: #1eac94;
.userInfoDetail{
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
        margin: 50px auto 0px;
        border-color: $theme-color;
        color: $theme-color;
    }
}
</style>
