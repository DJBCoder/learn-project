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
  },

  add () {
    return {
      "code": 2000,
      "flag": true,
      "message": "新增成功"
    }
  },

  getInfoById() {
    return {
      "code": 2000,
      "flag": true,
      "message": "查询成功",
      "data": {
        "id": 10,
        "name": "test01",
        "linkman": "linkman01",
        "mobile|11": "@integer(0,9)",
        "remark": "@csentence(5,15)"
      }
    }
  },

  update(){
    return {
      "code": 2000,
      "flag": true,
      "message": "修改成功"
    }
  },

  delete () {
    return {
      "code": 2000,
      "flag": true,
      "message": "删除成功"
    }
  }
}