var sessionList = {
  oid: '001',
  personalSessionList: [
    {
      friendOid: '002',
      messages: [
        {
          text: '早上好',
          date: new Date()
        }
      ]
    }
  ]
}

var db = connect('liuyanben');
db.sessionList.insert(sessionList);
print('[demo]log  print success');