<template>
    <div class="basic">
    	<div class="basic_top" v-if="hasConditonSelect">
    		<flexbox>
                <flexbox-item :span="5">
                    <div class="basic_top_l">
                        <span class="active">全部盆栽</span>
                        <span @click="newForm">新增盆栽</span>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <x-input class="weui-vcode basic_top_r">
                        <icon slot="right" type="search"></icon>
                    </x-input>
                </flexbox-item>
            </flexbox>
    	</div>
        <div class="basic_list" v-if="hasList">
            <panel :list="list" type="5" @on-click-item="handlePanelItem" @on-img-error="onImgError"></panel>
        </div>
        
        <!-- 新建弹框 -->
        <PopupForm 
            :formData="formData"
            :isShowPopup="isShowPopup"
            :isShowSibmitBtn="true"
            @closePopup="closePopup"
        ></PopupForm>
    </div>
</template>
<script>
import { XInput, Group, Icon, Flexbox, FlexboxItem, Panel, Popup, Cell } from 'vux'
import FormItem from '../formItem.vue'
import PopupForm from '../popupForm.vue'
import { isFunction } from 'UTILS/utils.js'
export default {
    components: {
        // List,
        XInput,
        Group,
        Icon,
        Flexbox,
        FlexboxItem,
        Panel,
        Cell,
        FormItem,
        PopupForm
    },
    props: {
        model: {
            type: Object,
            default () {
                return {}
            }
        },
        route: {
            type: String,
            default: ''
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
            list: [
                {
                    id: 0,
                    src: 'http://somedomain.somdomain/x.jpg',
                    fallbackSrc: './static/image/company_default_logo.png',
                    title: '标题一标题一标题一标题一标题一标题一标题一',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                }
            ],
            isShowPopup: false,
            formData: []
        }
    },
    methods: {
        onImgError (item, $event) {
            console.log(item, $event)
        },
        handlePanelItem (panelItem) {
            console.log(panelItem)
            console.log(this.model)
            if (isFunction(this.model.listItemClickFn)) {
                this.model.listItemClickFn(this, panelItem)
            }
        },
        // 新增表单
        newForm () {
            this.isShowPopup = true
            this.formData = this.model.formField()
            console.log(this.formData)
        },
        // 关闭表单
        handleClose () {
            this.isShowPopup = false
        },
        changeIsShowFinish () {},
        // 提交表单
        sibmitForm () {

        },
        closePopup () {
            this.isShowPopup = false
        }
    }
}
</script>

<style lang="sass">
.basic {
    .basic_top{
        padding: 5px;
        color: #727071;
        .basic_top_l {
            >span{
                display:inline-block;
                padding: 5px;
            }
            >span:first-child{
                border-right: 1px solid #c6c5ca;
            }
            >span.active{
                color: #1eac94;
            }
        }
        .basic_top_r{
            border: 1px solid #78c1ae;
        }
        .weui-cell{
            padding: 5px 13px;
        }
    }
    .basic_list{
        .weui-cells{
            margin-top:5px;
        }
    }
    .popup1 {
        width:100%;
        height:100%;
    }
}
</style>
