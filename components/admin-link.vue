<template>
    <b-container>
        <b-card header-tag="header" class="shadow-sm mt-5" header-bg-variant="primary" header-text-variant="white">
            <h2 class="h6 mb-0" slot="header">
                <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
                链接管理
            </h2>
            <b-container fluid>
                <b-row>
                    <b-col md="6" class="my-1">
                        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                        <b-input-group>
                            <b-form-input placeholder="Type to Search"></b-form-input>
                            <b-input-group-append>
                            <b-button>Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                        </b-form-group>
                    </b-col>

                    <b-col md="6" class="my-1">
                        <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
                        <b-input-group>
                            <b-form-select>
                            <option slot="first" :value="null">-- none --</option>
                            </b-form-select>
                            <b-form-select slot="append">
                            <option :value="false">Asc</option> <option :value="true">Desc</option>
                            </b-form-select>
                        </b-input-group>
                        </b-form-group>
                    </b-col>

                    <b-col md="6" class="my-1">
                        <b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
                        <b-input-group>
                            <b-form-select slot="append">
                            <option value="asc">Asc</option> <option value="desc">Desc</option>
                            <option value="last">Last</option>
                            </b-form-select>
                        </b-input-group>
                        </b-form-group>
                    </b-col>

                    <b-col md="6" class="my-1">
                        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
                        <b-form-select></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-table v-if="linkitems!=[]" striped hover :items="linkitems" :fields="fields" small responsive></b-table>
            </b-container>
        </b-card>
    </b-container>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            linkitems: [],
            fields: {
                id: {
                    label: 'ID',
                    sortable: true
                },
                url: {
                    label: 'URL',
                    sortable: false
                },
                code: {
                    label: '代号',
                    sortable: false
                },
                alias: {
                    label: '别名',
                    sortable: false
                },
                date_added: {
                    label: '创建日期',
                    sortable: true
                },
                st: {
                    label: '点击数',
                    sortable: true
                },
                uid: {
                    label: '用户ID',
                    sortable: true
                },
                mode: {
                    label: '跳转模式',
                    sortable: false
                }
            }
        }
    },
    created() {
        this.GetLinksByPage(1,10);
    },
    methods: {
        GetLinksByPage(page, itemsperpage){
            Vue.http.get('https://api.na.tn/shorturl/?action=getlinks&page='+page+'&items='+itemsperpage, {timeout: 10000}).then(
            (res) => {
                this.linkitems=res.body.data;
            },
            () => {
                return 0
            }
             )   
        }
    },
}
</script>

<style scoped>
    
</style>