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
                    @click.native="handleShowPopup(formItem)">
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
                        <a slot="left" @click="handleClosePopup">关闭</a>
                    </x-header>
                    <FormItem :formItem="formItem"></FormItem>
              </div>
            </popup>
        </div>
	</div>
</template>
<script>
import { Group, Cell, Popup, XSwitch, TransferDom, XButton, XHeader } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import FormItem from 'WAPVIEWS/components/formItem'
import theUserInfoDetail from './userInfoDetail.js'
export default {
    directives: {
        TransferDom
    },
    components: {
        Group, Cell, Popup, XSwitch, XButton, XHeader, FormItem
    },
    data () {
        return {
            isShowPopup: false,
            currentModel: '',
            formData: [],
            formItem: {}
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
    methods: {
        ...mapActions([
            'changeHeaderSetting'
        ]),
        handleSave () {
            console.log(11)
        },
        handleShowPopup (formItem) {
            this.isShowPopup = true
            this.formItem = formItem
        },
        handleClosePopup () {
            this.isShowPopup = false
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
