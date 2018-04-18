var db = connect('jspang');

var myModify = {
  findAndModify:'workmate',
  query: {name:'JSPang'},
  upsert: true,
  update: {$set:{age:27}},
  new : true
}

var ResultMessage = db.runCommand(myModify);

printjson(ResultMessage);
