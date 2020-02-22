<template>
  <div class="home">
    <button @click="handleClick">发送请求</button>
    {{list}}
  </div>
</template>

<script>
// 导入刚才编写好的api
import memberApi from '@/api/member'
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    handleClick () {
      // 调用接口的方法
      memberApi.getList().then(response => {
        const resp = response.data
        if (resp.flag) {
          this.list = resp.data
        }
      })
    }
  },
}
</script>
