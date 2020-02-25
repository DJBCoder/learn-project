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
                <Button type="primary"><Icon type="md-pricetag" />新增</Button>
            </FormItem>
            <FormItem>
                <Button @click="$refs['findForm'].resetFields()">重置</Button>
            </FormItem>
        </Form> 

        <!-- 表格 -->
        <Table height="450" :columns="columns" :data="list">
          <template slot-scope="{ row }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px">编辑</Button>
            <Button type="error" size="small" >删除</Button>
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

        
    </div>
</template>

<script>
import supplierApi from '@/api/supplier'
export default {
  data() {
    return {
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
      findForm: {
        name: '',
        linkman: '',
        mobile: ''
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
    }
  },
  created() {
    this.getList()
  },
}
</script>