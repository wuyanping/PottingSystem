<template>
    <div class="recordDetails">
        <component
            v-if="hasCustomComponent"
            :is="currentRecordDetails.CustomComponent"
        />
        <!-- <CommonMain v-else :model="currentRecordDetails" :route="routePath" /> -->
        <CommonRecordDetails v-else :recordDetails="currentRecordDetails" :route="routePath" />
    </div>
</template>
<script>
import { XInput, Group, Icon, Flexbox, FlexboxItem, Panel } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import theRecordDetails from './recordDetails.js'
import CommonRecordDetails from '../page/commonRecordDetails'
// import CommonMain from '../page/commonMain.vue'
export default {
    components: {
        CommonRecordDetails,
        // CommonMain,
        XInput,
        Group,
        Icon,
        Flexbox,
        FlexboxItem,
        Panel
    },
    data () {
        return {
            currentRecordDetails: {},
            routePath: '',
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
    //     this.$emit('setHeader', {key: 'showBack', value: false})
    // },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (theRecordDetails[to.params.model] && theRecordDetails[to.params.model][to.params.record] && theRecordDetails[to.params.model][to.params.record]._hasCustomComponent) {
                vm.hasCustomComponent = true
            } else {
                vm.hasCustomComponent = false
            }
            vm.currentRecordDetails = theRecordDetails[to.params.model][to.params.record]
            vm.changeHeaderSetting({...vm.headerSetting, title: vm.currentRecordDetails.title, showBack: true})
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
                if (theRecordDetails[nv.params.model] && theRecordDetails[nv.params.model][nv.params.record] && theRecordDetails[nv.params.model][nv.params.record]._hasCustomComponent) {
                    this.hasCustomComponent = true
                } else {
                    this.hasCustomComponent = false
                }
                this.currentRecordDetails = theRecordDetails[nv.params.model][nv.params.record]
                this.changeHeaderSetting({...this.headerSetting, title: this.currentRecordDetails.title, showBack: true})
            }
        }
    }

}
</script>

<style lang="sass">
.basic {
}
</style>
