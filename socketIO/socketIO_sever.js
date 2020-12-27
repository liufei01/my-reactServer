const {ChatModel} =require('../db/models')
module.exports = function (server) {
  //得到IO对象
  const io = require('socket.io')(server)
  //监视连接(当有一个客户连接上时回调)
  io.on('connection', function (socket) {
    console.log('soketio connected')
    //绑定sendMsg监听,接收客户端发送的消息
    socket.on('sendMsg', function ({ from, to, content }) {
      console.log('接收到客户端的数据',{ from, to, content });
      // 处理数据（保存消息）
      // 准别chatMas对象的相关数据
      const chat_id= [from,to].sort().join('_')  //from_to或者to_from
      const create_time=new Date()
      new ChatModel({from,to,content,chat_id,create_time}).save(function (err,chatMsg) { 
        // 向所有连接的客户端发消息
        io.emit('receiveMsg',chatMsg)
       })
    })
  })
}
