<template>
	<div class="potManage">
	   <tab v-model="i" class="potManage_tap">
            <tab-item selected @on-item-click="switchTabItem">申请</tab-item>
            <tab-item  @on-item-click="switchTabItem">邀请</tab-item>
        </tab>
        <div class="potManage_main">
            <div class="potManage_main_content">
                <group title="tip:别人申请加入我的盆栽列表" v-if="i === 0">
                    <load-more v-if="list.length === 0" :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
                    <div v-for="(item, index) in list" v-else>
                        <cell @click.native="seeDetails(index)">
                            <img slot="icon" style="width: 50px;height: 50px;" :src="item.avatar ? item.avatar : defaultSrc">
                            <span align-items="flex-start" slot="title">申请加入的盆栽：{{item.pot_id}}</span>
                            <span slot="inline-desc" class="list-inlinedesc">{{`申请人：${item.apply_user_name}`}}</span>
                            <x-button v-if="!item.isagree" type="primary" @click.native.stop="handlerPass(item.id)">是否通过</x-button>
                            <x-button v-else disabled>通过</x-button>
                        </cell>
                    </div>
                </group>
                
                <group title="tip:别人邀请我加入他人的盆栽列表" v-if="i === 1">
                    <load-more v-if="list.length === 0" :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
                    <div v-for="(item, index) in list" v-else>
                        <!-- <load-more tip="正在刷新" v-if="showPullDown"></load-more> -->
                        <cell>
                            <img slot="icon" style="width: 50px;height: 50px;" :src="item.avatar ? item.avatar : defaultSrc">
                            <span align-items="flex-start" slot="title">被邀请加入的盆栽：{{item.pot_id}}</span>
                            <span slot="inline-desc" class="list-inlinedesc">邀请人：{{item.apply_user_name}}</span>
                            <x-button v-if="!item.isagree" type="primary" @click.native.stop="handlerPass(item.id)">是否通过</x-button>
                            <x-button v-else disabled>通过</x-button>
                        </cell>
                    </div>
                </group>
            </div>
                
        </div>
            

        <!-- 邀请/申请的盆栽 详情弹框 -->
        <PopupShowForm
            :isShowPopup="isShowPopup"
            :introduceListField="introduceListField"
            :listData="listData"
            @close="handleClose">
        </PopupShowForm>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Tab, TabItem, Swiper, SwiperItem, Cell, XButton, LoadingPlugin, XSwitch, LoadMore, Group } from 'vux'
import PopupShowForm from 'WAPVIEWS/components/input/popupShowForm.vue'
import { ajax } from 'UTILS/ajax'
import { index } from 'UTILS/commonApi'
Vue.use(LoadingPlugin)

export default {
    data () {
        return {
            list: [],
            i: 0,
            // 图片默认路径
            defaultSrc: './static/image/company_default_logo.png',
            showPullDown: false, // 下拉刷新
            showLoading: false,
            isShowPopup: false,
            introduceListField: [
                {
                    label: '备注',
                    field: 'memo'
                }
            ],
            listData: {}
        }
    },
    computed: {
        ...mapGetters([
            'headerSetting'
        ])
    },
    methods: {
        ...mapActions([
            'changeHeaderSetting'
        ]),
        // 切换tab
        switchTabItem (i) {
            this.$vux.loading.show({
                text: '加载中'
            })
            setTimeout(() => {
                this.$vux.loading.hide()
            }, 1000)
            this.getList()
        },
        // 获取 申请/邀请 数据
        getList (query = {page: 1}) {
            let arr = ['']
            query = {
                type: this.i
            }
            index(this, 'apply', query).then(res => {
                console.log(res)
                this.list = []
                this.list = res
            })
        },
        // 点击通过
        handlerPass (id) {
            // 更改盆栽通过状态
            let params = {
                status: true
            }
            ajax('put', this.$apiUrl(`apply/${id}`), params, data => {
                console.log(data)
                if (data !== 500) {
                    this.swtich_option_tableData({data: data, id: data.id})
                    this.$mg(this, '已通过', 'success', 1000)
                }
            })
        },
        // 通过后替换当前列表中的数据
        swtich_option_tableData ({data, id}) {
            // data = this.model.tableFieldFn ? this.model.tableFieldFn(data) : data
            this.list.forEach(v => {
                if (v.id === id) {
                    v.isagree = data.isagree
                }
            })
        },
        // 查看信息
        seeDetails (i) {
            this.isShowPopup = true
            this.listData = this.list[i]
            console.log(this.listData)
        },
        handleClose () {
            this.isShowPopup = false
        }
    },
    mounted () {
    },
    created () {
        this.changeHeaderSetting({...this.headerSetting, showBack: true, title: '盆栽管理'})
        if (this.i === 0) {
            this.getList()
        }
    },
    components: {
        PopupShowForm, Tab, TabItem, Swiper, SwiperItem, Cell, XButton, XSwitch, LoadMore, Group
    }
}
</script>

<style lang="sass">
.potManage{
    height: 100%;
    position: relative;
    .potManage_tap{
        width: 100%;
        padding: 5px;
        box-sizing: border-box;
        color: #727071;
        position: absolute;
        left: 0;
        top: 0;
        background-color: white;
        z-index: 5;
    }
    .potManage_main{
        height: 100%;
        padding-top: 40px;
        box-sizing: border-box;
        .potManage_main_content{
            height: 100%;
            overflow: auto;
        }
    }
    .weui-label{
        color: #000;
    }
}
</style>