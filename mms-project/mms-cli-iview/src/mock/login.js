export default {
    // 登陆接口
    login () {
        return {
            code: 2000,
            flag: true,
            message: "验证成功",
            data: {
                token: "admin"
            }
        }
    },

    // 根据token获取用户信息
    getUserInfo () {
        return {
        "code": 2000,
        "flag": true,
        "message": "成功获取用户信息",
        "data": {
            "id|1-10000": 1,
            "name": "@cname",
            "roles": ["manager"]
        }
        }
    },

    // 登出系统
    logout () {
        return {
            "code": 2000,
            "flag": true,
            "message": "退出成功"
        }
    }
}
