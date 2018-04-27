<template>
    <div class="recordDetails">
        <component
            v-if="hasCustomComponent"
            :is="currentRecordDetails.CustomComponent"
        />
        <CommonMain v-else :model="currentRecordDetails" :route="routePath" />
    </div>
</template>
<script>
import { XInput, Group, Icon, Flexbox, FlexboxItem, Panel } from 'vux'
import theRecordDetails from './recordDetails.js'
// import CommonRecordDetails from './components/page/commonRecordDetails'
// import List from '../components/list'
import CommonMain from './components/page/commonMain.vue'
export default {
    components: {
        // CommonRecordDetails,
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
            currentRecordDetails: {},
            routePath: '',
            hasCustomComponent: true
        }
    },
    mounted () {
        console.log(22)
        this.$emit('setHeader', {key: 'showBack', value: true})
    },
    destroyed () {
        this.$emit('setHeader', {key: 'showBack', value: false})
    },
    beforeRouteEnter (to, from, next) {
        console.log('recordDetails beforeRouteEnter')
        next(vm => {
            console.log(theRecordDetails)
            console.log(to)
            if (theRecordDetails[to.params.model] && theRecordDetails[to.params.model][to.params.record] && theRecordDetails[to.params.model][to.params.record]._hasCustomComponent) {
                vm.hasCustomComponent = true
            } else {
                vm.hasCustomComponent = false
            }
            vm.currentRecordDetails = theRecordDetails[to.params.model][to.params.record]
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
                if (theRecordDetails[nv.params.model] && theRecordDetails[nv.params.model][nv.params.record] && theRecordDetails[nv.params.model][nv.params.record]._hasCustomComponent) {
                    this.hasCustomComponent = true
                } else {
                    this.hasCustomComponent = false
                }
                this.currentRecordDetails = theRecordDetails[nv.params.model][nv.params.record]
            }
        }
    }

}
</script>

<style lang="sass">
.basic {
}
</style>
