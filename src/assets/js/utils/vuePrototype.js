import Vue from 'vue'

/**
 * 全局注册通用方法
 */
export default {
    install () {
        /**
         * 生成api地址的前缀
         * @Author   szh
         * @DateTime 2018-03-07
         * @param    {String}   url 请求地址
         * @return   {String}       请求地址
         */
        Vue.prototype.$apiUrl = (url) => {
            return `/${url}`
        }

        /**
         * [elementUI消息框封装]
         * @Author              bwx
         * @DateTime 2017-10-10
         * @param    {Object}   vm    [vue组件]
         * @param    {String}   msg   [需要显示的消息]
         * @param    {String}   type  [消息类型 success和error]
         * @param    {Number}   delay [延迟]
         */
        Vue.prototype.$mg = (vm, msg, type, delay) => {
            vm.$message({
                showClose: false,
                message: msg,
                type: type,
                duration: delay,
                customClass: `message ${type}`,
                iconClass: 'messageicon'
            })
        }
    }
}
