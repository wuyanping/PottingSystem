<template>
    <div>
        <div @click="select">
            <img :src="avatar ? avatar : url">
        </div>
        <input type="file" hidden="hidden" @change="pick($event)" ref="input"/>
        <toast v-model="toast" type="warn">{{msg}}</toast>
    </div>
</template>

<script>
import { Toast, ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
export default {
    props: {
        avatar: ''
    },
    data () {
        return {
            url: './static/image/company_default_logo.png',
            toast: false,
            msg: ''
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
        select () {
            this.$refs.input.click()
        }
    },
    components: {
        Toast
    }
}
</script>

<style lang="sass">
</style>