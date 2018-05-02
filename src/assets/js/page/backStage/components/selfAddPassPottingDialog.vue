<template>
    <commonFormDialog
        ref="addPassPottingDialog"
        :commonFormVisible="visible"
        :commonFormData="addPermissionsData"
        :commonFormLoading="loading"
        :route="route"
        v-on:save="save"
        v-on:closeDialog="close"
    />
</template>
<script>
import commonFormDialog from 'COMPONENTS/public/commonFormDialog'
export default {
    name: 'addPassPottingDialog',
    components: {
        commonFormDialog
    },
    props: {
        route: String
    },
    data () {
        return {
            visible: false,
            addPermissionsData: {
                formField: [
                    {
                        component: 'ElSelect',
                        field: 'rfid',
                        value: undefined,
                        label: '盆栽状态',
                        selectList: [
                            {
                                name: '通过',
                                id: 0
                            },
                            {
                                name: '不通过',
                                id: 1
                            }
                        ]
                    }
                ]
            },
            loading: false
        }
    },
    methods: {
        save () {},
        close () {
            this.visible = false
        }
    }
}
</script>
<style lang="sass" scoped>
</style>
