<template>
    <div>
        <!-- 查询表单 -->

        <Form inline ref="findForm" :model="findModel" style="margin-top:20px;">
          <FormItem prop="name">
            <Input v-model="findModel.name" placeholder="商品名称"></Input>
          </FormItem>
          <FormItem prop="code">
            <Input v-model="findModel.code" placeholder="商品代码"></Input>
          </FormItem>
          <FormItem prop="supplierName">
            <Input v-model="findModel.supplierName" placeholder="供应商" readonly
            @click.native="openSupplierForm"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="getList"><Icon type="ios-search" /> 查找</Button>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="addGoodsForm"><Icon type="md-pricetag" />新增</Button>
          </FormItem>
          <FormItem>
            <Button @click="$refs['findForm'].resetFields()">重置</Button>
          </FormItem>
        </Form>
        <!-- 表格 -->
        <Table height="450" :columns="columns" :data="list">
          <template slot="action" slot-scope="{row}">
            <Button type="primary" size="small" style="margin-right: 5px" @click="updateForm(row.id)">编辑</Button>
            <Button type="error" size="small" @click="deleteGoods(row.id)">删除</Button>
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

        <!-- 选择供应商对话框 -->
        <Modal
          v-model="supplierModal"
          title="选择供应商"
          width = 850
          >
          <AppSuppiler :isDialog="true" @changename="changename"/>
         <div slot="footer">

         </div>
        </Modal>

        <!-- 编辑商品 -->
        <Modal
          v-model="editModal"
          title="编辑商品"
          >
          <Form ref="editForm" :model="editModel" :rules="editRule" :label-width="80">
            <FormItem label="商品名称" prop="name">
              <Input v-model="editModel.name" placeholder="商品名称"></Input>
            </FormItem>
            <FormItem label="商品编码" prop="code">
              <Input v-model="editModel.code" placeholder="商品编码"></Input>
            </FormItem>
            <FormItem label="商品规格" prop="sepc">
              <Input v-model="editModel.sepc" placeholder="商品规格"></Input>
            </FormItem>
            <FormItem label="零售价" prop="retailPrice">
              <Input v-model="editModel.retailPrice" placeholder="零售价"></Input>
            </FormItem>
            <FormItem label="进货价" prop="purchasePrice">
              <Input v-model="editModel.purchasePrice" placeholder="进货价"></Input>
            </FormItem>
            <FormItem label="库存数量" prop="storageNum">
              <Input v-model="editModel.storageNum" placeholder="库存数量"></Input>
            </FormItem>
            <FormItem label="供应商" prop="supplierName">
              <Input v-model="editModel.supplierName" placeholder="供应商" readonly
              @click.native="chooseSupplier"></Input>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button @click="editModal = false">取消</Button>
            <Button type="primary" @click="isEdit ? updateGoods() : addGoods()">确定</Button>
          </div>
        </Modal>
    </div>
</template>

<script>
import goodsApi from '@/api/goods.js'
import AppSuppiler from '@/views/supplier'
export default {
  data() {
    return {
      isEdit: false,
      isSearch : true,
      supplierModal:false,
      editModal: false,
      list : [],
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '商品名称',
          key: 'name'
        },
        {
          title: '商品编码',
          key: 'code'
        },
        {
          title: '商品规格',
          key: 'sepc'
        },
        {
          title: '零售价',
          key: 'retailPrice'
        },
        {
          title: '进货价',
          key: 'purchasePrice'
        },
        {
          title: '库存数量',
          key: 'storageNum'
        },
        {
          title: '供应商',
          key: 'supplierName'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        },
      ],
      findModel: {
        name: '',
        code: '',
        supplierName: ''
      },
      pageSize: 10,
      total: 100,
      curPage: 1,
      editModel: {
        id: null,
        name: '',
        code: '',
        sepc: '',
        retailPrice: '',
        purchasePrice: '',
        storageNum: 0,
        supplierName: ''
      },
      editRule: {
        name: [
          {required: 'true', message: '请输入商品名称', trigger: 'blur'}
        ],
        code: [
          {required: 'true', message: '请输入商品编号', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    updateForm(id){
      this.addGoodsForm()
      this.isEdit = true
      goodsApi.getInfoById(id).then(response => {
        const resp = response.data
        if(resp.flag){
          this.editModel = resp.data
        }
      })
    },
    chooseSupplier(){
      this.supplierModal = true
    },
    addGoodsForm() {
      this.editModal = true
      this.$nextTick(() => {
        this.$refs['editForm'].resetFields()
      })
    },
    updateGoods () {
      this.$refs['editForm'].validate(valid => {
        goodsApi.update(this.editModel).then(response => {
          const resp = response.data
          if(resp.flag){
            this.$Message.success(resp.message)
            this.isEdit = false
            this.getList()
            this.editModal = false
          }else{
            this.$Message.success(resp.message)
          }
        })
      })
    },
    addGoods() {
      this.$refs['editForm'].validate((valid) => {
        if(valid){
          goodsApi.add(this.editModel).then(response => {
            const resp = response.data
            if(resp.flag){
              this.editModal = false
              this.$Message.success(resp.message)
              this.getList()
            }else {
              this.$Message.warning(resp.message)
            }
          })
        }
      })
    },
    getList() {
      goodsApi.search(this.pageSize, this.curPage, this.findModel).then(response => {
        const resp = response.data
        if (resp.flag) {
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
    openSupplierForm() {
      this.supplierModal = true
    },
    changename(name){
      if (this.editModal) {
        this.editModel.supplierName = name 
      }else{
        this.findModel.supplierName = name
      }
      
      this.supplierModal = false
    },
    deleteGoods(id){
      this.$Modal.confirm({
        title: '通知信息',
        content: '确定要删除吗？',
        okText: '确定',
        cancelText: '取消',
        onOk:() => {
          goodsApi.delete(id).then(response => {
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
  components:{
    AppSuppiler
  }
}
</script>