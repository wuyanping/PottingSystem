<template>
    <div class="formItem" v-if="formItem">
        <!-- input框 -->
        <x-input
            v-if="formItem.component === 'x-input'"
            :title="isShowTiTle ? formItem.title : ''"
            :iconType="formItem.iconType"
            :placeholder="`请输入${formItem.title}`"
            novalidate
            text-align="right"
            @on-change="(val) => validatorResultFn(formItem.title, formItem.rule, val)"
            @on-blur="(val) => validatorResultFn(formItem.title, formItem.rule, val)"
            v-model="formItem.value"
            placeholder-align="left">
        </x-input>
        
        <!-- 文本框 -->
        <x-textarea
            v-if="formItem.component === 'x-textarea'"
            :title="isShowTiTle ? formItem.title : ''"
            :max="20"
            :placeholder="`请输入${formItem.title}`"
            @on-change="(val) => validatorResultFn(formItem.title, formItem.rule, val)"
            @on-blur="() => validatorResultFn(formItem.title, formItem.rule, formItem.value)"
            v-model="formItem.value"
            >
        </x-textarea>

        <!-- 单选框 -->
        <radio
            v-if="formItem.component === 'radio'"
            :options="formItem.options"
            v-model="formItem.value"
            @on-change="(val) => validatorResultFn(formItem.title, formItem.rule, val, formItem.component)">
        </radio>

        <!-- 下拉框 -->
        <popup-picker
            v-if="formItem.component === 'select'"
            :title="formItem.title"
            :data="formItem.options"
            v-model="formItem.value"
            :columns="1"
            @on-change="onChangePick(formItem.options, formItem.value)" />

        <!-- 日期 -->
        <datetime
            v-if="formItem.component === 'datetime'"
            v-model="formItem.value"
            @on-change="change"
            :title="isShowTiTle ? formItem.title : ''"
            @on-cancel="log('cancel')"
            @on-confirm="onConfirm"
            @on-hide="log('hide', $event)">
        </datetime>

        <!-- 图片选择框 -->
        <Camera 
            v-if="formItem.component === 'file'" 
            @return-shuju="returnShuju"
            :name="formItem.name"
            :editValue="formItem.value"
        ></Camera>
        
        <!-- 键值对的形式输入（如：新建盆栽的其他信息） -->
        <InputDynamic 
            v-if="formItem.component === 'inputDynamic'" 
            :name="formItem.name"
            :title="formItem.title"
            :formItemData="formItem"
        ></InputDynamic>
        
        <!-- 多选框 -->
        <checklist 
            v-if="formItem.component === 'checklist'" 
            :label-position="labelPosition"
            required
            :options="commonList"
            v-model="checklist001"
            @on-change="change">
        </checklist>

        <!-- 错误提示 -->
        <span v-if="isShowMsg" style="color: red">
            {{!formItem.validatorResult.valid ? formItem.validatorResult.msg : ''}}
        </span>
    </div>
</template>
<script>
import { XInput, Radio, Datetime, Toast, XTextarea, PopupPicker, Checklist } from 'vux'
import {validatorFn} from 'UTILS/moblieValidator.js'
import Camera from './camera.vue'
import InputDynamic from './inputDynamic.vue'
export default {
    components: {
        XInput,
        Radio,
        Datetime,
        Toast,
        Camera,
        XTextarea,
        PopupPicker,
        InputDynamic,
        Checklist
    },
    props: {
        formItem: Object,
        // 是否展示错误信息
        isShowMsg: {
            type: Boolean,
            default: false
        },
        isShowTiTle: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            labelPosition: '',
            commonList: [ 'China', 'Japan', 'America' ],
            checklist001: []
        }
    },
    mounted () {
        // console.log('obj')
        // console.log(this.formItem)
        // console.log(this.$props.formItem)
    },
    methods: {
        // 表单验证
        validatorResultFn (name, rule, value, component) {
            // console.log('validatorResult --------------------------------------')
            // console.log(value)
            // this.$emit('changeIsShowFinish')
            let result = validatorFn(name, rule, value)
            // console.log(result)
            this.formItem.validatorResult = result
            this.formItem.iconType = !result.valid ? 'error' : ''
            // return result
        },
        log (str1, str2 = '') {
            console.log(str1, str2)
        },
        onConfirm (val) {
            console.log('on-confirm arg', val)
            console.log('current value', this.value1)
        },
        change (value, label) {
            console.log('change', value, label)
        },
        onChangePick (options, value) {
            options.forEach(v => {
                if (value[0] == v.value) {
                    value[0] = v.name
                }
            })
        },
        /*
        返回图片信息
         */
        returnShuju (obj) {
            console.log(obj)
            console.log(this.formItem)
            if (obj === 'type') {
                this.setToast('text', '请上传jpeg或png的图片', '15em')
            } else if (obj === 'size') {
                this.setToast('text', '请输入小于300k图片', '15em')
            } else {
                this.formItem.value = obj.value
                this.validatorResultFn(obj.name, this.formItem.rule, obj.value)
                // validatorFn({name: obj.name, rule: this.formItem.rule, value: obj.value})
            }
        },
        // 提示弹窗
        setToast (type, text, width = '7.6em') {
            this.$vux.toast.show({
                type: type,
                text: text,
                width: width,
                position: 'middle'
            })
        }
    }
}
</script>
<style lang="sass">
.formItem{
    background: white;
    border-bottom: 1px solid #D9D9D9;
}
</style>
