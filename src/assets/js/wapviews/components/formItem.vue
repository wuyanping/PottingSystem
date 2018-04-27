<template>
    <div class="formItem">
        <group :title="!formItem.validatorResult.valid ? formItem.validatorResult.msg : ''">
            <x-input
                v-if="formItem.component === 'x-input'"
                :iconType="formItem.iconType"
                :placeholder="`请输入${formItem.label}`"
                novalidate
                @on-change="(val) => validatorResultFn(formItem.label, formItem.rule, val)"
                @on-blur="(val) => validatorResultFn(formItem.label, formItem.rule, val)"
                v-model="formItem.value"
                placeholder-align="right">
            </x-input>
        </group>
    </div>
</template>
<script>
import { Group, XInput } from 'vux'
import {validatorFn} from 'UTILS/moblieValidator.js'
export default {
    components: {
        Group,
        XInput
    },
    props: {
        formItem: {
            type: Object
        }
    },
    data () {
        return {
            // 旧的formItemValue
            oldFormItemValue: ''
        }
    },
    mounth () {
        console.log(this.formItem)
        this.oldFormItemValue = this.formItem.value !== undefined ? this.formItem.value : ''
    },
    methods: {
        validatorResultFn (name, rule, value, i) {
            console.log('validatorResult --------------------------------------')
            // let input = this[`${action}Data`][i]
            this.$emit('changeIsShowFinish')
            let result = validatorFn(name, rule, value)
            console.log(result)
            this.formItem.validatorResult = result
            this.formItem.iconType = !result.valid ? 'error' : ''
            // this[`${action}Data`].splice(i, 1, input)
            // return result
        }
    }
}
</script>
<style lang="sass">
</style>
