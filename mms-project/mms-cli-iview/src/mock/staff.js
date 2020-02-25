export default {
    search(){
        return {
            "code": 2000,
            "flag": true,
            "message": "查询成功",
            "data": {
              "total": "@integer(100,200)",
              "rows|10": [{
                "id|+1": 10,
                "username|5": "@word(1)",
                "name": "@cname",
                "age": "@integer(0,120)",
                "mobile|11": "@integer(0,9)",
                "salary": "@float(8000, 20000, 1, 2)",
                "entryDate": "@date"
              }]
            }
        }
    },

    add(){
      return {
        "code": 2000,
        "flag": true,
        "message": "新增成功"
      }
    }
}