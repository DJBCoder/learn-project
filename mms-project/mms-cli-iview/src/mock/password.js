export default {
    // 验证密码是否正确
    checkPassword () {
        return {
            "code": 2000,
            "flag": true,
            "message": "密码正确"
        }
    },

    // 修改密码
    changePwd () {
        return {
            "code": 2000,
            "flag": true,
            "message": "密码更新成功"
        }
    }
}