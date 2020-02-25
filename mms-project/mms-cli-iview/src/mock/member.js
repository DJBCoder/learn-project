export default {
    // 根据条件获取会员列表
    search () {
        console.log('mock member search')
        return {
            "code": 2000,
            "flag": true,
            "message": "查询成功",
            "data": {
              "total": "@integer(100,200)",
              "rows|10": [{
                "id|+1": 10,
                "cardNum": "@integer(10000)",
                "name": "@cname",
                "birthday": "@date",
                "phone|11": "@integer(0,9)",
                "integral": "@integer(0,500)",
                "money": "@float(0,1000,1,3)",
                "payType|1": ['1', '2', '3', '4'],
                "address": '@county(true)'
              }]
            }
        }
    },

    // 新建会员
    add () {
      console.log('mock member add')
      return {
        "code": 2000,
        "flag": true,
        "message": "新增成功"
      }
    },

    // 获取会员信息
    getUserInfoById () {
      console.log('mock member getUserInfoById')
      return {
        "code": 2000,
        "flag": true,
        "message": "查询成功",
        "data": {
          "id": 10,
          "cardNum": "test01",
          "name": "测试会员",
          "birthday": "@date",
          "phone|11": "@integer(0,9)",
          "integral": "@integer(0,500)",
          "money": "@float(0,1000,1,3)",
          "payType|1": ['1', '2', '3', '4'],
          "address": '@county(true)'
        }
      }
    },

    // 会员数据更新
    update (){
      console.log('mock member update')
      return {
        "code": 2000,
        "flag": true,
        "message": "修改成功"
      }
    },

    // 删除会员
    delete () {
      console.log('mock member delete')
      return {
        "code": 2000,
        "flag": true,
        "message": "删除成功"
      }
    }
}