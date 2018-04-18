var db = connect('liuyanben');

// db.sessionList.update({'oid':'001','personalSessionList.friendOid':'003'},{
//   $push:{
//     personalSessionList:{
//       'friendOid':'003',
//       messages:[]
//     }
//   }
// },{upset:false});
// 无效，upset只是对$set有效？
