const service = require('../service/service');

service.addMessage('001','003','早上好',(err,result)=>{
  if(err){
    console.log(err);
    return;
  }
  console.log(result);
})