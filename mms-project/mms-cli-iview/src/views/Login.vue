<template>
    <div class="login-container">
        <Form ref="loginForm" :model="formValidate" :rules="ruleValidate" :label-width="80" class="login-form">
            <h2 class="login-header">会员管理系统</h2>
            <FormItem label="用户名" prop="username">
                <Input v-model="formValidate.username" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('loginForm')">登陆</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            formValidate: {
                username: '',
                password: '',
            },
            ruleValidate: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        // 登陆操作
        handleSubmit (name) {
            // 前端校验
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('Login', this.formValidate.username, this.formValidate.password)
                    .then(response => {
                        if (response.flag) {
                            this.$router.push('/')
                        } else {
                            this.$Message.warning(response.message)
                        }
                    })
                }
            })
        },
    }
}
</script>

<style scoped>
    .login-form {
        width: 350px;
        background-color: rgba(255,255,255,0.8);
        border-radius: 10px;
        margin: 160px auto;
        padding: 20px;
    }
    .login-header {
        text-align: center;
        color: #303133;
        margin: 10px;
    }
    .login-container{
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url('../assets/img/login.jpg');
    }
</style>