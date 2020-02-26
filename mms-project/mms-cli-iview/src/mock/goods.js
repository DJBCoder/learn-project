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
          "name|5": "@cword",
          "code": "@word",
          "sepc": "@integer(0,9)L",
          "retailPrice": "@float(0,100,1,3)",
          "purchasePrice": "@float(0,100,1,3)",
          "storageNum": "@integer(0,500)",
          "supplierName": "@ctitle"
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
  },

  getInfoById(){
    return {
      "code": 2000,
      "flag": true,
      "message": "查询成功",
      "data": {
        "id": 10,
        "name": "test01",
        "code": "@word",
        "sepc": "@integer(0,9)L",
        "retailPrice": "@float(0,100,1,3)",
        "purchasePrice": "@float(0,100,1,3)",
        "storageNum": "@integer(0,500)",
        "supplierName": "@ctitle"
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

  delete(){
    return {
      "code": 2000,
      "flag": true,
      "message": "删除成功"
    }
  }
}