<template>
    <div class="formItem">
        <group title="禁用内置验证及显示成功或者错误样式">
            <x-input
                v-if="formItem.component === 'x-input'"
                :placeholder="`请输入${formItem.label}`"
                novalidate
                @on-blur="onBlur"
                placeholder-align="right">
            </x-input>
        </group>
    </div>
</template>
<script>
import { Group, XInput } from 'vux'
export default {
    components: {
        Group,
        XInput
    },
    props: {
        formItem: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
        }
    },
    methods: {
        onBlur () {
        }
    }
}
</script>
<style lang="sass">
</style>
