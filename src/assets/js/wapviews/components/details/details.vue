<template>
    <div class='details'>
        <component
            v-if="hasCustomComponent"
            :is="currentDetail.CustomComponent"
        />
        <CommonDetails v-else :details="currentDetail" :route="routePath" />
    </div>
</template>
<script>
import { XInput, Group, Icon, Flexbox, FlexboxItem, Panel } from 'vux'
import theDetail from './details.js'
import CommonDetails from '../page/commonDetails'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        CommonDetails,
        XInput,
        Group,
        Icon,
        Flexbox,
        FlexboxItem,
        Panel
    },
    data () {
        return {
            // 当前详情
            currentDetail: {},
            routePath: '',
            // 是否自定义组件
            hasCustomComponent: true
        }
    },
    computed: {
        ...mapGetters([
            'headerSetting'
        ])
    },
    // mounted () {
    //     this.$emit('setHeader', {key: 'showBack', value: true})
    // },
    // destroyed () {
    //     this.changeHeaderSetting({...this.headerSetting, title: this.currentDetail.pTitle, showBack: false})
    // },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // console.log('details.vue---')
            if (theDetail[to.params.model] && theDetail[to.params.model]._hasCustomComponent) {
                vm.hasCustomComponent = true
            } else {
                vm.hasCustomComponent = false
            }
            vm.currentDetail = theDetail[to.params.model]
            vm.changeHeaderSetting({...vm.headerSetting, title: vm.currentDetail.title, showBack: true})
        })
    },
    methods: {
        ...mapActions([
            'changeHeaderSetting'
        ]),
        onImgError (item, $event) {
        },
        handlePanelItem (panelItem) {
            this.$router.push(`${this.$route.path}/${panelItem.id}`)
        }
    },
    watch: {
        '$route': {
            deep: true,
            handler: function (nv) {
                // console.log('details.vue---')
                if (theDetail[nv.params.model] && theDetail[nv.params.model]._hasCustomComponent) {
                    this.hasCustomComponent = true
                } else {
                    this.hasCustomComponent = false
                }
                this.currentDetail = theDetail[nv.params.model]
                this.changeHeaderSetting({...this.headerSetting, title: this.currentDetail.title, showBack: true})
            }
        }
    }

}
</script>

<style lang="sass">
</style>
