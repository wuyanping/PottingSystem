/*获取图片组件
* @description 
* @author 吴燕萍
* @date 2017/6/14
* */ 
<template>
     <div class="camera">
        <span class="cancelImg" @click="delImgFn($event.currentTarget)"><icon type="cancel" ></icon></span>
        <div class="cameraCon" @click="selectPic">
            <!-- <img v-if="imageUrl === ''" class="cameraImg" src="./static/image/xiangji.png" alt=""> -->
            <input ref="inputFile" type="file" hidden="hidden" accept="image/*;capture=camera" @change="previewPic($event.currentTarget, $event)">
            <img v-if='imageUrl' :src='imageUrl' width="100%" height="100%">
        </div>
    </div>
</template>
<style lang="sass">
@import '../../../../sass/mixins/_absoluteCenter.scss';
.camera {
    margin-top:5px;
    height:5rem;
    background-color:#ededed;
    position:relative;
    border: 1px solid #D9D9D9;
    .cameraCon{
        width:100%;
        height:100%;
        .cameraImg{
            @include centerfn('center',absolute,15%,left,50%,top,50%)
        }
    }
        
    .cancelImg{
        z-index:3;
        @include centerfn('right',absolute,auto,right,.1rem,top,.1rem)
        >i{
            font-weight:bold;
        }
    }
}
</style>
<script>
import {Icon} from 'vux'
export default {
    name: 'camera',
    components: {
        Icon
    },
    props: {
        name: '',
        editValue: ''
    },
    data () {
        return {
            imageUrl: '',
            file: {},
            flag: false,
            pattern: {
                type: Array,
                default () {
                    return ['jpeg', 'png']
                }
            }
        }
    },
    mounted () {
        this.flag = false
    },
    methods: {
        // 删除图片
        delImgFn (src) {
            this.imageUrl = ''
            src.parentNode.lastChild.getElementsByTagName('input')[0].value = ''
            this.$emit('return-shuju', {name: this.name, value: ''})
        },
        selectPic (event) {
            // 取出空格
            // let obj = $('input[type=file]')
            let obj = this.$refs.inputFile
            // 触发input的click事件
            obj.click()
        },
        previewPic (srcPic, event) {
            let file = event.target.files[0]
            let regexParams = ''
            for (let index = 0; index < this.pattern.length; index++) {
                regexParams += this.pattern[index] + (index === this.pattern.length - 1 ? '' : '|')
            }
            let regex = new RegExp('(?:' + regexParams + ')', 'i')
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                srcPic.value = ''
                this.$emit('return-shuju', 'type')
                return
            }
            if (file.size / 1024 >= 300) {
                srcPic.value = ''
                this.$emit('return-shuju', 'size')
                return
            }
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = e => {
                this.imageUrl = e.target.result
                this.flag = true
                this.$emit('return-shuju', {name: this.name, value: file})
                this.flag = false
            }
        }
    },
    watch: {
        editValue () {
            if (this.editValue !== undefined || this.editValue !== '' || this.editValue !== null) {
                if (!this.flag) {
                    this.imageUrl = this.editValue
                }
            }
        }
    }
}
</script>
