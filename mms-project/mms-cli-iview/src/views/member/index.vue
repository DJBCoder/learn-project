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
                <Button type="primary"><Icon type="md-pricetag" />新增</Button>
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
                <Button type="primary" size="small" style="margin-right: 5px" >编辑</Button>
                <Button type="error" size="small">删除</Button>
            </template>
        </Table>
        <Page :total="totalPage" show-sizer show-elevator show-total :current="curPage" :page-size="pageSize"
        :page-size-opts="[10,20,30,50]"
        @on-change="changeCurPage"
        @on-page-size-change="changePageSize"/>
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
            payTypeOptions,
            searchMap: {
                cardNum: '',
                name: '',
                payType: '',
                birthday: null,
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