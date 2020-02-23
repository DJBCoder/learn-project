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
            title="修改密码">
            <Form ref="cwdForm" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="原始密码" prop="oldpwd">
                    <Input type="password" v-model="formValidate.oldpwd" placeholder="请输入原始密码"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input type="password" v-model="formValidate.password" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="checkpwd">
                    <Input type="password" v-model="formValidate.checkpwd" placeholder="确认密码"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="pwdModel = false">取消</Button>
                <Button type="primary" @click="pwdModelOk">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { checkPassword , changePwd} from '@/api/password'
export default {
    data() {
        const validateCheckPwd = (rule, value, callback) => {
            if (value !== this.formValidate.password) {
                callback(new Error('两次输入的密码不一致！'));
            } else {
                callback();
            }
        };
        const validateOldPwd = (rule, value, callback) => {
            // 发送验证密码
            checkPassword(this.user.id, value).then(response => {
                const pwdRes = response.data
                if(pwdRes.flag) {
                    callback()
                }else {
                    callback(new Error(pwdRes.message))
                }
            })
        }
        return {
            user : this.$store.state.login.user,
            pwdModel : false,
            formValidate: {
                oldpwd: '',
                password: '',
                checkpwd: ''
            },
            ruleValidate: {
                oldpwd: [
                    {required: true, message: '原始密码不能为空', trigger: 'blur'},
                    {validator: validateOldPwd, trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '原始密码不能为空', trigger: 'blur'}
                ],
                checkpwd: [
                    {required: true, message: '确定密码不能为空', trigger: 'blur'},
                    {validator: validateCheckPwd, trigger: 'blur'}
                ]
            }
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
            this.$nextTick(()=>{
                this.$refs['cwdForm'].resetFields()
            })
        },
        pwdModelOk(){
            this.$refs['cwdForm'].validate((valid) => {
                if(valid) {
                    // 发送修改密码
                    changePwd (this.user.id, this.formValidate.checkpwd).then(response => {
                        const cwdRes = response.data
                        if(cwdRes.flag) {
                            this.$Message.success('密码修改成功')
                            this.pwdModel = false
                        } else {
                            this.$Message.warning(cwdRes.message)
                        }
                    })
                    
                }
            })
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