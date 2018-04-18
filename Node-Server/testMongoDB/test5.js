var db = connect('liuyanben');
db.sessionList.updateOne({
  'oid':'001','personalSessionList.friendOid':'002'
},{$push:{
  'personalSessionList.$.messages':{text:'早安',date:new Date()}
}});