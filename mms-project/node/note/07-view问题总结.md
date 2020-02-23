@[toc](07-view问题总结)

# 下拉框（Dropdown）
## 如何知道自己点击了哪个

1. 首先创建下拉框

```html
<Dropdown @on-click="handleSysClick">
    <a href="javascript:void(0)">
        下拉菜单
        <Icon type="ios-arrow-down"></Icon>
    </a>
    <DropdownMenu slot="list" >
        <DropdownItem name="pwd"><Icon type="md-cog" /> 修改密码</DropdownItem>
        <DropdownItem name="sys"><Icon type="md-close-circle" /> 退出系统</DropdownItem>
    </DropdownMenu>
</Dropdown>
```

> *__有两个需要注意的地方：__*
> 1. 在 *__Dropdown__* 上添加 *__@on-click="handleSysClick"__* 监听点击事件
> 2. 给对应的 *__DropdownItem__* 添加不同的 *__name__* 属性

2. 在method选项中添加对应事件的处理函数，函数中默认传入了上面定义的name属性的值，根据该值判断具体点击了哪个下拉菜单

```javascript
// 点击了下拉菜单
handleSysClick(name){
    switch(name) {
        case 'sys' :
            this.existSystem()
            break;
        case 'pwd' :
            this.changePassword()
            break;
    }
},
```

# 对话框（Model）
## 取消按钮的默认行为
&emsp;&emsp;在使用Model对话框的时候，很多时候需要在对话框中放入表单验证，如果使用默认 *__on-ok__* 和 *__on-cancel__* 则默认在函数调用结束后会关闭对话框，不符合表单验证的需求（在验证失败的时候不要关闭对话框）。此时可以采用插槽的方法来改变替换原始的按钮。

1. 创建model

```html
<Modal
    v-model="pwdModel"
    title="修改密码">
    <Form ref="cwdForm" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="原始密码" prop="oldpwd">
            <Input type="password" v-model="formValidate.oldpwd" placeholder="请输入原始密码"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="checkpwd">
            <Input v-model="formValidate.checkpwd" placeholder="确认密码"></Input>
        </FormItem>
    </Form>
    <div slot="footer">
        <Button @click="pwdModel = false">取消</Button>
        <Button type="primary" @click="pwdModelOk">确定</Button>
    </div>
</Modal>
```

> *注意：*
> 1. 在 *__Model__* 标签上没有使用 *__on-ok__* 和 *__on-cancel__* 事件
> 2. 在 *__Model__* 标签内添加了一个 指定了 *__slot = "footer"__* 的div标签，该标签中内容会替换掉原来的底部（确定和取消按钮），在该标签中定义自己的按钮，并指定按钮的事件
> 3. 在 *__Model__* 标签内添加 *__v-model="pwdModel"__* ，绑定的 *__pwdModel__* 是一个布尔类型，为true的时候显示，为false的时候隐藏对话框

2. 在method选项中添加事件处理

```javascript
data() {
        return {
            pwdModel : false,
            // ...
        }
    },
    methods: {
        pwdModelOk(){
            this.$refs['cwdForm'].validate((valid) => {
                if(valid) {
                    this.$Message.success('密码修改成功')
                    // 关闭对话框
                    this.pwdModel = false
                } else {
                    this.$Message.warning('密码修改失败')
                }
            })
        }
    }
}
</script>
```