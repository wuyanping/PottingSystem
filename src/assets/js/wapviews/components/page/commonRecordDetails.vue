<!-- 二级详情页 -->
<template>
	<div class="detailsDetails">
		<div class="dd_top">
            <flexbox :gutter="0">
                <flexbox-item :span="3/12" class="txt-c">
                    时间搜索
                </flexbox-item>
                <flexbox-item :span="4/12">
                    <x-input class="dd_inputDate" @click.native="showPlugin(0)" disabled :value="searchDate[0]">
                        <i slot="right" class="icon iconfont icon-date dd_inputIcon" ></i>
                    </x-input>
                </flexbox-item>
                <flexbox-item :span="1/12" class="txt-c">
                    至
                </flexbox-item>
                <flexbox-item :span="4/12">
                    <x-input class="dd_inputDate" @click.native="showPlugin(1)" disabled :value="searchDate[1]">
                        <i slot="right" class="icon iconfont icon-date dd_inputIcon" ></i>
                    </x-input>
                </flexbox-item>
            </flexbox>
        </div>

        <div class="dd_main">
            <panel :list="list" type="5" @on-click-item="handlePanelItem" @on-img-error="onImgError"></panel>
        </div>
        
        <!-- 详情弹框 -->
        <div v-transfer-dom>
            <popup v-model="isShowPopup" height="100%" width='100%' position="right">
                <div class="popup1">
                    <x-header :left-options="{showBack: false}">
                        <a slot="left" @click="handleClose">关闭</a>
                    </x-header>
                    <group>
                        <cell
                            v-for="(item,i) in introduceListField"
                            :key="i"
                            :title="`${item.label}：`"
                            :value="listData[item.field]">
                        </cell>
                    </group>
                </div>
            </popup>
        </div>
	</div>
</template>
<script>
import { XInput, Icon, Flexbox, FlexboxItem, DatetimePlugin, Panel, TransferDom, XHeader, Cell, Popup, Group } from 'vux'
import { isFunction } from 'UTILS/utils.js'
Vue.use(DatetimePlugin)
export default {
    directives: {
        TransferDom
    },
    props: {
        recordDetails: Object,
        route: ''
    },
    components: {
        XHeader,
        // List,
        XInput,
        Icon,
        Flexbox,
        FlexboxItem,
        Panel,
        Cell,
        Popup,
        Group
    },
    computed: {
        title () {
            if (this.recordDetails.title) {
                return this.recordDetails.title
            } else {
                return ''
            }
        },
        hasConditonSelect () {
            if (this.recordDetails.hasConditonSelect) {
                return this.recordDetails.hasConditonSelect
            } else {
                return ''
            }
        },
        hasList () {
            if (this.recordDetails.hasList) {
                return this.recordDetails.hasList
            } else {
                return ''
            }
        },
        commonListField () {
            if (this.recordDetails.commonListField) {
                return this.recordDetails.commonListField
            } else {
                return ''
            }
        },
        introduceListField () {
            if (this.recordDetails.introduceListField) {
                return this.recordDetails.introduceListField
            } else {
                return ''
            }
        }
    },
    data () {
        let date = new Date()
        let dDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return {
            defaultDate: dDate,
            searchDate: [null, null],
            list: [
                {
                    id: 0,
                    src: 'http://somedomain.somdomain/x.jpg',
                    fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    title: '标题一标题一标题一标题一标题一标题一标题一',
                    desc: '由各种物质组'
                },
                {
                    id: 2,
                    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    title: '标题二',
                    desc: '由各种物'
                }
            ],
            listData: {},
            isShowPopup: false
        }
    },
    methods: {
        showPlugin (index) {
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM-DD',
                value: this.defaultDate,
                onConfirm: (val) => {
                    console.log('plugin confirm', val)
                    this.$set(this.searchDate, index, val)
                },
                onShow () {
                    console.log('plugin show')
                },
                onHide () {
                    console.log('plugin hide')
                }
            })
        },
        handlePanelItem (panelItem) {
            console.log(panelItem)
            if (isFunction(this.recordDetails.listItemClickFn)) {
                this.recordDetails.listItemClickFn(this)
            }
        },
        onImgError () {
        },
        handleClose () {
            this.isShowPopup = false
        }
    }
}
</script>
<style lang="sass">
$theme-color: #1eac94;
.detailsDetails{
    .dd_top{
        width: 98%;
        padding: 10px 0px;
        .dd_inputDate{
            border: 1px solid $theme-color;
            .dd_inputIcon{
                color: $theme-color;
                font-size: 20px;
            }
        }
        .weui-cell{
            padding: 0px 13px;
        }
    }
    .dd_main{

    }
}
</style>
