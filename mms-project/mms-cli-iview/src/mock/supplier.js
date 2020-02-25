export default {
  search () {
    return {
      "code": 2000,
      "flag": true,
      "message": "查询成功",
      "data": {
        "total": "@integer(100,200)",
        "rows|10": [{
          "id|+1": 10,
          "name": "@ctitle",
          "linkman": "@cname",
          "mobile|11": "@integer(0,9)",
          "remark": "@csentence(5,15)"
        }]
      }
    }
  }
}