<template>
    <div class="w100 h100 commonwap">
        <Drawer
            :show.sync="drawerShow"
            :show-mode="drawerShowMode"
            :drawer-style="{'background-color':'#35495e', width: '200px'}">
            <!-- 菜单 -->
            <div slot="drawer">
                <group title="盆栽管理系统">
                    <div v-for="menu in menus" :key="menu.name">
                        <!-- 有子级的菜单 -->
                        <cell
                            v-if="menu.children"
                            :title="menu.name"
                            is-link
                            :border-intent="false"
                            :arrow-direction="menu.opened ? 'up' : 'down'"
                            @click.native="menu.opened = !menu.opened">
                        </cell>
                        <!-- 不存在子级的菜单 -->
                        <cell v-else :title="menu.display_name" @click.native="setTitle(menu)"></cell>
                        
                        <!-- 有子级菜单的目录 -->
                        <template v-if="menu.opened">
                            <cell
                                class="ml-10"
                                v-for="item in menu.children"
                                :key="item.key"
                                :title="item.name"
                                @click.native="setTitle(item)">
                            </cell>
                        </template>
                    </div>
                </group>
                <group class="w100 logout">
                    <cell title="退出" @click.native="logout"></cell>
                </group>
            </div>
            <!-- 主体部分 -->
            <view-box body-padding-top="46px" body-padding-bottom="0">

                <!-- 头部 -->
                <x-header
                    slot="header"
                    style="width:100%;position:absolute;left:0;top:0;z-index:100;"
                    :title="xHeaderTitle">
                    <span slot="overwrite-left" @click="drawerShow = !drawerShow">
                        <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
                    </span>
                </x-header>

                <!-- 主要内容 -->
                <router-view class="router-view"></router-view>
            </view-box>
        </Drawer>
    </div>
</template>

<script>
import { ajax } from 'UTILS/ajax'
import { XHeader, Drawer, Cell, Group, ViewBox } from 'vux'
import menu from './menu.js'
export default{
    name: 'wapIndex',
    components: {
        XHeader,
        Drawer,
        Cell,
        Group,
        ViewBox
    },
    data () {
        return {
            menus: menu,
            // drawer
            drawerShow: false,
            drawerShowMode: 'push',

            xHeaderTitle: ''
        }
    },
    beforeMount () {
        // this.$store.commit('GLOBAL_SET_USERINFO', window.bdUser)
    },
    /**
     * [beforeRouteEnter 进入页面之前，获取菜单目录数据]
     * @Author              bwx
     * @DateTime 2017-09-12
     * @param    {Object}   to   [路由对象]
     * @param    {Object}   from [路由对象]
     * @param    {Function} next [description]
     */
    // beforeRouteEnter (to, from, next) {
    //     axios.get('/api/common/user/menu/commonwap')
    //     .then(res => {
    //         next(vm => {
    //             let menus = []
    //             res.data.forEach(v => {
    //                 let obj = {
    //                     name: v.name.split('-')[v.name.split('-').length - 1],
    //                     display_name: v.display_name,
    //                 }
    //                 if (v.data.length === 1) {
    //                     obj['resource'] = v.data[0].resource
    //                     if (to.path === v.data[0].resource) {
    //                         vm.xHeaderTitle = v.display_name
    //                     }
    //                 } else {
    //                     obj['lists'] = []
    //                     obj['opened'] = false
    //                     v.data.forEach(vl => {
    //                         obj['lists'].push({
    //                             name: vl.name.split('-')[vl.name.split('-').length - 1],
    //                             display_name: vl.display_name,
    //                             resource: vl.resource,
    //                         })
    //                         // 判断当前路由路径是否相等，如果相等设置nav的defaultOpeneds
    //                         if (to.path === vl.resource) {
    //                             obj['opened'] = true
    //                             vm.xHeaderTitle = vl.display_name
    //                         }
    //                     })
    //                 }
    //                 menus.push(obj)
    //             })
    //             vm.menus = menus
    //         })
    //     })
    // },
    methods: {
        setTitle (menu) {
            this.drawerShow = false
            this.xHeaderTitle = menu.name
            this.$router.push(menu.resource)
        },
        logout () {
            // ajax.call(this, 'post', '/logout', data => {
            //     this.$router.push('/login')
            // })
        }
    }
}
</script>

<style lang="sass" scoped>
    .logout {
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .router-view {
        width: 100%;
        top: 46px;
    }
</style>
