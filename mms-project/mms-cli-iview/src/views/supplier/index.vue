<template>
    <div>
        <!-- 查询表单 -->
        <Form :model="searchForm" inline ref="findForm" style="margin-top: 10px;">
            <FormItem prop="name">
                <Input v-model="searchForm.name" placeholder="供应商名称"></Input>
            </FormItem>
            <FormItem prop="linkman">
                <Input v-model="searchForm.linkman" placeholder="联系人"></Input>
            </FormItem>
            <FormItem prop="mobile">
                <Input v-model="searchForm.mobile" placeholder="联系电话"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="getList"><Icon type="ios-search" />查询</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="addSupplierForm()"><Icon type="md-pricetag" />新增</Button>
            </FormItem>
            <FormItem>
                <Button @click="$refs['findForm'].resetFields()">重置</Button>
            </FormItem>
        </Form> 

        <!-- 表格 -->
        <Table height="450" :columns="columns" :data="list">
          <template slot-scope="{ row }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px"
            @click="updateSupplierForm(row.id)">编辑</Button>
            <Button type="error" size="small" @click="deleteSupplier(row.id)">删除</Button>
          </template>
        </Table>
        
        <!-- 分页表单 -->
        <Page :total="total" 
        show-sizer show-total show-elevator 
        :current='currentPage'
        :page-size = "pageSize"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        :page-size-opts="[10,20,30,40]"
        style="margin-top:20px;"/>

        <!-- 编辑框 -->
         <Modal
        v-model="editModal"
        title="编辑供应商">
          <Form ref="editForm" :model="editFormModel" :rules="editRule" :label-width="100">
            <FormItem prop="name" label="供应商名称">
                <Input type="text" v-model="editFormModel.name" placeholder="供应商名称">
                </Input>
            </FormItem>
            <FormItem prop="linkman" label="联系人">
                <Input type="text" v-model="editFormModel.linkman" placeholder="联系人">
                </Input>
            </FormItem>
            <FormItem prop="mobile" label="联系电话">
                <Input type="text" v-model="editFormModel.mobile" placeholder="联系电话">
                </Input>
            </FormItem>
            <FormItem prop="remark" label="备注">
                <Input type="textarea" v-model="editFormModel.remark" placeholder="备注">
                </Input>
            </FormItem>
        </Form>
        <template slot="footer">
          <Button @click="editModal=false">取消</Button>
          <Button type="primary" @click="isEdit ? updateSupplier() : addSupplier()">确定</Button>
        </template>
        </Modal>
    </div>
</template>

<script>
import supplierApi from '@/api/supplier'
export default {
  data() {
    return {
      isEdit: false,
      list: [],
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '供应商名称',
          key: 'name'
        },
        {
          title: '联系人',
          key: 'linkman'
        },
        {
          title: '联系电话',
          key: 'mobile'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      searchForm: {
        name: '',
        linkman: '',
        mobile: ''
      },
      editFormModel:{
        id: null,
        name: '',
        linkman: '',
        mobile: '',
        remark:''
      },
      editModal:false,
      editRule: {
        name: [
          {required: true, message: '请输入供应商名称', trigger: 'blur'}
        ],
        linkman: [
          {required: true, message: '请输入供应商名称', trigger: 'blur'}
        ]
      },
      total: 100,
      currentPage: 1,
      pageSize: 10,
    }
  },
  methods: {
    getList() {
      console.log(this.pageSize, this.currentPage, this.searchForm)
      supplierApi.search(this.currentPage,this.pageSize,this.searchForm).then(response => {
        const resp = response.data
        if (resp.flag) {
          this.list = resp.data.rows
          this.total = resp.data.total
        }
      })
    },
    pageChange(value) {
      this.currentPage = value
      this.getList()
    },
    pageSizeChange(value){
      this.pageSize = value
      this.getList()
    },
    addSupplierForm(){
      this.editModal = true
      this.$nextTick(() => {
        this.$refs['editForm'].resetFields()
      })
    },
    updateSupplier(){
      // 发送更新请求
      supplierApi.update(this.editFormModel).then(response => {
        const resp = response.data
        if (resp.flag) {
          this.$Message.success(resp.message)
          this.editModal = false
          this.isEdit = false
          this.getList()
        }else {
          this.$Message.warning()
        }
      })
    },
    addSupplier(){
      this.$refs['editForm'].validate((valid) => {
        if(valid){
          // 发送新增的请求
          supplierApi.add(this.editFormModel).then(response => {
            const resp = response.data
            if(resp.flag) {
              this.$Message.success(resp.message)
              this.getList()
              // 关闭
              this.editModal = false
            } else {
              this.$Message.warning(resp.message)
            }
          })
          
        }
      })
    },
    updateSupplierForm(id){
      this.isEdit = true
      // 打开窗口
      this.addSupplierForm()

      // 发送请求供应商信息的消息
      supplierApi.getInfoById(id).then(response => {
        const req = response.data
        if(req.flag){
          this.editFormModel = req.data
        }
      })
    },
    deleteSupplier(id){
      this.$Modal.confirm({
        title: '通知信息',
        content: '确定要删除吗？',
        okText: '确定',
        cancelText: '取消',
        onOk:() => {
          supplierApi.delete(id).then(response => {
            const resp = response.data
            if (resp.flag) {
              this.getList()
              this.$Message.success(resp.message)
            } else {
              this.$Message.warning(resp.message)
            }
          })
        },
        closable: false
      })
    }
  },
  created() {
    this.getList()
  },
}
</script>