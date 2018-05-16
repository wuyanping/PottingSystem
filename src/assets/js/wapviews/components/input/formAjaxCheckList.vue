<template>
    <div class="formAjaxCheckList">
        <div class="imgListDiv">
            <img v-for="item in formItemData.value" :src="item.avatar ? `/api/${listData.imgs}` : url" alt="item.name">
            <x-input class="search"
                v-model="searchValue"
                placeholder="搜索"
                @on-change="handleSearch">
            </x-input>
        </div>
        <!-- 多选框 -->
        <checklist 
            :title="formItemData.title"
            :label-position="labelPosition"
            required
            :options="checkList"
            v-model="formItemData.value"
            @on-change="change">
        </checklist>
    </div>
</template>

<script>
import { Checklist, XInput, Icon } from 'vux'
import { isFunction, isArray } from 'UTILS/utils.js'
export default {
    name: 'formAjaxCheckList',
    components: {
        Checklist, XInput, Icon
    },
    props: {
        formItemData: Object
    },
    data () {
        return {
            url: './static/image/company_default_logo.png',
            labelPosition: '',
            loading: false,
            checkList: [],
            // checklist再搜索之前的列表
            checkListAtSearchbefore: [],
            searchValue: ''
        }
    },
    mounted () {
        this.getAjaxData()
        console.log(this.formItemData)
    },
    methods: {
        change (value, label) {
            console.log('change', value, label)
            this.formItemData.value = value
        },
        getAjaxData () {
            if (!isFunction(this.formItemData.getDataFn)) {
                console.error(`模块中表单域:'${this.formItemData.label}'缺少getDataFn方法`)
                return
            }
            let id = this.$route.params.id
            this.loading = true
            this.formItemData.getDataFn(this, id)
                .then(data => {
                    this.loading = false
                    let arr = []
                    if (isArray(data)) {
                        data.forEach(item => {
                            arr.push({
                                key: item.id,
                                value: item.name,
                                avatar: item.avatar
                            })
                        })
                    }
                    this.checkList = arr
                    this.checkListAtSearchbefore = arr
                })
        },
        // 搜索
        handleSearch (val) {
            console.log(val)
            if (this.checkList.length !== 0) {
                if (val.length !== 0) {
                    let arr = this.checkListAtSearchbefore.filter(item => {
                        return item.value.includes(val)
                    })
                    this.checkList = arr
                } else {
                    this.checkList = this.checkListAtSearchbefore
                }
            }
        }
    }
}
</script>
<style lang="sass">
.formAjaxCheckList {
    .imgListDiv {
        height: 50px;
        padding: 10px;
        border-bottom: 1px solid #D9D9D9;
        img{
            width: 50px;
            height: 50px;
            margin-right: 5px;
        }
        .search{
            display:inline-block;
            &.weui-cell:before{
                border-top: none;
            }
        }
    }
}
</style>