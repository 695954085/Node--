const db = require('../model/model');
const ObjectID = require('mongodb').ObjectID;

// 获取某个人的服务器数据，1.该用户的好友列表(userList) 2. 该用户的对话列表(sessionList)
exports.getServerData = (user, callback) => {
  // 1. 获取userList
  // 2. 获取sessionList
  let serverData = {};
  serverData.user = user;
  db.findDocument('user', {}, function (err, docs) {
    if (err) {
      callback(err);
      return;
    }
    serverData.userList = docs;
    db.findDocument('sessionList', {
      oid: user._id
    }, function (err, docs) {
      if (err) {
        callback(err);
        return;
      }
      serverData.sessionList = docs;
      callback(null, serverData);
    })
  })
}

// 某一个用户对某个user添加新会话消息
exports.addMessage = (userOid, friendOid, message, callback) => {
  // 1. 首先判断sessionList集合中是否存在userOid，如果不存在insert({oid:userOid,personalSessionList:[{...}]})
  db.findDocument('sessionList', { oid: userOid }, (err, docs) => {
    if (err) {
      callback(err);
      returnl
    }
    if (docs.length != 0) {
      // 2. 存在该userOid ，如果存在friendOid那么，就在messages中插入，如果不存在该friendOid，那么就personalSessionList插入
      db.findDocument('sessionList', {
        oid: userOid,
        'personalSessionList.friendOid': friendOid,
      }, (err, docs) => {
        if (err) {
          callback(err);
          return;
        }
        if (docs.length != 0) {
          db.updateDocument('sessionList', {
            oid: userOid,
            'personalSessionList.friendOid': friendOid
          }, {
              $push: {
                'personalSessionList.$.messages': {
                  text: message,
                  date: new Date()
                }
              }
            }, (err, result) => {
              if (err) {
                callback(err);
                return;
              }
              callback(null, result);
            })
        } else {
          //
          db.updateDocument('sessionList', {
            oid: userOid
          }, {
              $push: {
                personalSessionList: {
                  friendOid: friendOid,
                  messages: [
                    {
                      text: message,
                      date: new Date()
                    }
                  ]
                }
              }
            }, (err, result) => {
              if (err) {
                callback(err);
                return;
              }
              callback(null, result);
            })
        }
      })
    } else {
      // 插入shuju
      db.insertOne('sessionList', {
        oid: userOid,
        personalSessionList: [
          {
            friendOid: friendOid,
            messages: [
              {
                text: message,
                date: new Date()
              }
            ]
          }
        ]
      }, (err, result) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, result);
      })
    }
  })
}
