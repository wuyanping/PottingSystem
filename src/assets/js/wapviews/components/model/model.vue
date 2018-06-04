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
        }
    },
    mounted () {
        // console.log(this.$route)
    },
    watch: {
        // 监听路由变化，深度监听
        '$route': {
            deep: true,
            handler: function (nv) {
                // console.log('route ---- ')
                if (theModel[nv.params.model] && theModel[nv.params.model]._hasCustomComponent) {
                    this.hasCustomComponent = true
                } else {
                    this.hasCustomComponent = false
                }
                this.currentModel = theModel[nv.params.model]
                if (this.currentModel && nv.params.model) {
                    this.changeHeaderSetting({...this.headerSetting, showBack: false, title: this.currentModel.title})
                }
            }
        }
    }

}
</script>

<style lang="sass">
.model {
}
</style>
