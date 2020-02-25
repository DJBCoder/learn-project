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
                <Button type="primary" @click="addSatffForm()"><Icon type="md-pricetag" />新增</Button>
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

        <Modal
            v-model="editModal"
            title="编辑员工"
            >
            <Form :model="editModel" ref="editform" :rules="editRule" :label-width="80">
                <FormItem prop="username" label="用户名">
                    <Input v-model="editModel.username" placeholder="用户名"></Input>
                </FormItem>
                <FormItem prop="name" label="姓名">
                    <Input v-model="editModel.name" placeholder="姓名"></Input>
                </FormItem>
                <FormItem prop="age" label="年龄">
                    <Input v-model="editModel.age" placeholder="年龄"></Input>
                </FormItem>
                <FormItem prop="mobile" label="电话">
                    <Input v-model="editModel.mobile" placeholder="电话"></Input>
                </FormItem>
                <FormItem prop="salary" label="薪资">
                    <Input v-model="editModel.salary" placeholder="薪资"></Input>
                </FormItem>
                <FormItem prop="entryDate" label="入职时间">
                    <DatePicker type="date" placeholder="入职时间" 
                    v-model="editModel.entryDate"
                    format="yyyy-MM-dd"></DatePicker>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="editModal = false">取消</Button>
                <Button type="primary" @click="isEdit ? updateStaff() : addStaff()">确定</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
import staffApi from '@/api/staff'
export default {
    data() {
        return {
            isEdit: false,
            editModal: false,
            editModel: {
                id: null,
                username: '',
                name: '',
                age: 0,
                mobile: '',
                salary: 0,
                entryDate: null
            },
            editRule: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                name: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
            },
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
        addSatffForm() {
            this.editModal = true
            this.$nextTick(() => {
                this.$refs['editform'].resetFields()
            })
        },
        addStaff(){
            staffApi.add(this.editModel).then(response => {
                const resp = response.data
                if(resp.flag){
                    this.$Message.success(resp.message)
                    this.editModal = false
                    this.getList()
                } else {
                    this.$Message.warning(resp.message)
                }
            })
        },
        updateStaff(){

        }
    },
    created(){
        this.getList()
    }
}
</script>