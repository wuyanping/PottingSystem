<template>
    <div class="model">
        <component
            v-if="hasCustomComponent"
            :is="currentModel.CustomComponent"
            :model="currentModel"
        />
        <CommonMain v-else :model="currentModel" :route="routePath" />
    </div>
</template>
<script>
import { XInput, Group, Icon, Flexbox, FlexboxItem, Panel } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import theModel from './model.js'
import CommonMain from '../page/commonMain'
// import List from '../components/list'
export default {
    components: {
        CommonMain,
        // List,
        XInput,
        Group,
        Icon,
        Flexbox,
        FlexboxItem,
        Panel
    },
    data () {
        return {
            // list: [
            //     {
            //         id: 0,
            //         src: 'http://somedomain.somdomain/x.jpg',
            //         fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
            //         title: '标题一标题一标题一标题一标题一标题一标题一',
            //         desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
            //         // ,
            //         // url: '/component/cell'
            //     },
            //     {
            //         id: 2,
            //         src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
            //         title: '标题二',
            //         desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
            //         // ,
            //         // url: {
            //         //     path: '/component/radio',
            //         //     replace: false
            //         // },
            //         // meta: {
            //         //     source: '来源信息',
            //         //     date: '时间',
            //         //     other: '其他信息'
            //         // }
            //     }
            // ],
            currentModel: {},
            routePath: '',
            hasCustomComponent: true
        }
    },
    computed: {
        ...mapGetters([
            'headerSetting'
        ])
    },
    // 在渲染该组件的对应路由被 confirm 前调用
    beforeRouteEnter (to, from, next) {
        console.log('beforeRouteEnter')
        next(vm => {
            if (theModel[to.params.model] && theModel[to.params.model]._hasCustomComponent) {
                vm.hasCustomComponent = true
            } else {
                vm.hasCustomComponent = false
            }
            vm.currentModel = theModel[to.params.model]
            vm.changeHeaderSetting({...vm.headerSetting, showBack: false, title: vm.currentModel.title})
        })
    },
    methods: {
        ...mapActions([
            'changeHeaderSetting'
        ]),
        // 图片发生错误时触发
        onImgError (item, $event) {
            console.log(item, $event)
        }
    },
    watch: {
        // 监听路由变化，深度监听
        '$route': {
            deep: true,
            handler: function (nv) {
                console.log('$route')
                if (theModel[nv.params.model] && theModel[nv.params.model]._hasCustomComponent) {
                    this.hasCustomComponent = true
                } else {
                    this.hasCustomComponent = false
                }
                this.currentModel = theModel[nv.params.model]
                this.changeHeaderSetting({...this.headerSetting, showBack: false, title: this.currentModel.title})
            }
        }
    }

}
</script>

<style lang="sass">
.model {
}
</style>
