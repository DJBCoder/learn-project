<template>
    <div>
        <Form ref="findForm" :model="searchMap" inline>
            <FormItem prop="cardNum">
                <Input v-model="searchMap.cardNum" placeholder="会员卡号"></Input>
            </FormItem>
            <FormItem prop="name">
                <Input v-model="searchMap.name" placeholder="会员名称"></Input>
            </FormItem>
            <FormItem prop="payType">
                <Select v-model="searchMap.payType" style="width:200px">
                    <Option v-for="item in payTypeOptions" :value="item.type" :key="item.type">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem prop="birthday">
                <DatePicker type="date" placeholder="出生日期" v-model="searchMap.birthday" style="width: 200px"
                format="yyyy-MM-dd"></DatePicker>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="getList"><Icon type="ios-search" />查询</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="addMember"><Icon type="md-pricetag" />新增</Button>
            </FormItem>
            <FormItem>
                <Button @click="$refs['findForm'].resetFields()">重置</Button>
            </FormItem>
        </Form>

        <Table height="500" :columns="columns" :data="list" :border="true">
            <template slot-scope="{ row }" slot="payType">
                <span>{{ row.payType | filterType }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="updateMember(row.id)">编辑</Button>
                <Button type="error" size="small">删除</Button>
            </template>
        </Table>
        <Page :total="totalPage" show-sizer show-elevator show-total :current="curPage" :page-size="pageSize"
        :page-size-opts="[10,20,30,50]"
        @on-change="changeCurPage"
        @on-page-size-change="changePageSize"/>

        <Modal
            v-model="editMemberModel"
            title="编辑会员">
            <Form ref="editForm" :model="editMap" :label-width="80" :rules="editRules">
                <FormItem prop="cardNum" label="会员卡号">
                    <Input v-model="editMap.cardNum" placeholder="会员卡号"></Input>
                </FormItem>
                <FormItem prop="name" label="会员姓名">
                    <Input v-model="editMap.name" placeholder="会员姓名"></Input>
                </FormItem>
                <FormItem prop="birthday" label="会员生日">
                    <DatePicker 
                    v-model="editMap.birthday" 
                    type="date" 
                    placeholder="会员生日" 
                    format="yyyy-MM-dd"></DatePicker>
                </FormItem>
                <FormItem prop="phone" label="手机号码">
                    <Input v-model="editMap.phone" placeholder="手机号码"></Input>
                </FormItem>
                <FormItem prop="money" label="开卡金额">
                    <Input v-model="editMap.money" placeholder="开卡金额"></Input>
                </FormItem>
                <FormItem prop="payType" label="支付类型">
                    <Input v-model="editMap.payType" placeholder="支付类型"></Input>
                </FormItem>
                <FormItem prop="address" label="会员地址">
                    <Input v-model="editMap.address" placeholder="会员地址" type="textarea"></Input>
                </FormItem>
            </Form>
            <template slot="footer">
              <Button @click="editMemberModel = false">取消</Button>
              <Button @click="isEdit ? update() : add()" type="primary">确定</Button>
            </template>
        </Modal>
    </div>
</template>
<script>
import memberApi from '@/api/member'

const payTypeOptions = [
    {type: '1', name: '现金'},
    {type: '2', name: '微信'},
    {type: '3', name: '支付宝'},
    {type: '4', name: '银行卡'}
]

export default {
    data() {
        return {
          isEdit: false,
          editMemberModel: false,
            payTypeOptions,
            searchMap: {
                cardNum: '',
                name: '',
                payType: '',
                birthday: null,
            },
            editMap: {
              id: '',
              cardNum: '',
              name: '',
              birthday: null,
              phone:'',
              money: '',
              payType: '',
              address: ''
            },
            editRules: {
              cardNum: [
                {required: true,message: '请输入会员卡号', trigger: 'blur'}
              ],
              name: [
                {required: true,message: '请输入会员名称', trigger: 'blur'}
              ]
            },
            curPage: 1,
            pageSize: 10,
            totalPage: 100,
            list: [],
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '会员卡号',
                    key: 'cardNum'
                },
                {
                    title: '会员姓名',
                    key: 'name'
                },
                {
                    title: '会员生日',
                    key: 'birthday'
                },
                {
                    title: '手机号码',
                    key: 'phone'
                },
                {
                    title: '可用积分',
                    key: 'integral'
                },
                {
                    title: '开卡金额',
                    key: 'money'
                },
                {
                    title: '支付类型',
                    key: 'payType',
                    slot: 'payType'
                },
                {
                    title: '会员地址',
                    key: 'address'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: '150px'
                }
            ],
        }
    },
    methods: {
        getList () {
            memberApi.search(this.curPage, this.pageSize,this.searchMap).then(response => {
                const memberRes = response.data
                if (memberRes.flag) {
                    this.list = memberRes.data.rows
                    this.totalPage = memberRes.data.total
                }
            })
        },
        changeCurPage(value){
            this.curPage = value
            this.getList()
        },
        changePageSize(value){
            this.pageSize = value
            this.getList()
        },
        addMember() {
          // 弹出对话框
          this.editMemberModel = true,
          this.$nextTick(() => {
            // 清空输入表格
            this.$refs['editForm'].resetFields()
          })
        },
        add(){
          console.log('aaa')
          // 判断是否满足条件
          this.$refs['editForm'].validate((valid) => {
            if (valid) {
              // 提交新建的请求
              memberApi.add(this.editMap).then(response => {
                const memberRes = response.data
                if(memberRes.flag) {
                  this.$Message.success(memberRes.message)
                  // 关闭窗口
                  this.editMemberModel = false

                  // 获取会员列表
                  this.getList()
                } else {
                  this.$Message.warning(memberRes.message)
                }
              })
            }
          })
        },
        updateMember(id) {
          this.isEdit = true
          // 打开编辑窗口
          this.addMember()
          // 根据id 发送请求人员信息的请求
          memberApi.getUserInfoById(id).then(response => {
            const resp = response.data
            if(resp.flag){  
               // 初始化
               console.log(resp.data)
               this.editMap = resp.data          
            }
          })
         
        },
        update () {
          // 发送更新请求
          memberApi.update(this.editMap).then(response => {
            const resp = response.data
            if (resp.flag) {
              this.isEdit = false
              this.editMemberModel = false
              this.getList()
              this.$Message.success(resp.message)
            } else {
              this.$Message.warning(resp.message)
            }
          })
        }
    },
    created() {
        this.getList()
    },
    filters: {
        filterType (value) {
            const obj = payTypeOptions.find((opt) => {
                return opt.type === value
            })
            return obj.name || ''
        }
    }
}
</script>

<style scoped>
    .ivu-page {
        margin-top: 10px;
    }
    .ivu-form {
        margin-top: 10px;
    }
</style>