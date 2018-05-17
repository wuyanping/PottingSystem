<template>
	<div class="userInfo">
		<blur :blur-amount=40 :url="url" :height="100">
            <div class="center clearfix">
                <uploadImg class="uploadImg fl"
                    :avatar="userData.avatar"
                    @handleUpload="handleUpload"/>
                <div class="fl p-10"> 
                    <p>{{userData.name}}</p>
                    <span @click="isShowPopup = true">个人信息 > </span>
                </div>
            </div>
    	</blur>
        <group>
            <cell title="修改个人信息" is-link link="userInfo/editUserInfo"></cell>
            <cell title="修改密码" is-link link="userInfo/editPassword"></cell>
            <cell title="盆栽管理" is-link link="/index/userInfo/potManage"></cell>
        </group>

        <!-- 个人信息详情弹框 -->
        <PopupShowForm
            :isShowPopup="isShowPopup"
            :introduceListField="introduceListField"
            :listData="userData"
            @close="handleClose">
        </PopupShowForm>

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
import PopupShowForm from 'WAPVIEWS/components/input/popupShowForm.vue'
import uploadImg from './Details/uploadImg.vue'
import { index, update, edit } from 'UTILS/commonApi'
import { isObject } from 'UTILS/utils.js'

export default {
    components: {
        Blur, Group, Cell, PopupShowForm, uploadImg, XButton
    },
    props: {
        model: Object,
        listData: {}
    },
    computed: {
        introduceListField () {
            if (this.model.introduceListField) {
                return this.model.introduceListField
            } else {
                return []
            }
        }
    },
    data () {
        return {
            url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
            userData: {},
            isShowPopup: false // 详情弹框
        }
    },
    methods: {
        getUserInfo () {
            this.userData = this.tableFieldFn(window.bdUser ? window.bdUser : {})
        },
        // 上传头像
        handleUpload (obj) {
            let userId = window.bdUser['id']
            let params = {}
            Object.assign(params, {
                _type: 'edit',
                ...obj
            })
            update(this, 'user', userId, params)
                .then(res => {
                    this.userData = this.tableFieldFn(res ? res : {})
                })
        },
        handleLogout () {
            axios.get('/api/domlogout')
                .then(res => {
                    if (res.data === 200) {
                        this.$router.push('/login')
                    }
                })
        },
        handleClose () {
            this.isShowPopup = false
        },
        // 表格列特殊值处理
        tableFieldFn: function (data) {
            // 处理性别
            const g = function (gender) {
                return gender === 1 ? '女' : '男'
            }
            if (isObject(data)) {
                data.gender = g(data.gender)
            }
            return data
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
