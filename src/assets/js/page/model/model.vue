<template>
    <div class="common-model views">
        <component
            v-if="hasCustomComponent"
            :is="currentModel.CustomComponent"
        />
        <CommonMain v-else :model="currentModel" :route="routePath" />
    </div>
</template>
<script>
    import theModel from './model.js'
    import CommonMain from 'COMPONENTS/public/commonMain.vue'
    export default {
        name: 'model',
        components: {
            CommonMain
        },
        data () {
            return {
                routePath: '',
                currentModel: {},

                hasCustomComponent: false
            }
        },

        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        beforeRouteEnter (to, from, next) {
            // console.log(theModel[to.params.module][to.params.model])
            console.log(to)
            console.log(theModel)
            next(vm => {
                // 通过 `vm` 访问组件实例
                if (theModel[to.params.module][to.params.model] && theModel[to.params.module][to.params.model]._hasCustomComponent) {
                    vm.hasCustomComponent = true
                    vm.currentModel = theModel[to.params.module][to.params.model]
                } else {
                    vm.hasCustomComponent = false
                    vm.set(to)
                }
            })
        },
        methods: {
            /**
             * [mixCurrentModel 把panelData中的当前数据是混合到当前模块数据中]
             * @Author   szh
             * @DateTime 2018-03-01
             * @param    {String}   module  [管理模块]
             * @param    {String}   model   [管理模块下的子模块]
             * @param    {String}   mixType [当前tabs的类型的数据]
             */
            mixCurrentModel (module, model, mixType) {
                console.log(module, model, mixType)
                this.currentModel = Object.assign({}, theModel[module][model], theModel[module][model]['panelData'][mixType])
                console.log(this.currentModel)
            },
            /**
             * [set 设置routePath和currentModel]
             * @Author   szh
             * @DateTime 2018-03-02
             * @param    {Object}   routeObj [当前的路由对象]
             */
            set (routeObj) {
                console.log(routeObj)
                // 不是详情页：
                // 存在current和没有current的情况
                // 详情页
                // 存在current和没有current的情况
                if (routeObj.params.id) {
                    if (!routeObj.query.current) {
                        console.error(`${routeObj.params.model}中的detailLink组件缺少了current参数`)
                    }
                    this.routePath = `${routeObj.params.model}/${routeObj.params.id}/${routeObj.query.current}`
                    this.mixCurrentModel(routeObj.params.module, `${routeObj.params.model}Detail`, routeObj.query.current)
                } else {
                    if (routeObj.query.current) {
                        this.routePath = routeObj.query.current
                        this.mixCurrentModel(routeObj.params.module, routeObj.params.model, routeObj.query.current)
                    } else {
                        this.routePath = routeObj.params.model
                        this.mixCurrentModel(routeObj.params.module, routeObj.params.model, routeObj.params.model)
                    }
                }
            }
        },
        mounted () {
            console.log(this.$route)
        },
        watch: {
            '$route': {
                deep: true, // 深度观察
                handler: function (nv) {
                    if (theModel[nv.params.module][nv.params.model] && theModel[nv.params.module][nv.params.model]._hasCustomComponent) {
                        this.hasCustomComponent = true
                        this.currentModel = theModel[nv.params.module][nv.params.model]
                    } else {
                        this.hasCustomComponent = false
                        this.set(nv)
                    }
                }
            }
        }
    }
</script>
