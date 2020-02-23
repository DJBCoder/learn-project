<template>
    <div class="header">
        <a href="/" class="logo-container">
            <img src="@/assets/img/logo.png" alt="logo" width="25px" class="logo">
            <span class="company">会员管理系统</span>
        </a>
        <Dropdown @on-click="handleSysClick">
            <a href="javascript:void(0)">
                下拉菜单
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list" >
                <DropdownItem name="pwd"><Icon type="md-cog" /> 修改密码</DropdownItem>
                <DropdownItem name="sys"><Icon type="md-close-circle" /> 退出系统</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Modal
            v-model="pwdModel"
            title="修改密码"
            @on-ok="pwdModelOk"
            @on-cancel="pwdModel = false">
            
        </Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pwdModel : false
        }
    },
    methods: {
        // 点击了下拉菜单
        handleSysClick(name){
            switch(name) {
                case 'sys' :
                    this.existSystem()
                    break;
                case 'pwd' :
                    this.changePassword()
                    break;
            }
        },
        // 退出系统
        existSystem () {
            this.$store.dispatch('Logout').then(response => {
                if (response.flag) {
                    this.$router.push('/login')
                }else {
                    this.$Message.warning(response.message)
                }
            })
        },
        // 修改密码
        changePassword() {
            this.pwdModel = true
        },
        pwdModelOk(){
            this.pwdModel = false
        }
    }
}
</script>

<style scoped>
.logo-container {
    margin-left:40px; 
}
.logo {
    vertical-align: middle;
    margin-right: 10px;
}
.company {
    position: relative;
    color: white;
}
.ivu-dropdown {
    float: right;
    margin-right: 40px;
    color: white;
    cursor: pointer;
}
.ivu-dropdown-rel > a{
    color:white;
}
</style>