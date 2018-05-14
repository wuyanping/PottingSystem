<template>
	<div>
	   <tab v-model="i">
            <tab-item selected @on-item-click="switchTabItem">申请</tab-item>
            <tab-item  @on-item-click="switchTabItem">邀请</tab-item>
        </tab>
        <div v-for="(item, index) in apply" v-if="i === 0">
            <cell>
                <img slot="icon" style="width: 50px;height: 50px;" :src="defaultSrc">
                <span align-items="flex-start" slot="title">{{item.name}}</span>
                <span slot="inline-desc" class="list-inlinedesc">{{`申请人：${item.user_id}`}}</span>
                <x-button type="primary">是否通过</x-button>
            </cell>
        </div>
        <div v-for="(item, index) in invite" v-if="i === 1">
            <cell>
                <img slot="icon" style="width: 50px;height: 50px;" :src="defaultSrc">
                <span align-items="flex-start" slot="title">{{item.name}}</span>
                <span slot="inline-desc" class="list-inlinedesc">{{`邀请人：${item.user_id}`}}</span>
                <x-button type="primary">是否通过</x-button>
            </cell>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Tab, TabItem, Swiper, SwiperItem, Cell, XButton, LoadingPlugin } from 'vux'
import { index } from 'UTILS/commonApi'
Vue.use(LoadingPlugin)

export default {
    data () {
        return {
            apply: [{
                name: '向日葵',
                user_id: 1
            },
            {
                name: '丁香',
                user_id: 1
            }],
            invite: [{
                name: '百合',
                user_id: 1
            },
            {
                name: '薰衣草',
                user_id: 1
            }],
            i: 0,
            defaultSrc: '../../../../../../static/image/company_default_logo.png'
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
                text: 'loading'
            })
            setTimeout(() => {
                this.$vux.loading.hide()
            }, 1000)
            if (i === 0) {
                index(this, 'apply')
                    .then(res => {
                        console.log(res)
                    })
            }
        }
    },
    mounted () {
        console.log(this.date)
        console.log(this.list1)
    },
    created () {
    	this.changeHeaderSetting({...this.headerSetting, showBack: true, title: '盆栽管理'})
    },
    components: {
        Tab, TabItem, Swiper, SwiperItem, Cell, XButton
    }
}
</script>