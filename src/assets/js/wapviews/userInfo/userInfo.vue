<template>
	<div class="userInfo">
		<blur :blur-amount=40 :url="url" :height="100">
            <div class="center clearfix">
                <uploadImg class="uploadImg fl"
                    :avatar="userData.avatar"
                    @handleUpload="handleUpload"/>
                <div class="fl p-10"> 
                    <p>{{userData.name}}</p>
                    <p>个人信息 > </p>
                </div>
            </div>
    	</blur>
        <group>
            <cell title="修改个人信息" is-link link="userInfo/editUserInfo"></cell>
            <cell title="修改密码" is-link link="userInfo/editPassword"></cell>
        </group>

        <!-- 新建弹框 -->
        <PopupForm 
            :formData="formData"
            :isShowPopup="isShowPopup"
            :isShowSibmitBtn="true"
            @closePopup="closePopup"
        ></PopupForm>

        <x-button
            class= "logoutBtn"
            plain
            type="primary"
            @click.native="handleLogout">
            退出
        </x-button>
	</div>
</template>
<script>
import { Blur, Group, Cell, XButton } from 'vux'
import PopupForm from 'WAPVIEWS/components/input/popupForm.vue'
import uploadImg from './Details/uploadImg.vue'
import { index, update, edit } from 'UTILS/commonApi'

export default {
    components: {
        Blur, Group, Cell, PopupForm, uploadImg, XButton
    },
    data () {
        return {
            url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
            isShowPopup: false,
            formData: [],
            userData: {}
        }
    },
    methods: {
        // 新增表单
        newForm () {
            this.isShowPopup = true
            this.formData = this.model.formField()
            console.log(this.formData)
        },
        closePopup () {
            this.isShowPopup = false
        },
        getUserInfo () {
            this.userData = window.bdUser
        },
        // 上传头像
        handleUpload (obj) {
            let userId = window.bdUser['id']
            let params = {}
            console.log(obj)
            Object.assign(params, {
                _type: 'edit',
                ...obj
            })
            console.log(params)
            update(this, 'user', userId, params)
                .then(res => {
                    this.userData = res
                })
        },
        handleLogout () {
            axios.get('/api/domlogout')
                .then(res => {
                    this.$router.push('/login')
                })
        }
    },
    mounted () {
        this.getUserInfo()
    }
}
</script>
<style lang="sass">
.userInfo{
    .center {
      text-align: left;
      padding: 20px 10px 0 10px;
      font-size: 18px;
    }
    .uploadImg{
        border-radius: 50%;
        img{
            width:60px;
            height: 60px;
            border-radius: 50%;
            border: 4px solid #ececec;
        }
    }
    .weui-cells{
        margin-top: 0;
        .weui-cell{
            padding: 20px 15px;
        }
    }
    .logoutBtn{
        width: 80%;
        height: 56px;
        position: fixed;
        bottom: 80px;
        margin-left: 10%;
        border-radius: 20px;
    } 
}
</style>
