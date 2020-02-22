@[toc](Vuex项目路径配置)

&emsp;&emsp;如果所有的状态都写在一个js文件中，这个 js必定会很臃肿，Vuex并不限制你的代码结构。建议按以下代码结构来构建项目结构:

```text
└── store 
    ├── index.js # 我们组装模块并导出store的地方 
    ├── actions.js # 根级别的 action 
    ├── mutations.js # 根级别的 mutation 
    ├── state.js # 根级别的 state
    ├── getters.js # 根级别的getters
    └── modules
        └── ... # 根据需要封装模块
```

1. 在 *__src/store__* 的目录下新建 *__actions.js、mutations.js、state.js和getters.js__* 文件，在这些文件中分别输入下面的代码：

```javascript
export default {

}
```

2. 在 *__src/store__* 的目录下新建 *__modules__* 的目录

3. 修改 *__src/store/index.js__* 文件：

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import state from './state'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
```

> *__注意：当在modules目录中新建模块的时候，需要在src/store/index.js中引入，并在modules选项中添加引入__*