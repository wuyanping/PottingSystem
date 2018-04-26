<template>
    <div class="model">
        <component
            v-if="hasCustomComponent"
            :is="currentModel.CustomComponent"
        />
        <CommonMain v-else :model="currentModel" :route="routePath" />
    </div>
</template>
<script>
import { XInput, Group, Icon, Flexbox, FlexboxItem, Panel } from 'vux'
import theModel from './model.js'
import CommonMain from './components/page/commonMain'
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
            value: '',
            data: [
                {
                    id: 1,
                    title: 'potting1',
                    inlineDesc: 'inlineDesc1',
                    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII='
                },
                {
                    id: 2,
                    title: 'potting2',
                    inlineDesc: 'inlineDesc2',
                    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII='
                }
            ],
            link: 'myPotting',
            list: [
                {
                    id: 0,
                    src: 'http://somedomain.somdomain/x.jpg',
                    fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    title: '标题一标题一标题一标题一标题一标题一标题一',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                    // ,
                    // url: '/component/cell'
                },
                {
                    id: 2,
                    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    title: '标题二',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                    // ,
                    // url: {
                    //     path: '/component/radio',
                    //     replace: false
                    // },
                    // meta: {
                    //     source: '来源信息',
                    //     date: '时间',
                    //     other: '其他信息'
                    // }
                }
            ],
            currentModel: {},
            routePath: '',
            hasCustomComponent: true
        }
    },
    beforeRouteEnter (to, from, next) {
        console.log('beforeRouteEnter')
        next(vm => {
            if (theModel[to.params.model] && theModel[to.params.model]._hasCustomComponent) {
                vm.hasCustomComponent = true
            } else {
                vm.hasCustomComponent = false
            }
            vm.currentModel = theModel[to.params.model]
        })
    },
    methods: {
        onImgError (item, $event) {
            console.log(item, $event)
        },
        handlePanelItem (panelItem) {
            console.log(panelItem)
            console.log(this.$route)
            this.$router.push(`${this.$route.path}/${panelItem.id}`)
        }
    },
    watch: {
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
            }
        }
    }

}
</script>

<style lang="sass">
.model {
}
</style>
