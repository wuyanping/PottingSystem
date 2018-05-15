<template>
	<div>
	   <tab v-model="i">
            <tab-item selected @on-item-click="switchTabItem">申请</tab-item>
            <tab-item  @on-item-click="switchTabItem">邀请</tab-item>
        </tab>
        <div v-for="(item, index) in apply" v-if="i === 0"><!-- 
            <load-more tip="正在刷新" v-if="showPullDown"></load-more> -->
            <cell>
                <img slot="icon" style="width: 50px;height: 50px;" :src="item.avatar ? item.avatar : defaultSrc">
                <span align-items="flex-start" slot="title">{{item.pot_id}}</span>
                <span slot="inline-desc" class="list-inlinedesc">{{`申请人：${item.apply_user_name}`}}</span>
                <x-button v-if="!item.isagree" type="primary" @click.native="handlerPass(item.id)">是否通过</x-button>
                <x-button v-else disabled>通过</x-button>
            </cell>
        </div>
        
        <div v-for="(item, index) in apply" v-if="i === 1">
            <!-- <load-more tip="正在刷新" v-if="showPullDown"></load-more> -->
            <cell>
                <img slot="icon" style="width: 50px;height: 50px;" :src="item.avatar ? item.avatar : defaultSrc">
                <span align-items="flex-start" slot="title">{{item.pot_id}}</span>
                <span slot="inline-desc" class="list-inlinedesc">{{`申请人：${item.apply_user_name}`}}</span>
                <x-button v-if="!item.isagree" type="primary" @click.native="handlerPass(item.id)">是否通过</x-button>
                <x-button v-else disabled>通过</x-button>
            </cell>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Tab, TabItem, Swiper, SwiperItem, Cell, XButton, LoadingPlugin, XSwitch, LoadMore } from 'vux'
import { ajax } from 'UTILS/ajax'
import { index } from 'UTILS/commonApi'
Vue.use(LoadingPlugin)

export default {
    data () {
        return {
            apply: [
                // {
                //     name: '向日葵',
                //     user_id: 1
                // }
            ],
            invite: [
                // {
                //     name: '百合',
                //     user_id: 1
                // }
            ],
            i: 0,
            defaultSrc: './static/image/company_default_logo.png',
            showPullDown: false, // 下拉刷新
            showLoading: false
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
        switchTabItem (i) {
            this.$vux.loading.show({
                text: '加载中'
            })
            setTimeout(() => {
                this.$vux.loading.hide()
            }, 1000)
            this.getApplyList()
        },
        getApplyList (query = {page: 1}) {
            let arr = ['']
            query = {
                type: this.i
            }
            index(this, 'apply', query).then(res => {
                console.log(res)
                this.apply = []
                this.apply = res
            })
        },
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
        swtich_option_tableData ({data, id}) {
            // data = this.model.tableFieldFn ? this.model.tableFieldFn(data) : data
            this.apply.forEach(v => {
                if (v.id === id) {
                    v.isagree = data.isagree
                }
            })
        }
    },
    mounted () {
        if (this.i === 0) {
            this.getApplyList()
        }
    },
    created () {
        this.changeHeaderSetting({...this.headerSetting, showBack: true, title: '盆栽管理'})
    },
    components: {
        Tab, TabItem, Swiper, SwiperItem, Cell, XButton, XSwitch, LoadMore
    }
}
</script>

<style lang="sass">
    .weui-label{
        color: #000;
    }
</style>