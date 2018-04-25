<template>
    <div class="w100 h100 commonwap">
        <x-header 
            :left-options="{showBack: headerSetting.showBack, backText: headerSetting.backText}"
            >
                {{headerSetting.title}}
        </x-header>
        <router-view :setHeader="setHeader"></router-view>
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
</template>

<script>
import { ajax } from 'UTILS/ajax'
import {Tabbar, TabbarItem, Group, Cell, XHeader} from 'vux'
import menu from './menu.js'
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
            ],
            headerSetting: {
                showBack: false,
                backText: '',
                title: ''
            }
        }
    },
    mounted () {
        this.headerSetting.title = this.tabbarData[this.index].title
    },
    methods: {
        handleTabBarItem (i) {
            this.headerSetting.title = this.tabbarData[i].title
        },
        setHeader ({key, value}) {
            console.log(key, value)
            this.headerSetting[key] = value
        }
    }
}
</script>

<style lang="sass" scoped>
</style>
