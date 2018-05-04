<template>
    <div>
        <div @click="select">
            <img :src="avatar ? `/api/${avatar}` : url">
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
            url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
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
                // console.log(e)
                this.url = e.target.result
            }
            this.$emit('handleUpload', { avatar: file, _hasfile: true })
            // console.log(reader)
            // console.log(file)
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