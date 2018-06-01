<template>
    <div>
        <div>
            <img @click="showImg(avatar)" :src="avatar ? avatar : url">
        </div>
        <input type="file" hidden="hidden" @change="pick($event)" ref="input"/>
        <toast v-model="toast" type="warn">{{msg}}</toast>

        <!-- 查看/从相册选择 -->
        <actionsheet v-model="show" :menus="menus" @on-click-menu="click" show-cancel></actionsheet>
    </div>
</template>

<script>
import { Toast, ToastPlugin, Actionsheet, XSwitch } from 'vux'
Vue.use(ToastPlugin)
export default {
    props: {
        avatar: ''
    },
    data () {
        return {
            url: './static/image/company_default_logo.png',
            toast: false,
            msg: '',
            show: false,
            menus: {
                look: '查看',
                check: '从相册选择'
            }
        }
    },
    methods: {
        pick ($event) {
            let file = $event.target.files[0]
            const isLt2M = file.size / 1024 > 200
            const type = file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg'
            if (isLt2M) {
                this.toast = true
                this.msg = '图片不能超过2MB'
                return
            }
            if (type) {
                this.toast = true
                this.msg = '图片格式为png或jpeg或jpg'
                return
            }
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                this.url = e.target.result
            }
            this.$emit('handleUpload', { avatar: file, _hasfile: true })
        },
        // 展示Actionsheet弹框
        showImg (img) {
            this.show = true
        },
        select () {
            this.$refs.input.click()
        },
        // 头像被点击
        click (key) {
            console.log(key)
            if (key === 'look') { // 查看
                let url = this.avatar ? this.avatar : this.url
                this.$emit('showImg', url)
            } else if (key === 'check') { // 从相册选择
                this.select()
            }
        }
    },
    components: {
        Toast, Actionsheet, XSwitch
    }
}
</script>

<style lang="sass">
</style>