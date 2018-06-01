<!-- 点击展示图片的 -->
<template>
    <div v-transfer-dom>
        <x-dialog v-model="showHideOnBlur" class="dialog-demo">
            <div class="img-box">
                <img :src="img" style="max-width:100%">
            </div>
            <div>
                <span class="vux-close" @click="closeImg"><x-icon type="ios-close-empty" size="50"></x-icon></span>
            </div>
        </x-dialog>
    </div>
</template>
<script>
import {TransferDom, XDialog} from 'vux'

export default {
    directives: {
        TransferDom
    },
    components: {
    	TransferDom, XDialog
    },
    props: {
        img: {
            type: String,
            default: ''
        },
        showHideOnBlur: {
            type: Boolean,
            default: false
        }
    },
    methods: {
    	closeImg () {
    		this.$emit('closeImg')
    	}
    }
}
</script>
<style lang="sass">
.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    max-height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
