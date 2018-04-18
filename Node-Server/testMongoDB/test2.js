var personalSession = {
  friendOid: '003',
  messages: [
    {
      text: '中午好',
      date: new Date()
    }
  ]
}

var db = connect('liuyanben');
db.sessionList.update({ 'oid': '001' }, { $push: { personalSessionList: personalSession } });
print('[demo]log  print success');