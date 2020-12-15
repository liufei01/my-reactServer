/*包含n个能操作mongodb数据库集合的model的模块
1.连接数据库1.1.引入mongoose
1.2.连接指定数据库(URL只有数据库是变化的)
1.3.获取连接对象1.4.绑定连接完成的监听(用来提示连接成功)
2.定义出对应特定集合的Model并向外暴露
2.1.字义Schema(描述文档结构)
2.2.定义Model(与集合对应,可以操作集合)
2.3.向外暴露Model*/

// 1.连接数据库1.1.引入mongoose
// 1.2.连接指定数据库(URL只有数据库是变化的)
// 1.3.获取连接对象1.4.绑定连接完成的监听(用来提示连接成功)
const mongoose = require('mongoose')
var url = 'mongodb://127.0.0.1:27017/my-reactServer'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const conn = mongoose.connection

conn.on('connected', function () {
  console.log('数据库连接成功')
})

// 2.定义出对应特定集合的Model并向外暴露
// 2.1.字义Schema(描述文档结构)
// 2.2.定义Model(与集合对应,可以操作集合)
// 2.3.向外暴露Model*/

const userSchema = mongoose.Schema({
  username: { type: String, required: true }, //姓名
  password: { type: String, required: true }, //密码
  type: { type: String, required: true }, // 性别
  header: { type: String }, //头像
  xueii: { type: String }, //学历
  detail: { type: String }, //个人简介
  age: { type: String }, //年龄
  money: { type: String } //收入
})

// 定义Model,与集合对应，可以操作集合
const UserModel = mongoose.model('user', userSchema)

// 向外暴露Model

// module.exports=xxxx //一次性暴露

exports.UserModel=UserModel   //分别暴露
