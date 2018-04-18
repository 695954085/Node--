const MongoClient = require('mongodb').MongoClient
const config = require('../config');

function _connect(callback) {
  MongoClient.connect(config.mongoDBBaseUrl, function (err, client) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log('Connected successfully to server');
    const db = client.db(config.dbName);
    callback(null, db, client);
  });
}

// 插入数据
exports.insertOne = function (collectionName, json, callback) {
  _connect(function (err, db, client) {
    if (err) {
      callback(err);
      return;
    }
    db.collection(collectionName).insertOne(json, function (err, r) {
      client.close(); //关闭数据库
      if (err) {
        callback(err);
        return;
      }
      callback(null, r);
    })
  })
}

//查询数据
exports.findDocument = function (collectionName, condition, callback) {
  _connect(function (err, db, client) {
    if (err) {
      callback(err);
      return;
    }
    db.collection(collectionName).find(condition).toArray(function (err, docs) {
      client.close();
      if (err) {
        callback(err);
        return
      }
      console.log('Found the following records');
      callback(null, docs);
    })
  })
}

//删除数据
exports.deleteOneDocument = function (collectionName, condition, callback) {
  _connect(function (err, db, client) {
    if (err) {
      callback(err);
      return;
    }
    db.collection(collectionName).deleteOne(condition, function (err, result) {
      client.close();
      if (err) {
        callback(err);
        return;
      }
      console.log('removed the document with the field a equal to condition');
      callback(null, result);
    })
  })
}

// 更新数据
exports.updateDocument = function (collectionName, condition, json, callback) {
  _connect(function (err, db, client) {
    if (err) {
      callback(err);
      return;
    }
    db.collection(collectionName).updateOne(condition, json, function (err, result) {
      client.close();
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    });
  })
}


















