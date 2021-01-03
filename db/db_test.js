// 使用mongoose操作mongodb数据库
/*
1.连接数据库
1.1.引入mongoose
1.2.连接指定数据库(URL只有数据库是变化的)
1.3.获取连接对象
1.4.绑定连接完成的监听(用来提示连接成功)
2.得到对应特定集合的Model
2.1.字义Schema(描述文档结构)
2.2.定义Model(与集合对应,可以操作集合)
3.通过Model或其实例对集合数据进行CRUD操作
3.1.通过Model实例的save()添加数据
3.2.通过Model的find()/findOne()查询多个或一个数据
3.3.通过Model的findByIdAndUpdate()更新某个数据
3.4.通过Model的remove()删除匹配的数据
*/

/*
1.连接数据库
1.1.引入mongoose
1.2.连接指定数据库(URL只有数据库是变化的)
1.3.获取连接对象
1.4.绑定连接完成的监听(用来提示连接成功)
*/
const mongoose = require('mongoose')
const MD5 = require('blueimp-md5')
var url = 'mongodb://39.104.69.148:27017/my-reactServer'
// var url = 'mongodb://127.0.0.1:27017/my-reactServer'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const conn = mongoose.connection

conn.on('connected', function () {
  console.log('数据库连接成功！')
})

/* 
2.得到对应特定集合的Model
2.1.字义Schema(描述文档结构)
2.2.定义Model(与集合对应,可以操作集合)
*/
const userSchema = mongoose.Schema({
  //指定文档的结构，属性名/属性值类型，是否是必须的，默认值
  username: { type: String, required: true }, //用户名
  password: { type: String, required: true }, //密码
  type: { type: String, required: true } //用户类型：美女/帅哥
})

const UserModel = mongoose.model('user', userSchema) //集合名为：users

/**
3.通过Model或其实例对集合数据进行CRUD操作
3.1.通过Model实例的save()添加数据
3.2.通过Model的find()/findOne()查询多个或一个数据
3.3.通过Model的findByIdAndUpdate()更新某个数据
3.4.通过Model的remove()删除匹配的数据
 * 
 */

//  进行增删改查CRUD
function testSave () {
  // 创建UserModel的实例
  // 增加数据 save
  const userModel = new UserModel({
    username: '第五',
    password: MD5('456'),
    type: 'meinv'
  })

  userModel.save(function (err, user) {
    console.log(err, user)
  })
}

testSave()
// 查询数据 find查全部  findOne查一条
function testFind () {
  UserModel.find(function (err, users) {
    console.log(err, users)
  })
  UserModel.findOne({ _id: '5fd61b6ed2facd1b183b5eab' }, function (err, user) {
    console.log('findOne', err, user)
  })
}

// testFind()

// 更改数据 findByIdAndUpdate

function testUpdate () {
  UserModel.findByIdAndUpdate(
    { _id: '5fd61b6ed2facd1b183b5eab' },
    { username: '非常', type: 'meinv' },
    function (err, doc) {
      console.log('findByIdAndUpdate', err, doc)
    }
  )
}
// testUpdate()

// 删除数据 deleteOne 删除一个，detemeMany删除多个
function testDelete () {
  // UserModel.deleteOne({ _id: '5fd625457078bf1d48bdbc51' }, function (err, doc) {
  //   console.log('deleteOne', err, doc)
  // })
  UserModel.deleteMany(function (err, doc) {
    console.log('deleteMany', err, doc)
  })
}

// testDelete()
