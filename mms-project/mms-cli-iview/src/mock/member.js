export default {
    // 根据条件获取会员列表
    search () {
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
    }
}