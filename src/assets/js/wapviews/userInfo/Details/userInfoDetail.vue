<template>
	<div class="userInfoDetail">
        <div class="infoList">
            <group>
                <cell title="呢称" value="aa" is-link @click.native="show1 = !show1"></cell>
                <cell title="性别" value="girl" is-link @click.native="show1 = !show1"></cell>
            </group>
        </div>
        <x-button
            class= "saveBtn"
            plain
            type="primary"
            @click.native="handleSave">
            保存
        </x-button>
        <div v-transfer-dom>
            <popup v-model="show1" height="100%">
                <div class="popup1">
                    <group>
                        <x-switch title="Another XSwitcher" v-model="show1"></x-switch>
                    </group>
              </div>
            </popup>
        </div>
	</div>
</template>
<script>
import { Group, Cell, Popup, XSwitch, TransferDom, XButton } from 'vux'
export default {
    directives: {
        TransferDom
    },
    components: {
        Group, Cell, Popup, XSwitch, XButton
    },
    data () {
        return {
            show1: false
        }
    },
    mounted () {
        console.log(22)
        this.$emit('setHeader', {key: 'showBack', value: true})
    },
    destroyed () {
        this.$emit('setHeader', {key: 'showBack', value: false})
    },
    methods: {
        handleSave () {
            console.log(11)
        }
    }
}
</script>
<style lang="sass">
$theme-color: #1eac94;
.userInfoDetail{
    .infoList{
        .weui-cells{
            margin-top: 0;
            .weui-cell{
                padding: 20px 15px;
            }
        }
    }
    .popup1 {
        width:100%;
        height:100%;
    }
    .saveBtn{
        height: 56px;
        border-radius:20px;
        width: 80%;
        margin: 50px auto 0px;
        border-color: $theme-color;
        color: $theme-color;
    }
}
</style>
