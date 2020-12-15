var express = require('express')
var router = express.Router()

const UserModel = require('../db/models').UserModel

const MD5 = require('blueimp-md5')
const filter = { password: 0, __v: 0 } //查询时过滤出指定的属性
// 注册一个路由：用户注册
/*
a)path为:/register
b)请求方式为:POST
c)接收username和password参数
d)admin是已注册用户
e)注册成功返回:{code:0,data:{_id:'abc',username:‘xxx’,password:’123’}
f)注册失败返回:{code:1,msg:'此用户已存在'}
*/

// 注册的路由
// 回调函数的作用：1、获取请求参数，2、处理数据，3、返回响应数据
router.post('/register', function (req, res) {
  // 1、获取请求参数  post请求从body中取值
  const { username, password, type } = req.body
  // 2、处理逻辑(判断用户是否存在)
  UserModel.findOne({ username }, function (err, user) {
    if (user) {
      res.send({ code: 1, msg: '此用户已经存在' })
    } else {
      new UserModel({ username, type, password: MD5(password) }).save(function (
        err,
        user
      ) {
        res.cookie('userId', user._id.$oid, { maxAge: 1000 * 60 * 60 * 24 })
        var data = { username, type, _id: user._id.$oid }
        res.send({
          code: 0,
          data
        })
      })
    }
  })
})

// 登录路由
router.post('/login', function (req, res) {
  const { username, password } = req.body

  // 根据信息查询数据库

  UserModel.findOne({ username, password: MD5(password) }, filter, function (
    err,
    user
  ) {
    if (user) {
      res.cookie('userId', user._id.$oid, { maxAge: 1000 * 60 * 60 * 24 })
      res.send({ code: 0, data: user })
    } else {
      res.send({ code: 1, msg: '用户名或者密码错误' })
    }
  })
})

module.exports = router
