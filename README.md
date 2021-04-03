# cold_chain
name

## Project setup
```
npm install
npm run serve
npm run build
npm run lint
```

#### git commit 命名规范
| 类型 | 备注 |
|:-------- |:---- |
| feat     | 新功能（feature）|
| fix      | 修补bug|
| docs     | 文档（documentation）|
| style    |  格式（不影响代码运行的变动）|
| refactor | 重构（既不是新增功能，也不是修改bug的代码变动）|
| test     | 增加测试代码 |
| chore    | 构建过程辅助工具的变动 |
| markdown | 编辑markdown文档 |
| desc     | 添加描述 |

#### 状态码说明
| code | 备注 |
|:-------- |:---- |
| 10002     | 旧密码错误|
| 10036      | 手机号已存在|

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### 业务需求
- [x] 登录
- [x] 注册
- [x] 退出登录
- [x] 修改密码
- [x] 删除用户
- [x] 获取用户信息
- [ ] 修改用户信息(用户信息/角色)
- [x] 获取用户列表
- [ ] 添加用户
- [x] 获取单位列表
- [ ] 短信验证带开发
- [ ] 用户信息加密到session-storage
- [ ] 获取单位列表
- [ ] 修改单位信息
- [ ] 新增单位
- [ ] 删除单位

#### 问题
修改单位 关于 联系人字段 的传参确认 linkmanInfo
areacode 字段 确认干什么用的

### 测试账号、密码
bys_001 bys_001

### 参考第三方账号密码
账号：experience 
密码：123456
链接：http://www.honeylinking.com/

### 待解决错误
1、登陆成功后的接口调整：返回用户信息应该和获取用户信息接口一致
2、代理用户登陆后无法获取单位管理员和普通用户的列表 （没有挂单位的情况下应该返回空列表，接口之间报错）
3、单位管理员无法获取 用户列表 (用户没有挂单位的话，应该查出为空)

#### 权限说明
userType 1: 超管 2: 管理员 3: 单位管理员 4: 普通用户 5: 代理用户

超级管理元账号: admin  123456

| code | 类型 | 说明 |
|:-------- |:---- |:---|
|userType |number| 用户类型 2: 管理员 3: 单位管理员 4: 普通用户 5: 代理用户|
|phone |number| 电话|
|id |number|用户id|
|trueName |string|姓名|
|email |string|邮箱|
|projectIds |int[]|用户被分配的公司id|
|start |int|第几页，默认第一页|
|limit |int|条数，默认返回所有条|