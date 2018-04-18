const express = require('express');
const db = require('./model/model');
const util = require('util');
const session = require('express-session');
const formidable = require('formidable');
const path = require('path');
const service = require('./service/service');

const app = express();

app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: "xiachiquan",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 100
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

// 注册用户
app.post('/login', (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // 首先查询这个用户是否存在
    db.findDocument('user', { userName: fields.userName }, function (err, docs) {
      if (err) {
        res.send({
          code: 500,
          mesg: util.inspect(err)
        });
        return;
      }
      if (docs.length != 0) {
        // 对比密码，如果密码一样，那么就发送session
        if (fields.password == docs[0].password) {
          delete docs[0].password;
          req.session.user = docs[0];
          res.send({
            code: 200,
            msg: "密码正确，允许登录"
          });
        } else {
          res.send(JSON.stringify({
            code: 500,
            msg: '密码错误'
          }));
        }
      } else {
        let userData = { userName: fields.userName, password: fields.password, img: fields.img };
        db.insertOne('user', userData, function (err, r) {
          if (err) {
            res.end(util.inspect(err));
          } else {
            delete userData.password;
            req.session.user = userData;
            res.send({
              code: 200,
              msg: "数据库插入成功，注册成功"
            });
          }
        })
      }
    })
  });
});

app.get('/islogin', (req, res) => {
  if (req.session.user != null) {
    // res.writeHead(200, { "ContentType": "application/json" });
    // res.end(JSON.stringify({ isLogin: true }));
    res.send({
      code: 200,
      isLogin: true
    })
  } else {
    // res.writeHead(200, { "ContentType": "application/json" });
    // res.end(JSON.stringify({ isLogin: false }));
    res.send({
      code: 200,
      isLogin: false
    })
  }
});

app.get('/getserverdata', (req, res) => {
  if (req.session.user != null) {
    service.getServerData(req.session.user, (err, serverData) => {
      res.send(serverData);
    })
  } else {
    res.send(JSON.stringify({
      code: 500,
      msg: "请先登录"
    }))
  }
})

app.post('/addMessage', (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return;
    }
    if (fields._id == req.session.user._id) {
      let json = null;
      if (fields.message == undefined) {
      } else {
        json = {
          text: fields.message,
          date: new Date(),
          self: fields.self
        }
      }
      service.addMessage(fields._id, fields.friendOid, json, (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
          return;
        }
        res.send(result);
      })
    } else {
      res.send({
        code: 500,
        msg: '非法数据'
      })
    }
  })
})

app.use((req,res,next)=>{
  res.send({
    code:404,
    msg:"错误url"
  });
})

app.listen(3000);