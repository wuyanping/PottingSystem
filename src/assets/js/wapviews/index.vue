<template>
    <div class="moblie_wrap w100 h100 commonwap">
        <div class="moblie_header">
            <x-header 
                :left-options="{showBack: headerSetting.showBack, backText: headerSetting.backText}"
                >
                    {{headerSetting.title}}
            </x-header>
        </div>
            
        <div class="moblie_main">
            <router-view></router-view>
        </div>

        <div class="moblie_tabBar">
            <tabbar v-model="index">
                <tabbar-item
                    v-for="(tabItem,i) in tabbarData"
                    :key="i"
                    :link="tabItem.path"
                    :index="i"
                    @on-item-click="handleTabBarItem(i)">
                        <i slot="icon" :class="`icon iconfont icon-${tabItem.icon}`"></i>
                        <span slot="label">{{tabItem.title}}</span>
                </tabbar-item>
            </tabbar>
        </div>
    </div>
</template>

<script>
import { ajax } from 'UTILS/ajax'
import {Tabbar, TabbarItem, Group, Cell, XHeader} from 'vux'
import menu from './menu.js'
import { mapGetters, mapActions } from 'vuex'
export default{
    name: 'wapIndex',
    components: {
        Tabbar, TabbarItem, Group, Cell, XHeader
    },
    data () {
        return {
            index: 0,
            tabbarData: [
                {
                    title: '盆栽列表',
                    path: '/index/potting',
                    icon: 'potting'
                },
                {
                    title: '我的盆栽',
                    path: '/index/myPotting',
                    icon: 'myPotting'
                },
                {
                    title: '个人信息',
                    path: '/index/userInfo',
                    icon: 'userInfo'
                }
            ]
        }
    },
    computed: {
        ...mapGetters([
            'headerSetting'
        ])
    },
    created () {
        this.index = this.tabbarData.findIndex(item => {
            return this.$route.path.includes(item.path)
        })
    },
    mounted () {
        this.headerSetting.title = this.tabbarData[this.index].title
    },
    methods: {
        ...mapActions([
            'changeHeaderSetting'
        ]),
        // tabBarItem点击的时候
        handleTabBarItem (i) {
            console.log(111111111)
            this.changeHeaderSetting({...this.headerSetting, title: this.tabbarData[i].title})
        }
        // setHeader ({key, value}) {
        //     console.log(key, value)
        //     this.headerSetting[key] = value
        // }
    }
}
</script>

<style lang="sass" scoped>
.moblie_wrap{
    .moblie_header{
        position: fixed;
        width: 100%;
        top: 0px;
        left: 0px;
    }
    .moblie_main{
        max-height: 100%;
        padding-top: 46px;
        padding-bottom: 53px;
        overflow: auto;
    }
    .moblie_tabBar{
        position: fixed;
        width: 100%;
        bottom: 0px;
        left: 0px;
    }
}
</style>
