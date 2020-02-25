<template>
    <div>
        <!-- 查询表单 -->
        <Form :model="findFormModel" ref="findform" inline style="margin-top:20px;">
            <FormItem prop="username">
                <Input v-model="findFormModel.username" placeholder="账号"></Input>
            </FormItem>
             <FormItem prop="name">
                <Input v-model="findFormModel.name" placeholder="姓名"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="getList"><Icon type="ios-search" />查询</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="addSupplierForm()"><Icon type="md-pricetag" />新增</Button>
            </FormItem>
            <FormItem>
                <Button @click="$refs['findform'].resetFields()">重置</Button>
            </FormItem>
        </Form>

        <!-- 表格 -->
        <Table height="450" :columns="columns" :data="list">
            <template slot="action" slot-scope="{ row }">
                <Button type="primary" size="small" style="margin-right: 5px">编辑</Button>
                <Button type="error" size="small">删除</Button>
            </template>
        </Table>

        <!-- 分页 -->
        <Page :total="total" :show-sizer="true" show-elevator show-total
        :current="curPage"
        :page-size="pageSize"
        :page-size-opts="[10,20,30,50]"
        @on-change="curPageChange"
        @on-page-size-change="pageSizeChange"
        style="margin-top:20px"/>
        <!-- 弹窗 -->
    </div>
</template>

<script>
import staffApi from '@/api/staff'
export default {
    data() {
        return {
            findFormModel:{
                name: '',
                username: ''
            },
            list: [],
            columns: [
                {
                    title: '序号',
                    type: 'index'
                },
                {
                    title: '账号',
                    key: 'username'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '电话',
                    key: 'mobile'
                },
                {
                    title: '薪酬',
                    key: 'salary'
                },
                {
                    title: '入职时间',
                    key: 'entryDate'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                },
            ],
            curPage: 1,
            pageSize: 10,
            total: 100
        }
    },
    methods: {
        getList() {
            staffApi.search(this.curPage, this.pageSize, {}).then(response => {
                const resp = response.data
                if (resp.flag) {
                    console.log(resp.data)
                    this.list = resp.data.rows
                    this.total = resp.data.total
                }
            })
        },
        curPageChange(value){
            this.curPage = value
            this.getList()
        },
        pageSizeChange(value){
            this.pageSize = value
            this.getList()
        },
        addSupplierForm() {

        }
    },
    created(){
        this.getList()
    }
}
</script>